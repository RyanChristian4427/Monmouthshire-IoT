import neo4j from 'neo4j-driver';
import { dbHost, dbUser, dbPassword } from '../constants';

// Init driver
export const driver = neo4j.driver(
    dbHost,
    neo4j.auth.basic(dbUser, dbPassword)
);

export const fetchQuery = (query: string, objectKey: string, args: object) => {
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

export const insertQuery = (query: string, objectKey: string, args: object) => {
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
