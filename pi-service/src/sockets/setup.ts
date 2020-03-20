import io from 'socket.io';

import ClientSocket from 'src/sockets/clientSocket';
import logger from 'src/util/logger';

export const setUpSockets = (): ClientSocket => {
    const clientSocket = new ClientSocket(io.listen('3030'));
    logger.info('Opening socket to listen to client');
    clientSocket.setUpSocketConnection();
    return clientSocket;
};
