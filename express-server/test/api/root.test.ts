import request from 'supertest';
import app from 'src/app';

describe('GET /api/v1/', () => {
    it('should return 200 Auth token not supplied', async () => {
        const response = await request(app)
            .get('/api/v1/');
        return (
            expect(response.status).toBe(401),
            expect(response.body.message).toBe('Auth token is not supplied')
        );
    });
});

describe('GET /api/v1/', () => {
    it('should return 200 Auth Token invalid', async () => {
        const response = await request(app)
            .get('/api/v1/')
            .set('Authorization', 'Bearer invalid_token');
        return (
            expect(response.status).toBe(401),
                expect(response.body.message).toBe('Auth token is not valid')
        );
    });
});
