import { Response, Request, Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import {USER, PASS, JWT_SECRET} from 'src/util/secrets';

const router = Router();

interface LoginUser {
    user: string;
    password: string;
}

router.post('/users/login', (req: Request, res: Response) => {
    const credentials: LoginUser = req.body.user;
    if (credentials.user == USER) {
        bcrypt.compare(credentials.password, PASS, function (err, success) {
            if (success) {
                const token = jwt.sign(
                    { user: credentials.user},
                    JWT_SECRET,
                    { expiresIn: '24h' }
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
