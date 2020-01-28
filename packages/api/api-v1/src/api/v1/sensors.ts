import { Response, Request, Router } from 'express';

import { checkToken } from 'src/api/middleware';
import { getSensors } from 'src/services/sensorService';
import logger from 'src/util/logger';

const router = Router();

router.get('/sensors/all', checkToken, (req: Request, res: Response) => {
    logger.debug(`Sensor data request made by user ${res.locals.userInfo.email}`);

    getSensors(res.locals.userInfo.email)
        .then((data) => {
            logger.debug(`Sensor data request for user ${res.locals.userInfo.email} was successful`);
            res.status(200).json({
                success: true,
                message: 'Data retrieval successful',
                data: data,
            });
        })
        .catch((error) => {
            logger.debug(`Sensor data request for user ${res.locals.userInfo.email} has failed due to ${error}`);
            res.status(400).json({
                success: false,
                message: error,
            });
        });
});

export default router;
