import socketIoClient from 'socket.io-client';

const socket = socketIoClient.connect('http://localhost:3030');

export default socket;
