import { Response, Request, Router } from 'express';

import { checkToken } from 'src/api/middleware';
import {
    insertNewReading,
    getAllReadings,
    getHumidityReadingsByUser,
    getLuminanceReadingsByUser,
    getMotionReadingsByUser,
    getTempReadingsByUser,
    getUltraVioletReadingsByUser
} from 'src/database/repository/sensorReadingRepository';
import {QueryArguments} from 'src/models/QueryArguments';
import logger from 'src/util/logger';

const router = Router();

const argsBuilder = (params: any): QueryArguments => {
    return {
        userId: decodeURI(params.userId),
        startDateTime: params.startDateTime,
        endDateTime: params.endDateTime
    };
};

/**
 * Return all sensor readings
 */
router.get('/sensorReadings/all/:userId/:startDateTime/:endDateTime', checkToken, (req: Request, res: Response) => {
    const args = argsBuilder(req.params);
    getAllReadings(args)
        .then(
            (result) => {
                res.send(result);
            })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({message: err});
        });
});

/**
 * Return all temperature readings by user id
 */
router.get('/sensorReadings/temperature/:userId/:startDateTime/:endDateTime', checkToken, (req: Request, res: Response) => {
    const args = argsBuilder(req.params);
    getTempReadingsByUser(args)
        .then(
            (result) => {
                res.send(result);
            })
        .catch((err) => {
            res.status(500).json({ message: String(err.code)});
        });
});

/**
 * Return all motion readings by user id
 */
router.get('/sensorReadings/motion/:userId/:startDateTime/:endDateTime', checkToken, (req: Request, res: Response) => {
    const args = argsBuilder(req.params);
    getMotionReadingsByUser(args)
        .then(
            (result: object) => {
                res.send(result);
            })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({message: err});
        });
});

/**
 * Return all luminance readings by user id
 */
router.get('/sensorReadings/luminance/:userId/:startDateTime/:endDateTime', checkToken, (req: Request, res: Response)=> {
    const args = argsBuilder(req.params);
    getLuminanceReadingsByUser(args)
        .then(
            (result: object) => {
                res.send(result);
            })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({message: err});
        });
});

/**
 * Return all ultraviolet readings by user id
 */
router.get('/sensorReadings/ultra-vi/:userId/:startDateTime/:endDateTime', checkToken, (req: Request, res: Response) => {
    const args = argsBuilder(req.params);
    getUltraVioletReadingsByUser(args)
        .then(
            (result: object) => {
                res.send(result);
            })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({message: err});
        });
});

/**
 * Return humidity sensor readings by user id
 */
router.get('/sensorReadings/humidity/:userId/:startDateTime/:endDateTime', checkToken, (req: Request, res: Response) => {
    const args = argsBuilder(req.params);
    getHumidityReadingsByUser(args)
        .then(
            (result: object) => {
                res.send(result);
            })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({message: err});
        });
});

/**
 * Add a new sensor reading
 */
router.post('/sensorReadings/new', (req: Request, res: Response) => {
    logger.info('New sensor reading received');
    insertNewReading(req.body.sensorReading)
        .then((result: any) => {
            //logger.info(result);
            res.send({data: result});
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({message: err});
        });
});

export default router;
