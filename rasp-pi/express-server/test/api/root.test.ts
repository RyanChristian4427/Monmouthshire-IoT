import request from 'supertest';
import {app} from 'src/app';

describe('POST /api/v1/update/5', () => {
    it('should return 200 OK', async () => {
        const response = await request(app)
            .post('/api/v1/update/5');
        return (
            expect(response.status).toBe(200),
            expect(response.body).toBe('Hello World!')
        );
    });
});
