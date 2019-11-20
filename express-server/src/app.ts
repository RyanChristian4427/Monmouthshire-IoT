import path from "path";
import cors from 'cors';
import dotenv from "dotenv";
import express from "express";
import neo4j from 'neo4j-driver';
import homeRouter from './views/home';
import exampleRouter from './views/example';

// Init dotenv
dotenv.config();

const port = process.env.SERVER_PORT;
const dbHost = process.env.DB_HOST as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;

// Init driver
var driver = neo4j.driver(
    dbHost,
    neo4j.auth.basic(dbUser, dbPassword)
)

const app = express();
// Allows driver to be used throughout express
app.locals.driver = driver; 

app.use(cors());

app.set( "views", path.join( __dirname, "views" ));

app.use('/', homeRouter);
app.use('/info', exampleRouter);

app.listen( port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

