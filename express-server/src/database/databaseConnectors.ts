import neo4j from 'neo4j-driver';
import SensorReading from 'src/database/models/sensorReading';
import {NEO4JDB_URI, NEO4JDB_USER, NEO4JDB_PASS} from 'src/util/secrets';
import logger from 'src/util/logger';

// Init driver
export const driver = neo4j.driver(
    NEO4JDB_URI,
    neo4j.auth.basic(NEO4JDB_USER, NEO4JDB_PASS)
);

/**
 * Returns an array of objects matching the query specified
 *
 * @param query - neo4j cypher
 * @param objectKey - the reference to the objects being fetched n the query
 * @param args - any arguments you would like to pass to the query
 */
export const fetch = (query: string, objectKey: string, args: object): Promise<any[]> => {
    const session = driver.session();
    return session
        .run(query,
            args
        )
        .then((result) => {
            session.close();
            return result.records.map((result) => result.get(objectKey));
        })
        .catch((error) => {
            session.close();
            throw error;
        });
};

/**
 * Inserts a new node and returns it as an object upon successful persistence
 *
 * @param query
 * @param objectKey
 * @param args
 */
export const insert = (query: string, objectKey: string, args: object): Promise<any> => {
    logger.info('inserting shiz');
    const session = driver.session();
    return session
        .run(query,
            args
        )
        .then((result) => {
            session.close();
            return result.records[0].get(objectKey);
        })
        .catch((error) => {
            session.close();
            throw error;
        });
};
