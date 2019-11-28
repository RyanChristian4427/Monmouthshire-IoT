import AppDAO from '../database/appDao';
import SensorRepository from '../database/sensorRepository';
import logger from '../util/logger.js';

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
        });
    };

    alertSensorAdded = (sensor) => {
        this.io.emit(
            'sensor_joined_z_wave',
            sensor
        );
    };

    onSensorUpdate(socket){
        socket.on('sensor_update', (sensor) => {
            // Update in database
            logger.info('WE ADDING LOCATION UPDATE TO DATABASE!');
            logger.info(sensor.nodeId + ', ' + sensor.location);
            this.sensorRepository.updateSensorLocation(sensor.nodeId, sensor.location);
        });
    };
}
