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

    alertSensorUpdated = (sensor: Sensor): void => {
        this.io.emit(
            'SENSOR_UPDATE',
            sensor
        );
    };

    onSensorUpdate = (socket: Socket): void => {
        socket.on('SENSOR_UPDATED', (sensor: Sensor) => {
            this.alertSensorUpdated(sensor);
        });
    };
}
