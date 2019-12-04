import logger from 'src/util/logger';
import { checkToken } from 'src/api/middleware';
import { Response, Request, NextFunction, Router } from 'express';
import {
    insertNewReading,
    getAllReadings,
    getHumidityReadingsByUser,
    getLuminanceReadingsByUser,
    getMotionReadingsByUser,
    getTempReadingsByUser,
    getUltraVioletReadingsByUser
} from 'src/database/repository/sensorReadingRepository';

const router = Router();

/**
 * Return all sensor readings
 */
router.get('/sensorReadings/all', checkToken, (req: Request, res: Response, next: NextFunction) => {
    getAllReadings()
        .then(
            (result: any) => {
                res.send({data: result});
            })
        .catch((err: any) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Return all temperature readings by user id
 */
router.get('/sensorReadings/temperature/:userId', checkToken, (req: Request, res: Response, next: NextFunction) => {
    const args = {userId: parseInt(req.params.userId)};
    getTempReadingsByUser(args)
        .then(
            (result: any) => {
                res.send({data: result});
            })
        .catch((err: any) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Return all motion readings by user id
 */
router.get('/sensorReadings/motion/:userId', checkToken, (req: Request, res: Response, next: NextFunction) => {
    const args = {userId: parseInt(req.params.userId)};
    getMotionReadingsByUser(args)
        .then(
            (result: object) => {
                res.send({data: result});
            })
        .catch((err: any) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Return all luminance readings by user id
 */
router.get('/sensorReadings/luminance/:userId', checkToken, (req: Request, res: Response, next: NextFunction)=> {
    const args = {userId: parseInt(req.params.userId)};
    getLuminanceReadingsByUser(args)
        .then(
            (result: object) => {
                res.send({data: result});
            })
        .catch((err: any) => {
            logger.error(err);

            next(err);
        });
});


/**
 * Return all ultraviolet readings by user id
 */
router.get('/sensorReadings/ultra-vi/:userId', checkToken, (req: Request, res: Response, next: NextFunction) => {
    const args = {userId: parseInt(req.params.userId)};
    getUltraVioletReadingsByUser(args)
        .then(
            (result: object) => {
                res.send({data: result});
            })
        .catch((err: any) => {
            logger.error(err);
            next(err);
        });
});

/**
 * Return humidity sensor readings by user id
 */
router.get('/sensorReadings/humidity/:userId', checkToken, (req: Request, res: Response, next: NextFunction) => {
    const args = {userId: parseInt(req.params.userId)};
    getHumidityReadingsByUser(args)
        .then(
            (result: object) => {
                res.send({data: result});
            })
        .catch((err: any) => {
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
        .then((result: any) => {
            res.send({data: result});
        })
        .catch((err: any) => {
            logger.error(err);
            next(err);
        });
});

export default router;
