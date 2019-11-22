import dotenv from "dotenv";

// Init dotenv
dotenv.config();

export const port = process.env.SERVER_PORT;
export const dbHost = process.env.DB_HOST as string;
export const dbUser = process.env.DB_USER as string;
export const dbPassword = process.env.DB_PASSWORD as string;
export const websocketPort = process.env.WEBSOCKET_PORT as string;