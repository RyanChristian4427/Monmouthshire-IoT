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

    if (response.body.token) {
        return response.body.token;
    } else return 'Error';
};

describe('POST /api/v1/users/login', () => {
    const data = {
        user: {
            email: 'smoketest@example.com',
            password: 'came try steady fewer'
        }
    };
    it('should return 200 OK with Token', async () => {
       const response = await request(app)
           .post('/api/v1/users/login')
           .send(data);
       return (
           expect(response.status).toBe(200),
           expect(response.body.success).toBe(true),
           expect(response.body.message).toBe('Authentication successful'),
           expect(response.body.token).toBeDefined
       );
    });
});

describe('POST /api/v1/users/login', () => {
    const data = {
        user: {
            email: 'smoketest@example.com',
            password: 'wrong password'
        }
    };
    it('should return 401 Unauthorized with Incorrect Password', async () => {
        return request(app)
            .post('/api/v1/users/login')
            .send(data)
            .expect(401, {
                success: false,
                message: 'Incorrect Password'
            });
    });
});

describe('POST /api/v1/users/login', () => {
    const data = {
        user: {
            email: 'smoketester@example.com',
            password: 'came try steady fewer'
        }
    };
    it('should return 401 Unauthorized with Unknown User', async () => {
        return request(app)
            .post('/api/v1/users/login')
            .send(data)
            .expect(401, {
                success: false,
                message: 'Unknown User'
            });
    });
});

// describe('GET /api/v1/messages', () => {
//     it('should return 401 Unauthorized with Auth token is not valid', async () => {
//         return request(app)
//             .get('/api/v1/messages')
//             .auth('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9' +
//                 '.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ' +
//                 '.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c', {type: 'bearer'})
//             .expect(401, {
//                 success: false,
//                 message: 'Auth token is not valid'
//             });
//     });
//
//     it('should return 401 Unauthorized with Auth token is not supplied', async () => {
//         return request(app)
//             .get('/api/v1/messages')
//             .auth('', {type: 'bearer'})
//             .expect(401, {
//                 success: false,
//                 message: 'Auth token is not supplied'
//             });
//     });
// });
