import { Response, Request, Router } from 'express';
import {checkToken} from 'src/api/middleware';

const router = Router();

router.get('/', checkToken, (req: Request, res: Response) => {
    res.json('Hello World!');
});

export default router;
