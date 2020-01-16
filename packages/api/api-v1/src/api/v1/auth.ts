import { Response, Request, Router } from 'express';

import {LoginUser} from 'src/models/User';
import {checkCredentials, register} from 'src/services/authService';
import logger from 'src/util/logger';

const router = Router();

router.post('/users/login', (req: Request, res: Response) => {
    logger.debug('Authentication request made');
    const credentials: LoginUser = req.body.user;
    logger.debug(`Attempting to authenticate ${credentials.email}`);

    checkCredentials(credentials)
        .then((user) => {
            logger.debug(`Authentication for user ${credentials.email} was successful`);
            res.status(200).json({
                    success: true,
                    message: 'Authentication successful',
                    user: user
                }
            );
        }).catch((error) => {
            logger.debug(`Authentication for user ${credentials.email} has failed due to ${error}`);
            res.status(401).json({
                success: false,
                message: error
            });
        });
});

router.post('/users/register', (req: Request, res: Response) => {
    logger.debug('Registration request made');
    const registrationDetails = req.body.user;
    logger.debug(`Attempting to register ${registrationDetails.email}`);

    register(registrationDetails)
        .then((user) => {
            logger.debug(`Registration for user ${registrationDetails.email} was successful`);
            res.status(200).json({
                success: true,
                message: 'Registration successful',
                user: user
            });
        }).catch((error) => {
            if (error.constraint.includes('unique_email')) {
                logger.debug(`Registration for user ${registrationDetails.email} has failed due to a non-unique email`);
                res.status(409).json({
                    success: false,
                    message: 'Non-Unique Email'
                });
            } else {
                logger.debug(`Registration for user ${registrationDetails.email} has failed due to ${error}`);
                res.status(400).json({
                    success: false,
                    message: 'Unknown Error'
                });
            }
        });
});

export default router;
