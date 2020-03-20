import logger from './logger';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

if (fs.existsSync(path.join(__dirname, '../../', '.env'))) {
    logger.debug('Using .env file to supply config environment variables');
    dotenv.config({ path: path.join(__dirname, '../../', '.env') });
}

export const DATABASE_URL = process.env.DATABASE_URL;

export const JWT_SECRET = process.env['JWT_SECRET'];

if (!DATABASE_URL) {
    logger.error('No postgres connection string. Set Postgres_DB environment variable.');
    process.exit(1);
}
