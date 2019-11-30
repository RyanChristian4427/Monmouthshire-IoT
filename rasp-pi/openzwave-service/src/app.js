import io from 'socket.io';
import ServerSocket from './sockets/serverSocket';
import {pollSensors} from './sensorPoll';

const socket = io.listen('http://localhost:3030');
const serverSocket = new ServerSocket(socket);

pollSensors();
