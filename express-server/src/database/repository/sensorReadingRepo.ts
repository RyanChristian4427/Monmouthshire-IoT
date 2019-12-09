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
    const objectKey = 'sensorReadings';
    const query = `MATCH (:User {id: {userId}})-[]-(room:Room)-[]-(sensor:Sensor)-[]-(reading:Reading)
                   WHERE sensor.type IN ["Motion", "Temperature", "Relative Humidity", "Luminance"] AND
                   reading.timestamp >= dateTime({startDateTime}) AND reading.timestamp <= dateTime({endDateTime})
                   WITH room.name as roomName,
                        sensor.type as sensorType,
                        {
                            value: toFloat(reading.value),
                            timestamp: ToInteger(datetime(reading.timestamp).epochSeconds)
                        } as data
                   ORDER BY data.timestamp
                   WITH roomName, sensorType, COLLECT(data) AS nodeData
                   RETURN { name: roomName, sensorData: COLLECT({ type: sensorType, nodeData: nodeData })} AS sensorReadings`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Temperature by user
 *
 * @param args
 */
export const getTempReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReadings';
    const query = `MATCH (:User {id: {userId}})-[]-(room:Room)-[]-(:Sensor {type: 'Temperature'})-[]-(reading:Reading)
                   WHERE reading.timestamp >= dateTime({startDateTime}) AND
                         reading.timestamp <= dateTime({endDateTime})
                   WITH room.name as roomName, {
                       value: toFloat(properties(reading).value),
                       timestamp: toInteger(datetime(properties(reading).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReadings`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Luminance by user
 *
 * @param args
 */
export const getLuminanceReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReadings';
    const query = `MATCH (:User {id: {userId}})-[]-(room:Room)-[]-(:Sensor {type: 'Luminance'})-[]-(reading:Reading)
                   WHERE reading.timestamp >= dateTime({startDateTime}) AND
                         reading.timestamp <= dateTime({endDateTime})
                   WITH room.name as roomName, {
                       value: toFloat(properties(reading).value),
                       timestamp: toInteger(datetime(properties(reading).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReadings`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Ultraviolet by user
 *
 * @param args
 */
export const getUltraVioletReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReadings';
    const query = `MATCH (:User {id: {userId}})-[]-(room:Room)-[]-(:Sensor {type: 'Ultraviolet'})-[]-(reading:Reading)
                   WHERE reading.timestamp >= dateTime({startDateTime}) AND
                         reading.timestamp <= dateTime({endDateTime})
                   WITH room.name as roomName, {
                       value: toFloat(properties(reading).value),
                       timestamp: toInteger(datetime(properties(reading).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReadings`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Relative Humidity by user
 *
 * @param args
 */
export const getHumidityReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReadings';
    const query = `MATCH (:User {id: {userId}})-[]-(room:Room)-[]-(:Sensor {type: 'Relative Humidity'})-[]-(reading:Reading)
                   WHERE reading.timestamp >= dateTime({startDateTime}) AND
                         reading.timestamp <= dateTime({endDateTime})
                   WITH room.name as roomName, {
                       value: toFloat(properties(reading).value),
                       timestamp: toInteger(datetime(properties(reading).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReadings`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Motion by user
 *
 * @param args
 */
export const getMotionReadingsByUser = async (args: QueryArguments): Promise<object> => {
    const objectKey = 'sensorReadings';
    const query = `MATCH (:User {id: {userId}})-[]-(room:Room)-[]-(:Sensor {type: 'Motion'})-[]-(reading:Reading)
                   WHERE reading.timestamp >= dateTime({startDateTime}) AND
                         reading.timestamp <= dateTime({endDateTime})
                   WITH room.name as roomName, {
                       value: toFloat(properties(reading).value),
                       timestamp: toInteger(datetime(properties(reading).timestamp).epochSeconds)
                   } as data
                   ORDER BY data.timestamp
                   RETURN { name: roomName, data: COLLECT(data) } AS sensorReadings`;
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
