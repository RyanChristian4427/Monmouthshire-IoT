import { Response, Request, Router } from 'express';

import { LoginUser } from 'src/models/User';
import { checkCredentials, homeRegister, register } from 'src/services/authService';
import logger from 'src/util/logger';

const router = Router();

router.post('/users/login', async (req: Request, res: Response) => {
    logger.debug('Authentication request made');
    const credentials: LoginUser = req.body.user;
    logger.debug(`Attempting to authenticate ${credentials.email}`);

    const user = await checkCredentials(credentials).catch((error) => {
        logger.debug(`Authentication for user ${credentials.email} has failed due to ${error}`);
        res.status(401).json({
            success: false,
            message: error,
        });
    });

    if (user) {
        logger.debug(`Authentication for user ${credentials.email} was successful`);
        res.status(200).json({
            success: true,
            message: 'Authentication successful',
            user,
        });
    }
});

router.post('/users/register', async (req: Request, res: Response) => {
    logger.debug('User registration request made');
    const registrationDetails = req.body.user;
    logger.debug(`Attempting to register user: ${registrationDetails.email}`);

    const user = await register(registrationDetails).catch((error) => {
        if (error.constraint.includes('users_email_key')) {
            logger.debug(`Registration for user ${registrationDetails.email} has failed due to a non-unique email`);
            res.status(409).json({
                success: false,
                message: 'Non-Unique Email',
            });
        } else {
            logger.debug(`Registration for user ${registrationDetails.email} has failed due to ${error}`);
            res.status(400).json({
                success: false,
                message: 'Unknown Error',
            });
        }
    });

    if (user) {
        logger.debug(`Registration for user ${registrationDetails.email} was successful`);
        res.status(200).json({
            success: true,
            message: 'Registration successful',
            user,
        });
    }
});

router.post('/homes/register', async (req: Request, res: Response) => {
    logger.debug('Home registration request made');
    const registrationDetails = req.body.user;
    logger.debug(`Attempting to register home: ${registrationDetails.email}`);

    const user = await homeRegister(registrationDetails).catch((error) => {
        if (error.constraint.includes('users_email_key')) {
            logger.debug(`Registration for home ${registrationDetails.email} has failed due to a non-unique email`);
            res.status(409).json({
                success: false,
                message: 'Non-Unique Email',
            });
        } else {
            logger.debug(`Registration for home ${registrationDetails.email} has failed due to ${error}`);
            res.status(400).json({
                success: false,
                message: 'Unknown Error',
            });
        }
    });

    if (user) {
        logger.debug(`Registration for home ${registrationDetails.email} was successful`);
        res.status(200).json({
            success: true,
            message: 'Registration successful',
            user,
        });
    }
});

export default router;
