import request from 'supertest';
import app from 'src/app';

describe('POST /api/v1/users/login', () => {
    const data = {
        user: {
            email: 'admin',
            password: 'came try steady fewer'
        }
    };
    it('should return 200 OK with Success', async () => {
       return request(app)
           .post('/api/v1/users/login')
           .send(data)
           .expect(200, {
               messages: 'Success'
           });
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
                errors: 'Incorrect Password'
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
                errors: 'Unknown User'
            });
    });
});
