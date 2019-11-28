import Sensor from 'src/types/sensor';
import {Server, Socket} from 'socket.io';

export default class OZWServiceSocket {
    io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    setUpSocketConnection = (): void => {
        this.io.on('connection',  (socket: Socket) => {
            this.onSensorUpdate(socket);
        });
    };

    onSensorUpdate = (socket: Socket): void => {
        socket.on('sensor_updated', (sensor: Sensor) => {
            this.alertSensorUpdated(sensor);
        });
    };

    alertSensorUpdated = (sensor: Sensor): void => {
        this.io.emit(
            'sensor_update',
            sensor
        );
    };
}
