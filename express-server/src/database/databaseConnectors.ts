import neo4j from 'neo4j-driver';
import { dbHost, dbUser, dbPassword } from '../constants';

// Init driver
export const driver = neo4j.driver(
    'bolt://localhost',
    neo4j.auth.basic('neo4j', 'password')
);

/**
 * Returns an array of objects matching the query specified
 *
 * @param query - neo4j cypher
 * @param objectKey - the reference to the objects being fetched n the query
 * @param args - any arguments you would like to pass to the query
 */
export const fetch = (query: string, objectKey: string, args: object) => {
    const session = driver.session();
    return session
        .run(query,
            args
        )
        .then(result => {
            session.close();
            return result.records.map((result) => result.get(objectKey));
        })
        .catch(error => {
            session.close();
            throw error;
        });
};

/**
 * Inserts a new node and returns it as an object upon successfull persistence
 *
 * @param query
 * @param objectKey
 * @param args
 */
export const insert = (query: string, objectKey: string, args: object) => {
    const session = driver.session();
    return session
        .run(query,
            args
        )
        .then(result => {
            session.close();
            return result.records[0].get(objectKey)
        })
        .catch(error => {
            session.close();
            throw error;
        });
};
