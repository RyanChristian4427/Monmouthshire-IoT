import { Response, Request, Router } from 'express';

import {checkToken} from 'src/api/middleware';
import {ChatMessage, Message} from 'src/models/Message';

const router = Router();

router.post('/message', checkToken, (req: Request, res: Response) => {
    const messageData: ChatMessage = req.body.message;

    const message = new Message({
        username: messageData.username,
        text: messageData.text,
        datetimestamp: messageData.datetimestamp,
    });

    message.save()
        .then(() => {
            res.status(204).send();
        })
        .catch((err) => {
            res.status(500).json({
                success: false,
                message: err
            }).send();
        });
});

router.get('/messages', checkToken, (req: Request, res: Response) => {
    Message.find({}, function(err: string, messages: ChatMessage) {
        res.json(messages);
    });
});

export default router;
