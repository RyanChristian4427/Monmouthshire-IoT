import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import logger from 'src/util/logger';
import { JWT_SECRET } from 'src/util/secrets';

export const checkToken = (req: Request, res: Response, next: NextFunction): Response | NextFunction => {
    let token: string;
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
        jwt.verify(token, JWT_SECRET, (err) => {
            const decodedToken: any = jwt.decode(token);
            if (err) {
                logger.debug(`JWT verification for user ${decodedToken.email} has failed due to ${err.message}`);
                if (err.message == 'jwt expired') {
                    return res.status(401).json({
                        success: false,
                        message: 'Access token has expired',
                    });
                }
                return res.status(401).json({
                    success: false,
                    message: 'Access token is not valid',
                });
            }
            logger.debug(`JWT verification for user ${decodedToken.email} has succeeded`);
            next();
        });
    } else {
        logger.debug('JWT verification for an unknown user has failed as they did not supply a token');
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied',
        });
    }
};
