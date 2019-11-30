import { Server } from 'socket.io';
import ClientSocket from './clientSocket';
import OZWServiceSocket from './serviceSocket';

export const setUpSockets = (io: Server): void => {
    const clientSocket = new ClientSocket(io);
    const ozwServiceSocket = new OZWServiceSocket(io);

    clientSocket.setUpSocketConnection();
    ozwServiceSocket.setUpSocketConnection();
};

const setUpClient = () => {

};

