import logger from 'src/util/logger';
import { checkToken } from 'src/api/middleware';
import { Response, Request, Router } from 'express';
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
router.get('/sensorReadings/all/:userId', checkToken, (req: Request, res: Response) => {
    const args = {userId:decodeURI(req.params.userId)};
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
router.get('/sensorReadings/temperature/:userId', checkToken, (req: Request, res: Response) => {
    const args = { userId: decodeURI(req.params.userId) };
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
router.get('/sensorReadings/motion/:userId', checkToken, (req: Request, res: Response) => {
    const args = { userId: decodeURI(req.params.userId) };
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
router.get('/sensorReadings/luminance/:userId', checkToken, (req: Request, res: Response)=> {
    const args = { userId: decodeURI(req.params.userId) };
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
router.get('/sensorReadings/ultra-vi/:userId', checkToken, (req: Request, res: Response) => {
    const args = { userId: decodeURI(req.params.userId) };
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
router.get('/sensorReadings/humidity/:userId', checkToken, (req: Request, res: Response) => {
    const args = { userId: decodeURI(req.params.userId) };
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
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            logger.error(err);
            res.status(500).json({message: err});
        });
});

export default router;
