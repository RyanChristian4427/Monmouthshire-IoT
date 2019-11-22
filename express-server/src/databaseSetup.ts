import neo4j from 'neo4j-driver';
import { dbHost, dbUser, dbPassword } from './constants';

// Init driver
export const driver = neo4j.driver(
    dbHost,
    neo4j.auth.basic(dbUser, dbPassword)
)