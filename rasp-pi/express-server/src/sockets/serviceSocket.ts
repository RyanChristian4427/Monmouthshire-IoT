import Sensor from 'src/types/sensor';
import {Server, Socket} from 'socket.io';
import sensor from 'src/types/sensor';

export default class OZWServiceSocket {
    io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    setUpSocketConnection = (): void => {
        this.io.on('connection',  (socket: Socket) => {
            this.onSensorUpdate(socket);
            this.onSensorAddedToZWave(socket);
        });
    };

    onSensorUpdate = (socket: Socket): void => {
        socket.on('sensor_updated', (sensor: Sensor) => {
            this.alertServiceSensorUpdated(sensor);
        });
    };

    onSensorAddedToZWave = (socket: Socket): void => {
        socket.on('sensor_joined_z_wave', (sensor: Sensor) => {
            this.alertClientSensorAdded(sensor);
        });
    };

    alertServiceSensorUpdated = (sensor: Sensor): void => {
        this.io.emit(
            'sensor_update',
            sensor
        );
    };

    alertClientSensorAdded = (sensor: Sensor): void => {
        this.io.emit(
            'sensor_update',
            sensor
        );
    };
}
