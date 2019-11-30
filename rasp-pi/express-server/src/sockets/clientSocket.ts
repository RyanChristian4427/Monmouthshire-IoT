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

    onSensorAddedToNetwork = (socket: Socket): void => {
        socket.on('new_sensor', (sensor) => {
            this.alertNewSensorJoinedNetwork(sensor);
        });
    };

    alertNewSensorJoinedNetwork = (sensor: Sensor): void => {
        this.io.emit(
            'new_sensor_joined_network',
            sensor
        );
    };
}
