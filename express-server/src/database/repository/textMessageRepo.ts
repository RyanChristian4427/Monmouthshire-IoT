import TextMessage from '../models/textMessage';
import { fetch, insert } from 'src/database/databaseConnectors';
import { createTextMessage } from '../mappers/textMessageMapper';

export const fetchBuilder = (query: string, objectKey: string, args: object): Promise<object>=> {
    return fetch(query, objectKey, args)
        .then(
            (result: object) => {
                return result;
            })
        .catch((err) => {
            throw err;
        });
};

export const insertNewTextMessage = (textMessage: object): Promise<TextMessage> => {
    const objectKey = 'message';
    const query = `CREATE(message:Message {from: {from}, body: {body}, timestamp: datetime()})`;
    return insert(query, objectKey, createTextMessage(textMessage))
        .then((result) => {
            return result
        });
};

export const getAllMessages = (): Promise<object> => {
    const query = 'MATCH(message:Message) return properties(message) AS message'
    const objectKey = 'message'
    return fetchBuilder(query, objectKey, {})
}