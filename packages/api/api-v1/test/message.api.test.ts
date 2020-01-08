import request from 'supertest';
import {app} from 'src/app';
import {login} from 'test/auth.api.test';

let jwt: string;

describe('GET /api/v1/messages', () => {
    if (!jwt) {
        login()
            .then((tokenResult: string) => jwt = tokenResult);
    }

    it('should return 200 OK', async () => {
        const response = await request(app)
            .get('/api/v1/messages')
            .auth(jwt, {type: 'bearer'});
        return expect(response.status).toBe(200);
    });
});

describe('POST /api/v1/message', () => {
    if (!jwt) {
        login()
            .then((tokenResult: string) => jwt = tokenResult);
    }

    const data = {
        message: {
            username: 'Smoke Test',
            text: 'Hello world!',
            datetimestamp: 'Mon Dec 23 2019 22:36:02 GMT+0000 (Greenwich Mean Time)',
        }
    };
    it('should return 204 No Content', async () => {
        const response = await request(app)
            .post('/api/v1/message')
            .auth(jwt, {type: 'bearer'})
            .send(data);
        return (
            expect(response.status).toBe(204)
        );
    });
});

