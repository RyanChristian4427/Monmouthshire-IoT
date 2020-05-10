import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from 'src/app';
import { login } from 'test/common';

chai.use(chaiHttp);

describe('GET /api/v1/sensors', () => {
    it('should return 200 Ok', async () => {
        const response = await chai
            .request(app)
            .get('/api/v1/sensors')
            .set('Authorization', `Bearer ${await login()}`);
        expect(response.status).toBe(200);
    });

    it('should return 401 Unauthorized with Expired Access Token', async () => {
        const response = await chai
            .request(app)
            .get('/api/v1/sensors')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzbW9rZXRlc3RAZXhhbXBsZS5jb2' +
                    '0iLCJpYXQiOjE1Nzk5MDQxMTQsImV4cCI6MTU3OTg5MDUxNH0.pEmR08Kx07udjI5UdG-NvO9TeZ-8Dg-p9yblXjiS4Lk',
            );
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Access token has expired');
    });

    it('should return 401 Unauthorized with Invalid Access Token Signature', async () => {
        const response = await chai
            .request(app)
            .get('/api/v1/sensors')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoic21va2V0ZXN0QGV4YW1wbGUuY2' +
                    '9tIiwiaWF0IjoxNTc5OTA0MTE0LCJleHAiOjE1Nzk5OTA1MTR9.I-aibVJ6N7DcvIHefaJlhblDErXqKt5e4jTW7H_8ugI',
            );
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Access token has invalid signature');
    });

    // Not entirely sure how to trigger this, the route is just there for safety, if it isn't one of the above reasons
    it('should return 401 Unauthorized with Invalid Access Token', async () => {
        const response = await chai
            .request(app)
            .get('/api/v1/sensors')
            .set('Authorization', 'Bearer Obviously_Malformed_JWT');
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Access token is not valid');
    });

    it('should return 401 Unauthorized with No Access Token Signature', async () => {
        const response = await chai.request(app).get('/api/v1/sensors');
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Access token is not supplied');
    });
});
