import dotenv from 'dotenv';

dotenv.config();

export const API_URL = process.env.API_URL;
export const DB_LOCATION = process.env['DATABASE_LOCATION'];
