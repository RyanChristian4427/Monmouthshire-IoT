import logger from 'src/util/logger';
import { Response, Request, NextFunction, Router } from 'express';
import {
    insertNewReading,
    getAllReadings,
    getHumidityReadingsByUser,
    getLuminanceReadingsByUser,
    getMotionReadingsByUser,
    getTempReadingsByUser,
    getUltraVioletReadingsByUser
} from 'src/database/repository/sensorReadingRepo';

const router = Router();

/**
 * Return all sensor readings
 */
router.get('/sensorReadings/all', (req: Request, res: Response, next: NextFunction) => {
    getAllReadings()
        .then(
        (result) => {
            res.send({data: result});
        })
        .catch((err) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Return all temperature readings by user id
 */
router.get('/sensorReadings/temperature/:userId', (req: Request, res: Response, next: NextFunction) => {
    const args = {userId: parseInt(req.params.userId)};
    getTempReadingsByUser(args)
        .then(
            (result) => {
                res.send({data: result});
            })
        .catch((err) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Return all motion readings by user id
 */
router.get('/sensorReadings/motion/:userId', (req: Request, res: Response, next: NextFunction) => {
    const args = {userId: parseInt(req.params.userId)};
    getMotionReadingsByUser(args)
        .then(
            (result: object) => {
                res.send({data: result});
            })
        .catch((err) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Return all luminance readings by user id
 */
router.get('/sensorReadings/luminance/:userId', (req: Request, res: Response, next: NextFunction)=> {
    const args = {userId: parseInt(req.params.userId)};
    getLuminanceReadingsByUser(args)
        .then(
            (result: object) => {
                res.send({data: result});
            })
        .catch((err) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Return all ultraviolet readings by user id
 */
router.get('/sensorReadings/ultra-vi/:userId', (req: Request, res: Response, next: NextFunction) => {
    const args = {userId: parseInt(req.params.userId)};
    getUltraVioletReadingsByUser(args)
        .then(
            (result: object) => {
                res.send({data: result});
            })
        .catch((err) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Return humidity sensor readings by user id
 */
router.get('/sensorReadings/humidity/:userId', (req: Request, res: Response, next: NextFunction) => {
    const args = {userId: parseInt(req.params.userId)};
    getHumidityReadingsByUser(args)
        .then(
            (result: object) => {
                res.send({data: result});
            })
        .catch((err) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Add a new sensor reading
 */
router.post('/sensorReadings/new', (req: Request, res: Response, next: NextFunction) => {
    logger.info('New sensor reading received');
    insertNewReading(req.body.sensorReading)
        .then((result) => {
            res.send({data: result});
        })
        .catch((err) => {
            logger.error(err);
            next(err);
        });
});

export default router;
