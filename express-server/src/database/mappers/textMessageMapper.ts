import textMessage from '../models/textMessage';

const createUUID = (): string => {
    let dt = new Date().getTime();
    const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        const r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
};

export const createTextMessage = (newTextMessage: any): textMessage => {
    return {
        id : createUUID(),
        from: newTextMessage.msgFrom,
        body: newTextMessage.msgBody
    };
};
