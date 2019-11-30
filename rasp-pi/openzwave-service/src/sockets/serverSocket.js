import logger from '../util/logger.js';
import AppDAO from '../database/appDao';
import SensorRepository from '../database/sensorRepository';

export default class ServerSocket {
    io;
    sensorRepository;

    constructor(io) {
        const appDao = new AppDAO('/home/pi/databases/iot_team_3/iot_team_3.sqlite');
        this.sensorRepository = new SensorRepository(appDao);
        this.io = io;
    }

    setUpSocketConnection(){
        this.io.on('connection',  (socket) => {
            this.onSensorUpdate(socket);
            this.onClientLookingForSensors(socket);
        });
    };

    alertSensorAdded(sensor){
        this.io.emit(
            'sensor_joined_z_wave',
            sensor
        );
    };

    alertSensorShake(sensor){
        this.io.emit(
            'sensor_shake',
            sensor
        );
    };
    
    emitAllSensors(sensors){
        this.io.emit(
            'all_connected_sensors',
            sensors
        );
    };

    onSensorUpdate(socket){
        socket.on('sensor_update', (sensor) => {
            // Update in database
            logger.info(`Updating node ${sensor.nodeId}: type is ${sensor.type} and name is ${sensor.name}`);
            this.sensorRepository.updateSensor(sensor.nodeId, sensor.type, sensor.name);
        });
    };
    
    onClientLookingForSensors(socket){
		socket.on('looking_for_sensors', () => {
			this.sensorRepository.getAll()
			.then((sensors) => {
				logger.info('Emitting all sensors to client');
				logger.debug(sensors);
				this.emitAllSensors(sensors);
			});
		});
	}
}
