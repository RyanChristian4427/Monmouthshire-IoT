import logger from 'src/util/logger';
import { Response, Request, Router } from 'express';
import { insertNewSensor, insertNewRoom } from 'src/database/repository/sensorRepository';

const router = Router();

/**
 * Add a new sensor
 */
router.post('/sensors/new', (req: Request, res: Response) => {
    logger.info('New sensor received');
    logger.debug(req.body.sensor);
    insertNewSensor(req.body.sensor)
        .then((result) => {
            res.send({data: result});
        })
        .catch((err) => {
            logger.error(err);
        });
});

/**
 * Add a new room
 */
router.post('/room/new', (req: Request, res: Response) => {
    logger.info('New room received');
    logger.debug(req.body.room);
    insertNewRoom(req.body.room)
        .then((result) => {
            res.send({data: result});
        })
        .catch((err) => {
            logger.error(err);
        });
});

export default router;
