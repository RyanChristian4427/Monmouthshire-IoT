import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
}

export const ENVIRONMENT = process.env.NODE_ENV;
const prod = ENVIRONMENT === 'production'; // Anything else is treated as 'dev'

export const POSTGRESDB_URI = prod ? process.env['POSTGRESDB_URI'] : process.env['POSTGRESDB_URI_LOCAL'];

export const JWT_SECRET = process.env['JWT_SECRET'];

if (!POSTGRESDB_URI) {
    if (prod) {
        logger.error('No mongo connection string. Set MONGODB_URI environment variable.');
    } else {
        logger.error('No mongo connection string. Set MONGODB_URI_LOCAL environment variable.');
    }
    process.exit(1);
}
