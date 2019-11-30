import textMessage from '../models/textMessage';

export const createTextMessage = (newTextMessage: any): textMessage => {
    return {
        id : create_UUID(),
        from: newTextMessage.msgFrom,
        body: newTextMessage.msgBody
    }
}

const create_UUID = (): string => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (dt + Math.random()*16)%16 | 0;
        dt = Math.floor(dt/16);
        return (c=='x' ? r :(r&0x3|0x8)).toString(16);
    });
    return uuid;
}