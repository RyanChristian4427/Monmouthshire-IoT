import path from "path";
import cors from 'cors';
import http from 'http';
import dotenv from "dotenv";
import express from "express";
import socket from 'socket.io';
import neo4j from 'neo4j-driver';
import homeRouter from './views/home';
import exampleRouter from './views/example';

const app = express();
// Init dotenv
dotenv.config();
var server = http.createServer(app);
var io = socket(server);

const port = process.env.SERVER_PORT;
const dbHost = process.env.DB_HOST as string;
const dbUser = process.env.DB_USER as string;
const dbPassword = process.env.DB_PASSWORD as string;
const websocketPort = process.env.WEBSOCKET_PORT as string;

io.on('connection', (client) => {
    console.log('client connected')
    client.on('dbChange', (status) => {
        io.emit('dbUpdate', status)
    })
})
server.listen(websocketPort);

// Init driver
var driver = neo4j.driver(
    dbHost,
    neo4j.auth.basic(dbUser, dbPassword)
)

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

