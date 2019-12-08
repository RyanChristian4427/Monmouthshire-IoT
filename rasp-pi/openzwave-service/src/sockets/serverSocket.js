import logger from '../util/logger.js';
import SensorService from '../service/sensorService';

export default class ServerSocket {
    io;
    sensorService;

    constructor(io) {
        this.sensorService = new SensorService();
        this.io = io;
    }

    setUpSocketConnection(){
        this.io.on('connection',  (socket) => {
            this.onSensorUpdate(socket);
            this.onClientLookingForSensors(socket);
            this.onRoomAdded(socket);
        });
    };

    alertSensorAdded(sensor){
        logger.info('Alerting client that new sensor added to z-wave network');
        this.io.emit(
            'sensor_joined_z_wave',
            sensor
        );
    };

    alertSensorShake(sensor){
        logger.info(`Emitting sensor shake event for sensor -> name: ${sensor.name} nodeId: ${sensor.nodeId}`);
        this.io.emit(
            'sensor_shake',
            sensor
        );
    };

    emitAllSensors(sensors){
        logger.info('Emitting all sensors in database to client');
        this.io.emit(
            'all_connected_sensors',
            sensors
        );
    };

    onSensorUpdate(socket){
        socket.on('sensor_update', (sensor) => {
            logger.debug(`Configuring sensor ${sensor.nodeId}`);
            logger.info(`Updating node ${sensor.nodeId}: type is ${sensor.type} and name is ${sensor.name}`);
            this.sensorService.updateSensor(sensor.nodeId, sensor.type, sensor.name)
                .then(() => {
                    this.sensorService.configure(sensor.nodeId);
                });
        });
    };

    onClientLookingForSensors(socket){
        socket.on('looking_for_sensors', () => {
            this.sensorService.getAll()
                .then((sensors) => {
                    logger.info('Emitting all sensors to client');
                    logger.debug(sensors);
                    this.emitAllSensors(sensors);
                });
        });
	}
}
