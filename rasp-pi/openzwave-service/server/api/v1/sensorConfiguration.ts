
const router = Router();

router.get('/', checkToken, (req: Request, res: Response) => {
    res.json('Hello World!');
});

export default router;



