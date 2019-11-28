import TextMessage from '../models/textMessage';
import { fetch, insert } from 'src/database/databaseConnectors';
import { createTextMessage } from '../mappers/textMessageMapper';

export const insertNewTextMessage = (textMessage: object): Promise<TextMessage> => {
    const objectKey = 'message';
    const query = `CREATE(message:Message {from: {from}, body: {body}})`;
    return insert(query, objectKey, createTextMessage(textMessage))
        .then((result) => {
            return result
        });
};