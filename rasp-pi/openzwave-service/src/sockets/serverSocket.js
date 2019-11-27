import AppDAO from "../database/appDao";
import SensorRepository from "../database/sensorRepository";
import {DB_LOCATION} from "../util/secrets";

export default class ServerSocket {
    io;
    sensorRepository;

    constructor(io) {
        this.io = io;
        this.sensorRepository = new SensorRepository(new AppDAO(DB_LOCATION));

    }

    setUpSocketConnection = () => {
        this.io.on('connection',  (socket) => {
            this.onSensorUpdated(socket);
        });
    };

    alertUpdateSuccessful = (sensor) => {
        this.io.emit(
            'SENSOR_UPDATE_SUCCESSFUL',
            sensor
        );
    };

    alertUpdateUnsuccessful = (sensor) => {
        this.io.emit(
            'SENSOR_UPDATE_UNSUCCESSFUL',
            sensor
        );
    };
    onSensorUpdated = (socket) => {
        socket.on('SENSOR_UPDATE', (sensor) => {
            this.sensorRepository.updateSensorLocation(sensor.id, sensor.location).then(() => {
                this.alertUpdateSuccessful(sensor);
            })
                .catch((err) => {
                    this.alertUpdateUnsuccessful(sensor);
                })
        });
    };
}
