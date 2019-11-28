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

    setUpSocketConnection = () => {
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

    onSensorUpdate = (socket) => {
        socket.on('sensor_update', (sensor) => {
            // Update in database
            this.sensorRepository.updateSensorLocation(sensor.node_id, sensor.location);
        });
    };
}
