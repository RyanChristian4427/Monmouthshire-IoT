import textMessage from '../models/textMessage';

export const createTextMessage = (newTextMessage: any): textMessage => {
    return {
        from: newTextMessage.msgFrom,
        body: newTextMessage.msgBody,
    }
}