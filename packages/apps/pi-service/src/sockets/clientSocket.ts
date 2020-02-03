import { Server } from 'socket.io';

import logger from 'src/util/logger';

export default class ClientSocket {
    io: Server;

    constructor(io: Server) {
        this.io = io;
    }

    setUpSocketConnection(): void {
        this.io.on('connection', (socket) => {
            logger.info('New socket connection made');
            this.onSensorUpdate(socket);
            this.onClientLookingForSensors(socket);
        });
    }

    alertSensorAdded(sensor): void {
        logger.info('Alerting client that new sensor added to z-wave network');
        this.io.emit('sensor_joined_z_wave', sensor);
    }

    alertSensorShake(sensor): void {
        logger.info(`Emitting sensor shake event for sensor -> name: ${sensor.name} nodeId: ${sensor.nodeId}`);
        this.io.emit('sensor_shake', sensor);
    }

    emitAllSensors(sensors): void {
        logger.info('Emitting all sensors in database to client');
        this.io.emit('all_connected_sensors', sensors);
    }

    onSensorUpdate(socket): void {
        socket.on('sensor_update', (sensor) => {
            logger.debug(`Configuring sensor ${sensor.nodeId}`);
            logger.info(`Updating node ${sensor.nodeId}: type is ${sensor.type} and name is ${sensor.name}`);
            this.sensorService.updateSensor(sensor.nodeId, sensor.type, sensor.name).then(() => {
                this.sensorService.configure(sensor.nodeId);
            });
        });
    }

    onClientLookingForSensors(socket): void {
        socket.on('looking_for_sensors', () => {
            this.sensorService.getAll().then((sensors) => {
                logger.info('Emitting all sensors to client');
                logger.debug(sensors);
                this.emitAllSensors(sensors);
            });
        });
    }
}
