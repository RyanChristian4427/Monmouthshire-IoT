import path from 'path';
import * as http from 'http';
import express from 'express';
import socketIo from 'socket.io';
import bodyParser from 'body-parser';
import {setUpSockets} from 'src/sockets/socketSetUp';
import apiV1 from 'src/api/v1/sensorConfiguration';

export const app = express();
export const server = http.createServer(app);
export const io = socketIo(server);
// Express configuration
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
// Socket configuration
setUpSockets(io);

app.use(
    express.static(path.join(__dirname, 'public'), { maxAge: 31557600000 })
);

app.use('/api/v1', apiV1);
