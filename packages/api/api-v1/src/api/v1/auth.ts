import { Response, Request, Router } from 'express';

import {LoginUser} from 'src/models/User';
import {checkCredentials} from 'src/services/authService';

const router = Router();

router.post('/users/login', (req: Request, res: Response) => {
    const credentials: LoginUser = req.body.user;

    checkCredentials(credentials)
        .then((user) => {
            res.status(200).json(
                {
                    success: true,
                    message: 'Authentication successful',
                    user: user
                }
            );
        }).catch((error) => {
            res.status(401).json({
                success: false,
                message: error
            }).send();
        });
});

export default router;
