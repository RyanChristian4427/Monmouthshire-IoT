import ZWave from 'openzwave-shared';
import { postNewReading } from './client';
import { Promise } from 'bluebird';
import AppDAO from './database/appDao.js';
import SensorRepository from './database/sensorRepository.js';
import logger from './util/logger';
import ServerSocket from "./sockets/serverSocket";
import io from 'socket.io';

export const pollSensors = () => {
    const appDao = new AppDAO('/home/pi/databases/iot_team_3/iot_team_3.sqlite');
    const sensorRepository = new SensorRepository(appDao);
    sensorRepository.createTable();
    const socket = io.listen('3030');
    const serverSocket = new ServerSocket(socket);

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

    zwave.on('value changed', function(nodeid, comclass, value) {
        if (nodes[nodeid]['ready']) {
            logger.info(`node${nodeid}: changed: 
            ${comclass}:${value['label']}:${nodes[nodeid]['classes'][comclass][value.index]['value']}->${value['value']}`)
        }
        nodes[nodeid]['classes'][comclass][value.index] = value;
        logger.info(`value changed for node${nodeid}: 
        label: ${value['unit']}, value: ${value['value']}, unit:${value['unit']}`);
        if (readingIsValid(value)) {
            postNewReading(value);
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

    zwave.on('node ready', function(nodeid, nodeinfo) {
        const type = nodeinfo.product;
        const location = nodeinfo.location;
        const node_id = nodeid;

        nodes[nodeid]['manufacturer'] = nodeinfo.manufacturer;
        nodes[nodeid]['manufacturerid'] = nodeinfo.manufacturerid;
        nodes[nodeid]['product'] = nodeinfo.product;
        nodes[nodeid]['producttype'] = nodeinfo.producttype;
        nodes[nodeid]['productid'] = nodeinfo.productid;
        nodes[nodeid]['type'] = nodeinfo.type;
        nodes[nodeid]['name'] = nodeinfo.name;
        nodes[nodeid]['loc'] = nodeinfo.loc;
        nodes[nodeid]['ready'] = true;

        //sensorRepository.create({
        //	type,
        //location,
        //node_id
        //});

        serverSocket.alertSensorAdded({
            node_id,
            type,
            location
        });

        for (let comclass in nodes[nodeid]['classes']) {
            logger.info(`node${nodeid}: class ${comclass}`);
            switch (comclass) {
                case 0x25: // COMMAND_CLASS_SWITCH_BINARY
                case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                    var valueIds = nodes[nodeid]['classes'][comclass];
                    for (valueId in valueIds) {
                        zwave.enablePoll(valueId);
                        break;
                    }
                    logger.info(`node${nodeid}:   ${values[idx]['label']}=${values[idx]['value']}`)
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
