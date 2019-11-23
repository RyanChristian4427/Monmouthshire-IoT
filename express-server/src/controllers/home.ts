import express from 'express'

var router = express.Router();

router.get('/', (req, res, next) => {
    res.send('hello world');
})

export default router;