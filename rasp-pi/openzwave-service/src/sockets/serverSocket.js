import logger from '../util/logger.js';
import AppDAO from '../database/appDao';
import SensorService from '../service/sensorService';
import { postNewRoom } from '../client';

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
            logger.debug('Configuring sensor....');
            logger.debug(sensor);
            logger.info(`Updating node ${sensor.nodeId}: type is ${sensor.type} and name is ${sensor.name}`);
            this.sensorService.updateSensor(sensor.nodeId, sensor.type, sensor.name);
            this.sensorService.configure(sensor.nodeId);
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
	
	onRoomAdded(socket){
		socket.on('room_added', (room) => {
			postNewRoom(room);
		});
	}
}
