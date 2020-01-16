import pgPromise from 'pg-promise';
import {DATABASE_URL} from './secrets';

const pgp = pgPromise({
    receive: (data) => {
        camelizeColumns(data);
    }
});

export const db = pgp(DATABASE_URL);

const camelizeColumns = (data: any) => {
    const template = data[0];
    for (const prop in template) {
        const camel = pgPromise.utils.camelize(prop);
        if (!(camel in template)) {
            for (let i = 0; i < data.length; i++) {
                const d = data[i];
                d[camel] = d[prop];
                delete d[prop];
            }
        }
    }
};
