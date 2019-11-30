import ZWave from 'openzwave-shared';
import { Promise } from 'bluebird';
import io from 'socket.io';

import { postNewReading } from './client';
import AppDAO from './database/appDao.js';
import SensorRepository from './database/sensorRepository.js';
import ServerSocket from "./sockets/serverSocket";
import logger from './util/logger';


export const pollSensors = () => {
    const appDao = new AppDAO('/home/pi/databases/iot_team_3/iot_team_3.sqlite');
    const sensorRepository = new SensorRepository(appDao);
    sensorRepository.createTable();
    const socket = io.listen('3030');
    const serverSocket = new ServerSocket(socket);
    serverSocket.setUpSocketConnection();

    const nodes = [];
    const zwave = new ZWave({
        ConsoleOutput: false,
        Logging: false,
        SaveConfiguration: false,
        DriverMaxAttempts: 5,
        PollInterval: 500,
        SuppressValueRefresh: true,
    });

    zwave.on('driver ready', function(homeid) {
        logger.info(`scanning homeid=0x${homeid.toString(16)}...`)
    });

    zwave.on('driver failed', function() {
        logger.info('failed to start driver');
        zwave.disconnect();
        process.exit();
    });

    zwave.on('node added', function(nodeid) {
        nodes[nodeid] = {
            manufacturer: '',
            manufacturerid: '',
            product: '',
            producttype: '',
            productid: '',
            type: '',
            name: '',
            loc: '',
            classes: {},
            ready: false,
        };
        logger.info(`new node added, now ${nodes.length} nodes`);
    });

    zwave.on('value added', function(nodeid, comclass, value) {
        if (!nodes[nodeid]['classes'][comclass]) {
            nodes[nodeid]['classes'][comclass] = {};
            nodes[nodeid]['classes'][comclass][value.index] = value;
            if (readingIsValid(value)) {
                postNewReading(value);
            }
        }
    });

    const sensorHasBeenShook = (notificationType) => {
		return notificationType === 'Home Security';
    };

    zwave.on('value changed', function(nodeid, comclass, value) {
        if (nodes[nodeid]['ready']) {
            logger.debug(`${comclass}`);
            logger.info(`node${nodeid}: changed:
            ${comclass}:${value['label']}:${nodes[nodeid]['classes'][comclass][value.index]['value']}->${value['value']}`)
        }
        nodes[nodeid]['classes'][comclass][value.index] = value;
        logger.info(`value changed for node${nodeid}: 
        label: ${value['unit']}, value: ${value['value']}, unit:${value['unit']}`);
        if (readingIsValid(value)) {
            postNewReading(value);
        }
        if(sensorHasBeenShook(value['label'])){
            sensorRepository.getById(nodeid)
            .then((sensor) => {
				logger.debug('sensor shake');
                logger.debug(sensor);
				serverSocket.alertSensorShake(sensor);
			});
        }
    });

    const readingIsValid = (reading) => {
        const validEvents = ['Temperature', 'Luminance', 'Relative Humidity', 'Ultraviolet', 'Home Security'];
        return validEvents.indexOf(reading['label']) > -1;
    };

    zwave.on('value removed', function(nodeid, comclass, index) {
        if (nodes[nodeid]['classes'][comclass] && nodes[nodeid]['classes'][comclass][index]) {
            delete nodes[nodeid]['classes'][comclass][index];
        }
    });

    zwave.on('node removed', function(nodeId){
        logger.info(`node ${nodeId} removed`);
        zwave.healNetworkNode(nodeId, doReturnRoutes=false);
    });

    zwave.on('node ready', function(nodeId, nodeinfo) {
        const hardware = nodeinfo.product;
        const name = `Sensor ${nodeId} (${nodeinfo.type})`;

        nodes[nodeId]['manufacturer'] = nodeinfo.manufacturer;
        nodes[nodeId]['manufacturerid'] = nodeinfo.manufacturerid;
        nodes[nodeId]['product'] = nodeinfo.product;
        nodes[nodeId]['producttype'] = nodeinfo.producttype;
        nodes[nodeId]['productid'] = nodeinfo.productid;
        nodes[nodeId]['type'] = nodeinfo.type;
        nodes[nodeId]['name'] = nodeinfo.name;
        nodes[nodeId]['loc'] = nodeinfo.loc;
        nodes[nodeId]['ready'] = true;

        sensorRepository.create({
			nodeId,
			hardware,
			name
        });

        serverSocket.alertSensorAdded({
            nodeId,
            name,
            hardware
        });

        for (let comclass in nodes[nodeId]['classes']) {
            logger.info(`node${nodeId}: class ${comclass}`);
            switch (comclass) {
                case 0x25: // COMMAND_CLASS_SWITCH_BINARY
                case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                    var valueIds = nodes[nodeId]['classes'][comclass];
                    for (valueId in valueIds) {
                        zwave.enablePoll(valueId);
                        break;
                    }
                    logger.info(`node${nodeId}:   ${values[idx]['label']}=${values[idx]['value']}`)
            }
        }
    });

    zwave.on('scan complete', function() {
        logger.info('====> scan complete, hit CTRL-C to finish.');
        // Add a new device to the ZWave controller
        if (zwave.hasOwnProperty('beginControllerCommand')) {
            // using legacy mode (OpenZWave version < 1.3) - no security
            zwave.beginControllerCommand('AddDevice', true);
        } else {
            // using new security API
            // set this to 'true' for secure devices eg. door locks
            zwave.addNode(false);
        }
    });

    zwave.connect('/dev/ttyACM0');

    process.on('SIGINT', function() {
        logger.info('disconnection...');
        zwave.disconnect('/dev/ttyACM0');
        process.exit();
    });
};

pollSensors();
