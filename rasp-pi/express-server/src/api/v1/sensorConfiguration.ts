import { Response, Request, Router } from 'express';
const router = Router();

router.post('/update/:nodeId', (req: Request, res: Response) => {
    res.json('Hello World!');
});

export default router;
