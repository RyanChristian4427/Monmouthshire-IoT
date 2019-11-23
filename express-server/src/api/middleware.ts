import { Request, Response, NextFunction} from 'express';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from 'src/util/secrets';

export const checkToken = (req: Request, res: Response, next: NextFunction) => {
    let token: string;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
        jwt.verify(token, JWT_SECRET, (err) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Auth token is not valid'
                });
            } else {
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};
