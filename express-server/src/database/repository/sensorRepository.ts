import Sensor from 'src/database/models/sensor';
import { insert, fetchRoom } from 'src/database/databaseConnectors';
import logger from 'src/util/logger';
import MultiSensor from 'src/database/models/multiSensor';
import Room from 'src/database/models/room';


const roomAlreadyExists = (sensor: MultiSensor): Promise<boolean> => {
    const objectKey = 'room';

    const query = 'MATCH (user:User)--(room:Room) ' +
                        'WHERE user.id = {userId} AND room.name = {name} AND room.type = {roomType} ' +
        '                       RETURN room';

    return fetchRoom(query, objectKey, sensor)
        .then((result: Room[]) => {
            return result.length != 0;

        })
        .catch((err) => {
            logger.error(err);
            return false;
        });
};

const generateMultiInsertQuery = (sensor: MultiSensor): string => {
    let query = '';
    sensor.types.forEach((type: string, index: number) => {
        query += `CREATE (sensor${index}:Sensor {nodeId: {nodeId}, type:'${type}'})-[rel${index}:belongsTo]->(room) `;
    });
    return query;
};

const getSensorInsertQuery = (roomExists: boolean, sensor: MultiSensor): string => {
    let query = '';
     if (roomExists) {
        query = 'MATCH (user:User)--(room:Room) WHERE user.id = {userId} AND room.name = {name} AND room.type={roomType} ';
     } else {
         query = 'MATCH (user:User) WHERE user.id = {userId} CREATE (room:Room {type: {roomType}, name:{name}})-[r:belongsTo]->(user) ';
     }
    query += generateMultiInsertQuery(sensor);
    query += 'RETURN room';
    return query;
};

export const insertNewMultiSensor = (sensor: MultiSensor): Promise<Sensor> => {
    const objectKey = 'sensor';
    let query = '';

    return roomAlreadyExists(sensor)
        .then((exists) => {
            query = getSensorInsertQuery(exists, sensor);
            return insert(query, objectKey, sensor)
                .then((result) => {
                    return result;
                })
                .catch((err) => {
                    logger.error(err);
                });
        });
};

