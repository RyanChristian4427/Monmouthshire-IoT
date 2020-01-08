import logger from 'src/util/logger';
import { Response, Request, Router } from 'express';
import {insertNewMultiSensor} from 'src/database/repository/sensorRepository';

const router = Router();

/**
 * Add a new multi sensor
 */
router.post('/sensors/multi/new', (req: Request, res: Response) => {
    insertNewMultiSensor(req.body.sensor)
        .then((result) => {
            res.send({data: result});
        })
        .catch((err) => {
            logger.error(err);
        });
});

export default router;
