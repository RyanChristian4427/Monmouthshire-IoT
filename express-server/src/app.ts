import path from "path";
import http from 'http';
import express from "express";
import socket from 'socket.io';
import { driver } from './databaseSetup'
import { port, websocketPort } from './constants';
import homeRouter from './controllers/home';
import exampleRouter from './controllers/example';

const app = express();

var server = http.createServer(app);
var io = socket(server);

io.on('connection', (client) => {
    console.log('client connected')
    client.on('dbChange', (status) => {
        io.emit('dbUpdate', status)
    })
})
server.listen(websocketPort);

// Allows driver to be used throughout express
app.locals.driver = driver; 


app.set( "views", path.join( __dirname, "views" ));

app.use('/', homeRouter);
app.use('/info', exampleRouter);

app.listen(port, () => {
    // tslint:disable-next-line:no-console
    console.log( `server started at http://localhost:${ port }` );
});

