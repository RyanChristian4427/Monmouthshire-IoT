import { Response, Request, Router } from 'express';

const router = Router();

router.post('/users/login', (req: Request, res: Response) => {
    res.json({user: { email: 'hello', password: 'test' }});

    // Easy way to fail the login
    // res.status(500);
    // res.json('Example error message');
    // res.send();
});

export default router;
