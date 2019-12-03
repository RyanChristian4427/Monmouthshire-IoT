import SensorReading from 'src/database/models/sensorReading';
import { fetch, insert } from 'src/database/databaseConnectors';
import logger from 'src/util/logger';
import { createSensorReading } from 'src/database/mappers/sensorReadingMapper';

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
export const getAllReadings = async (): Promise<object> => {
    const query = 'MATCH (sensorReading:SensorReading) RETURN sensorReading';
    const objectKey = 'sensorReading';
    return await fetchBuilder(query, objectKey, {});
};

/**
 * Return all SensorReading nodes of type Temperature by user
 *
 * @param args
 */
export const getTempReadingsByUser = async (args: object): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH 
                      (sensorReading:SensorReading
                          { userId: {userId}, type: 'Temperature', unit: 'C' })
                              RETURN properties(sensorReading) AS sensorReading`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Luminance by user
 *
 * @param args
 */
export const getLuminanceReadingsByUser = async (args: object): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH 
                     (sensorReading:SensorReading
                         { userId: {userId}, type: 'Luminance' })
                              RETURN properties(sensorReading) AS sensorReading`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Ultraviolet by user
 *
 * @param args
 */
export const getUltraVioletReadingsByUser = async (args: object): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH 
                     (sensorReading:SensorReading 
                         { userId = {userId}, type = 'Ultraviolet' })
                              RETURN properties(sensorReading) AS sensorReading`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Relative Humidity by user
 *
 * @param args
 */
export const getHumidityReadingsByUser = async (args: object): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH 
                     (sensorReading:SensorReading
                         { userId = {userId}, type = 'Relative Humidity' })
                             RETURN properties(sensorReading) AS sensorReading`;
    return await fetchBuilder(query, objectKey, args);
};

/**
 * Return all SensorReading nodes of type Motion by user
 *
 * @param args
 */
export const getMotionReadingsByUser = async (args: object): Promise<object> => {
    const objectKey = 'sensorReading';
    const query = `MATCH 
                      (sensorReading:SensorReading
                          { userId: {userId}, type: 'Motion' })
                               RETURN properties(sensorReading) AS sensorReading`;
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
