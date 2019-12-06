import { Response, Request, NextFunction, Router } from 'express';
import { insertNewTextMessage, getAllMessages, deleteMessage } from '../../database/repository/textMessageRepo';

const MessagingResponse = require('twilio').twiml.MessagingResponse;
const router = Router();

router.post('/sms', (req: Request, res: Response, next: NextFunction) => {
    const msgFrom = req.body.From;
    const msgBody = req.body.Body;
    const twiml = new MessagingResponse();
    twiml.message(msgBody);
    res.writeHead(200, {'Content-Type': 'text/xml'});
    res.end(twiml.toString());
    insertNewTextMessage({msgFrom, msgBody})
        .catch((err) => {
            next(err);
        });
});

router.get('/sms', (req: Request, res: Response, next: NextFunction) => {
    getAllMessages()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            next(err);
        });
});

router.delete('/sms/:id', (req: Request, res: Response, next: NextFunction) => {
    const id = req.params.id;
    deleteMessage(id)
    .then((result) => {
        res.send(result);
    })
    .catch((err) => {
        next(err);
    });
});

export default router;