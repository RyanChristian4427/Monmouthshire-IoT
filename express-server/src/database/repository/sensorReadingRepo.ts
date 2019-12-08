import { fetch, insert } from 'src/database/databaseConnectors';
import { createSensorReading } from 'src/database/mappers/sensorReadingMapper';
import SensorReading from 'src/database/models/sensorReading';
import {QueryArguments} from 'src/models/QueryArguments';
import logger from 'src/util/logger';

/**
 * Takes arguments to create a cypher query and returns a Promise
 *
 * @param query
 * @param objectKey
 * @param args
 */
export const fetchBuilder = async (query: string, objectKey: string, args: object): Promise<object>=> {
    return await fetch(query, objectKey, args)
        .then(
            (result: object) => {
                return result;
            })
        .catch((err) => {
            logger.error(err.name + ' ' + err.code);
            throw err;
        });
};

/**
 * Return all SensorReading nodes #
 */
export const getAllReadings = async (args: QueryArguments): Promise<object> => {
    const query = `MATCH (:User {id: {userId}})-[]-(rooms)-[]-(sensors)-[]-(sensorReadings)
                   WHERE sensors.type IN ["Motion", "Temperature", "Relative Humidity", "Luminance"] AND
                   sensorReadings.timestamp >= dateTime({startDateTime}) AND sensorReadings.timestamp <= dateTime({endDateTime})
                   WITH rooms.name as roomName,
                        sensors.type as sensorType,
                        {
                            value: toFloat(sensorReadings.value),
                            timestamp: ToInteger(datetime(sensorReadings.timestamp).epochSeconds)
                        } as data
                   ORDER BY data.timestamp
                   WITH roomName, sensorType, COLLECT(data) AS nodeData
                   RETURN { name: roomName, sensorData: COLLECT({ type: sensorType, nodeData: nodeData })} AS sensorReading`;
    const objectKey = 'sensorReading';
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Temperature by user
 *
 * @param args
 */
export const getTempReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH (:User {id: {userId}})-[]-(rooms)-[]-(:Sensor {type: 'Temperature'})-[]-(sensorReadings)
                   WHERE sensorReadings.timestamp >= dateTime({startDateTime}) AND
                        sensorReadings.timestamp <= dateTime({endDateTime})
                   WITH rooms.name as roomName, {
                       value: toFloat(properties(sensorReadings).value),
                       timestamp: toInteger(datetime(properties(sensorReadings).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReading`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Luminance by user
 *
 * @param args
 */
export const getLuminanceReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH (:User {id: {userId}})-[]-(rooms)-[]-(:Sensor {type: 'Luminance'})-[]-(sensorReadings)
                   WHERE sensorReadings.timestamp >= dateTime({startDateTime}) AND
                        sensorReadings.timestamp <= dateTime({endDateTime})
                   WITH rooms.name as roomName, {
                       value: toFloat(properties(sensorReadings).value),
                       timestamp: toInteger(datetime(properties(sensorReadings).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReading`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Ultraviolet by user
 *
 * @param args
 */
export const getUltraVioletReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH (:User {id: {userId}})-[]-(rooms)-[]-(:Sensor {type: 'Ultraviolet'})-[]-(sensorReadings)
                   WHERE sensorReadings.timestamp >= dateTime({startDateTime}) AND
                        sensorReadings.timestamp <= dateTime({endDateTime})
                   WITH rooms.name as roomName, {
                       value: toFloat(properties(sensorReadings).value),
                       timestamp: toInteger(datetime(properties(sensorReadings).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReading`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Relative Humidity by user
 *
 * @param args
 */
export const getHumidityReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH (:User {id: {userId}})-[]-(rooms)-[]-(:Sensor {type: 'Relative Humidity'})-[]-(sensorReadings)
                   WHERE sensorReadings.timestamp >= dateTime({startDateTime}) AND
                        sensorReadings.timestamp <= dateTime({endDateTime})
                   WITH rooms.name as roomName, {
                       value: toFloat(properties(sensorReadings).value),
                       timestamp: toInteger(datetime(properties(sensorReadings).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReading`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Motion by user
 *
 * @param args
 */
export const getMotionReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH (:User {id: {userId}})-[]-(rooms)-[]-(:Sensor {type: 'Motion'})-[]-(sensorReadings)
                   WHERE sensorReadings.timestamp >= dateTime({startDateTime}) AND
                        sensorReadings.timestamp <= dateTime({endDateTime})
                   WITH rooms.name as roomName, {
                       value: toFloat(properties(sensorReadings).value),
                       timestamp: toInteger(datetime(properties(sensorReadings).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReading`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Add new SensorReading node
 *
 * @param sensorReading
 */
export const insertNewReading = async (sensorReading: string): Promise<SensorReading> => {
    const objectKey = 'sensorReading';
    const query = `CREATE
                     (sensorReading:SensorReading 
                        { userId: {userId}, type: {type}, value: {value}, unit: {unit}, timestamp: datetime() }) 
                             RETURN properties(sensorReading) AS sensorReading`;

    return await insert(query, objectKey, createSensorReading(sensorReading));
};
