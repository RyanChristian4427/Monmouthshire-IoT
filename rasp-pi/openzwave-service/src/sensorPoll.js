import ZWave from 'openzwave-shared';
import io from 'socket.io';
import SensorService from "./service/sensorService";
import ServerSocket from './sockets/serverSocket';
import logger from './util/logger';
import ReadingService from './service/readingService';

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
        PollInterval: 500,
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

    zwave.on('value added', function(nodeId, comclass, value) {
        if(value){
            value['sensorId'] = nodeId;
            readingService.sendReading(value);
        }
    });

    zwave.on('value changed', function(nodeid, comclass, value) {
		if(value){
			logger.info(`value changed for node${nodeid}: label: ${value['unit']}, value: ${value['value']}, unit:${value['unit']}`);

			value['sensorId'] = nodeid;
			readingService.sendReading(value);

			if(sensorService.sensorHasBeenShook(value['label'])){
                sensorService.getById(nodeid)
				.then((sensor) => {
					logger.debug('sensor shake');
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
        const hardware = nodeInfo.product;
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
