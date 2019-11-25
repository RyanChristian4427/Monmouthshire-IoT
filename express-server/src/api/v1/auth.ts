import { Response, Request, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {LoginUser} from 'src/models/User';
import {USER, PASS, JWT_SECRET} from 'src/util/secrets';

const router = Router();

router.post('/users/login', (req: Request, res: Response) => {
    const credentials: LoginUser = req.body.user;
    if (credentials.email == USER) {
        bcrypt.compare(credentials.password, PASS, function (err, success) {
            if (success) {
                const token = jwt.sign(
                    { email: credentials.email},
                    JWT_SECRET,
                    { expiresIn: '2h' }
                );
                res.status(200).json(
                    {
                        success: true,
                        message: 'Authentication successful',
                        token: token
                    }
                );
            } else {
                res.status(401).json({
                    success: false,
                    message: 'Incorrect Password'
                });
            }
        });
    } else {
        res.status(401).json({
            success: false,
            message: 'Unknown User'
        });
    }
});

export default router;
>>>>>>> develop
