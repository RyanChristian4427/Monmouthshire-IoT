import { Response, Request, Router } from 'express';
import bcrypt from 'bcrypt';

import {LoginUser} from 'src/models/User';
import {USER, PASS} from 'src/util/secrets';

const router = Router();

router.post('/users/login', (req: Request, res: Response) => {
    const credentials: LoginUser = req.body.user;
    if (credentials.email == USER) {
        bcrypt.compare(credentials.password, PASS, function (err, success) {
            if (success) {
                res.status(200).json({ messages: 'Success' });
            } else {
                res.status(401).json({ errors: 'Incorrect Password'});
            }
        });
    } else {
        res.status(401).json({ errors: 'Unknown User' });
    }
});

export default router;
