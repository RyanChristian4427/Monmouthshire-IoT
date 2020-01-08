import logger from './logger.js';
import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: '.env' });
}

export const API_URL = process.env['API_URL'];
export const DATABASE_LOCATION = process.env['DATABASE_LOCATION'];
export const USER_ID = process.env['USER_ID'];
