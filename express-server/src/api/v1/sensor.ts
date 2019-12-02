import logger from 'src/util/logger';
import { Response, Request, Router } from 'express';
import { insertNewSensor } from 'src/database/repository/sensorReadingRepo';

const router = Router();

/**
 * Add a new sensor reading
 */
router.post('/sensors/new', (req: Request, res: Response) => {
    logger.info('New sensor received');
    insertNewSensor(req.body.sensor)
        .then((result) => {
            res.send({data: result});
        })
        .catch((err) => {
            logger.error(err);
        });
});

export default router;
