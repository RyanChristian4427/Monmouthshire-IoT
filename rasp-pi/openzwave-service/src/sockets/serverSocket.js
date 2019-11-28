export default class ServerSocket {
    io;

    constructor(io) {
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
        });
    };
}
