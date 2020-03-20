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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const decodedToken: any = jwt.decode(token);
            const user = decodedToken?.email || 'Unknown';

            if (!err) {
                logger.debug(`JWT verification for user ${user} has succeeded`);
                res.locals.userInfo = decodedToken;
                next();
            } else {
                logger.debug(`JWT verification for user ${user} has failed due to ${err.message}`);

                if (err.message == 'jwt expired') {
                    return res.status(401).json({
                        success: false,
                        message: 'Access token has expired',
                    });
                } else if (err.message == 'invalid signature') {
                    return res.status(401).json({
                        success: false,
                        message: 'Access token has invalid signature',
                    });
                }
                return res.status(401).json({
                    success: false,
                    message: 'Access token is not valid',
                });
            }
        });
    } else {
        logger.debug('JWT verification for an unknown user has failed as they did not supply a token');
        return res.status(401).json({
            success: false,
            message: 'Access token is not supplied',
        });
    }
};
