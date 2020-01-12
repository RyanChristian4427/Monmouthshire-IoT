import { Response, Request, Router } from 'express';

import {LoginUser} from 'src/models/User';
import {checkCredentials, register} from 'src/services/authService';

const router = Router();

router.post('/users/login', (req: Request, res: Response) => {
    const credentials: LoginUser = req.body.user;

    checkCredentials(credentials)
        .then((user) => {
            res.status(200).json({
                    success: true,
                    message: 'Authentication successful',
                    user: user
                }
            );
        }).catch((error) => {
            res.status(401).json({
                success: false,
                message: error
            });
        });
});

router.post('/users/register', (req: Request, res: Response) => {
    const registrationDetails = req.body.user;

    register(registrationDetails)
        .then((user) => {
            res.status(200).json({
                success: true,
                message: 'Registration successful',
                user: user
            });
        }).catch((error) => {
            if (error.constraint.includes('unique_email')) {
                res.status(409).json({
                    success: false,
                    message: 'Non-Unique Email'
                });
            } else {
                res.status(400).json({
                    success: false,
                    message: 'Unknown Error'
                });
            }
        });
});

export default router;
