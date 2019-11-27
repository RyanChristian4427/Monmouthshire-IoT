import request from 'supertest';
import app from '../../src/server';

describe('POST /api/v1/users/login', () => {
    const data = {
        user: {
            email: 'admin',
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
            email: 'admin',
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
            email: 'wrong user',
            password: 'wrong password'
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
