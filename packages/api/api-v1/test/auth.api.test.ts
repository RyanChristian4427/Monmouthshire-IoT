import request from 'supertest';
import {app} from 'src/app';

export const login = async (): Promise<string> => {
    const data = {
        user: {
            email: 'smoketest@example.com',
            password: 'came try steady fewer'
        }
    };
    const response = await request(app)
        .post('/api/v1/users/login')
        .send(data);

    if (response.body.user) {
        return response.body.user.token;
    } else return 'Error';
};

describe('POST /api/v1/users/login', () => {
    it('should return 200 OK with Token', async () => {
       const response = await request(app)
           .post('/api/v1/users/login')
           .send({
               user: {
                   email: 'smoketest@example.com',
                   password: 'came try steady fewer'
               }
           });
       return (
           expect(response.status).toBe(200),
           expect(response.body.success).toBe(true),
           expect(response.body.message).toBe('Authentication successful'),
           expect(response.body.user.token).toBeDefined
       );
    });

    it('should return 401 Unauthorized with Incorrect Password', async () => {
        return request(app)
            .post('/api/v1/users/login')
            .send({
                user: {
                    email: 'smoketest@example.com',
                    password: 'wrong password'
                }
            }).expect(401, {
                success: false,
                message: 'Incorrect Password'
            });
    });

    it('should return 401 Unauthorized with Unknown User', async () => {
        return request(app)
            .post('/api/v1/users/login')
            .send({
                user: {
                    email: 'unknownuser@example.com',
                    password: 'came try steady fewer'
                }
            }).expect(401, {
                success: false,
                message: 'Unknown User'
            });
    });
});

