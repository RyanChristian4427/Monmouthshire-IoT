import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const NEO4JDB_URI = prod ? process.env['NEO4J_URI'] : process.env['NEO4J_URI_LOCAL'];
export const NEO4JDB_USER = prod ? process.env['NEO4J_USER'] : process.env['NEO4J_USER_LOCAL'];
export const NEO4JDB_PASS = prod ? process.env['NEO4J_PASS'] : process.env['NEO4J_PASS_LOCAL'];

if (!NEO4JDB_URI) {
    if (prod) {
        logger.error('No neo4j connection string. Set NEO4J_URI environment variable.');
    } else {
        logger.error('No neo4j connection string. Set NEO4J_URI_LOCAL environment variable.');
    }
    process.exit(1);
}

export const USER = process.env['LOGIN_USER'];
export const PASS = process.env['LOGIN_PASS'];

export const JWT_SECRET = process.env['JWT_SECRET'];
