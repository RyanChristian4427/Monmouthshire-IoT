import ZWave from 'openzwave-shared';
import io from 'socket.io';
import SensorService from './service/sensorService';
import ServerSocket from './sockets/serverSocket';
import logger from './util/logger';
import ReadingService from './service/readingService';

const USER_ID = 'b8:27:eb:25:bf:f5';

export const pollSensors = () => {
   const sensorService = new SensorService();
    const readingService = new ReadingService();
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
    
    const getRoomType = (nodeId) => {
		switch(nodeId){
			case 3:
				return "Bedroom";
			case 4:
				return "Kitchen";
			default:
				return "Bedroom";
		}
	};

    serverSocket.setUpSocketConnection();
    sensorService.createTable();

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

   zwave.on('value added', function(nodeId, comclass, sensorReading) {
        if(sensorReading){
			const data = {
						nodeId,
						value: sensorReading.value,
						roomType: getRoomType(nodeId),
						sensorType: sensorReading.label,
						userId: USER_ID
					};
					logger.error(data);
					readingService.sendReading(data);
        }
    });
    
    const getReadingType = (readingType) => {
		switch(readingType){
			case 'Ultraviolet':
				return "Motion";
			default:
				return readingType;
		}
	};
    const sensorHasBeenShook = (notificationType) => {
		return notificationType === 'Home Security';
    };

    zwave.on('value changed', function(nodeId, comclass, sensorReading) {
		if(sensorReading){
			//logger.info(`value changed for node${nodeId}: label: ${sensorReading['unit']}, value: ${sensorReading['value']}, unit:${sensorReading['unit']}`);
			
			sensorService.getById(nodeId)
				.then((sensor) => {
					logger.debug(sensor);
					logger.debug(sensor);
					const data = {
						nodeId,
						value: sensorReading.value,
						roomType: sensor.type,
						sensorType: getReadingType(sensorReading.label),
						userId: USER_ID,
						units: sensorReading.units
					};
					logger.error(data);
					readingService.sendReading(data);
				});

			if(sensorService.sensorHasBeenShook(sensorReading.label)){
                sensorService.getById(nodeId)
				.then((sensor) => {
					logger.debug(`Sensor shake detected from sensor ${nodeId}`);
					logger.debug(sensor);
					serverSocket.alertSensorShake(sensor);
				});
			}
		}
    });


    zwave.on('node removed', function(nodeId){
        logger.info(`node ${nodeId} removed`);
       // zwave.healNetworkNode(nodeId, doReturnRoutes=false);
    });

    zwave.on('node ready', function(nodeId, nodeinfo) {
        const hardware = nodeinfo.product;
        const name = nodeinfo.type;

        nodes[nodeId]['manufacturer'] = nodeinfo.manufacturer;
        nodes[nodeId]['manufacturerid'] = nodeinfo.manufacturerid;
        nodes[nodeId]['product'] = nodeinfo.product;
        nodes[nodeId]['producttype'] = nodeinfo.producttype;
        nodes[nodeId]['productid'] = nodeinfo.productid;
        nodes[nodeId]['type'] = nodeinfo.type;
        nodes[nodeId]['name'] = nodeinfo.name;
        nodes[nodeId]['loc'] = nodeinfo.loc;
        nodes[nodeId]['ready'] = true;

        sensorService.create({
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
			logger.info('comclass');
			logger.info(comclass);
            //logger.info(`node${nodeId}: class ${comclass}`);
            switch (comclass) {
                case 0x25: // COMMAND_CLASS_SWITCH_BINARY
                case 0x26: // COMMAND_CLASS_SWITCH_MULTILEVEL
                    var valueIds = nodes[nodeId]['classes'][comclass];
                    for (valueId in valueIds) {
                        zwave.enablePoll(valueId);
                        break;
                    }
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
