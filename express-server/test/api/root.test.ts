import request from 'supertest';
import app from 'src/app';

describe('GET /api/v1/', () => {
    it('should return 200 OK', async () => {
        const response = await request(app).get('/api/v1/');
        return expect(response.status).toBe(200);
    });
});
