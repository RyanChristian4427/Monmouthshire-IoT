import {app, server} from 'src/app';
import { port } from 'src/util/secrets';
import logger from 'src/util/logger';

server.listen(port, function(){
    logger.info(`App is running at http://localhost:${app.get('port')}`);
    logger.info('Press CTRL-C to stop');
});

export default app;
