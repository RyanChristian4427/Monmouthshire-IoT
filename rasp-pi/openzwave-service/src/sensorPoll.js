import ZWave from 'openzwave-shared';
import io from 'socket.io';
import SensorService from './service/sensorService';
import ServerSocket from './sockets/serverSocket';
import logger from './util/logger';
import ReadingService from './service/readingService';
//import {USER_ID} from './util/secrets';

const USER_ID = 'b8:27:eb:25:bf:f5';

export const pollSensors = () => {
    const sensorService = new SensorService();
    const readingService = new ReadingService();
    const socket = io.listen('3030');
    const serverSocket = new ServerSocket(socket);

    const zwave = new ZWave({
        ConsoleOutput: false,
        Logging: false,
        SaveConfiguration: false,
        DriverMaxAttempts: 5,
        PollInterval: 200,
        SuppressValueRefresh: true,
    });

    serverSocket.setUpSocketConnection();
    sensorService.createTable();

    zwave.on('driver ready', function(homeid) {
        logger.info(`scanning homeid=0x${homeid.toString(16)}...`);
    });

    zwave.on('driver failed', function() {
        logger.info('failed to start driver');
        zwave.disconnect();
        process.exit();
    });

    zwave.on('node added', function(nodeId) {
        logger.info(`Node ${nodeId} added to network`);
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

    zwave.on('value added', function(nodeId, comclass, sensorReading) {
        if(sensorReading){
			const data = {
						nodeId,
						value: sensorReading.value,
						roomType: getRoomType(nodeId),
						sensorType: sensorReading.label,
						userId: USER_ID
					};
					//logger.error(data);
					readingService.sendReading(data);
        }
    });

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
						sensorType: sensorReading.label,
						userId: USER_ID,
						units: sensorReading.units
					};
					//logger.error(data);
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
        logger.debug(`Node ${nodeId} removed`);
        //zwave.healNetworkNode(nodeId, doReturnRoutes=false);
    });

    zwave.on('node ready', function(nodeId, nodeInfo) {
		logger.info(nodeInfo.product);
        const hardware = sensorService.determineSensorType(nodeInfo.product);
        const name = nodeInfo.type;

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
    });

    zwave.on('scan complete', function() {
        logger.info('====> scan complete, hit CTRL-C to finish.');
    });

    zwave.connect('/dev/ttyACM0');

    process.on('SIGINT', function() {
        logger.info('disconnection...');
        zwave.disconnect('/dev/ttyACM0');
        process.exit();
    });
};

pollSensors();
