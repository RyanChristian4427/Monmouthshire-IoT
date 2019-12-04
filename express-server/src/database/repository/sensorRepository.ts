import Sensor from 'src/database/models/sensor';
import { insert } from 'src/database/databaseConnectors';
import SensorData from 'src/database/models/sensorData';
import logger from 'src/util/logger';
import Room from 'src/database/models/room';

/**
 * Add new SensorReading node
 *
 * @param sensor
 */
export const insertNewSensor = (sensor: SensorData): Promise<Sensor> => {
    logger.info('About to insert new sensor');
    const objectKey = 'sensor';

    const query = `MATCH (user:User)--(room:Room) WHERE user.id = {userId} AND room.type={roomType}
                        CREATE (sensor:Sensor {nodeId: {nodeId}, hardware:{hardware}, name:{name}, type:{type}})-[r:belongsTo]->(room)
                            RETURN sensor`;

    const args = {
        'nodeId': 4,
        'hardware': 0,
        'name': 'Sensor 4 (Home Security Sensor)',
        'userId': 'b8:27:eb:25:bf:f5',
        'type': 'Temperature',
        'roomType': 'Kitchen'
    };

    return insert(query, objectKey, args)
        .then((result) => {
            logger.debug('Result of adding sensor to database');
            logger.debug(result);
            return result;
        })
        .catch((err) => {
            logger.error(err);
        });
};

export const insertNewRoom = (room: Room): Promise<Room> => {
    logger.info('About to insert new room');
    const objectKey = 'room';

    const query = `MATCH (user:User) WHERE user.id = {userId} 
                        CREATE (room:Room {type: {type}})-[r:belongsTo]->(user)
                            RETURN room`;

    return insert(query, objectKey, room)
        .then((result) => {
            logger.debug('Result of adding room to database');
            logger.debug(result);
            return result;
        })
        .catch((err) => {
            logger.error(err);
        });
};

