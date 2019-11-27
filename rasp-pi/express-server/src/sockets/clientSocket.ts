import Sensor from 'sensor';
import {Server, Socket} from 'socket.io';

export default class ClientSocket {
    io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    setUpSocketConnection = (): void => {
        this.io.on('connection',  (socket: Socket) => {
            this.onSensorAddedToNetwork(socket);
        });
    };

    alertNewSensorJoinedNetwork = (sensor: Sensor): void => {
        this.io.emit(
            'NEW_SENSOR_JOINED_NETWORK',
            sensor
        );
    };

    onSensorAddedToNetwork = (socket: Socket): void => {
        socket.on('NEW', (sensor) => {
            this.alertNewSensorJoinedNetwork(sensor);
        });
    };
}
