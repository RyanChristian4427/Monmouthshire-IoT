import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from 'src/app';
import { login } from 'test/common';

chai.use(chaiHttp);

describe('GET /api/v1/example', () => {
    it('should return 204 No Content', async (done) => {
        chai.request(app)
            .get('/api/v1/example')
            .set('Authorization', `Bearer ${await login()}`)
            .end((err, res) => {
                expect(res.status).toBe(204);
                done();
            });
    });

    it('should return 401 Unauthorized with Expired Access Token', async (done) => {
        chai.request(app)
            .get('/api/v1/example')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzbW9rZXRlc3RAZXhhbXBsZS5jb2' +
                    '0iLCJpYXQiOjE1Nzk5MDQxMTQsImV4cCI6MTU3OTg5MDUxNH0.pEmR08Kx07udjI5UdG-NvO9TeZ-8Dg-p9yblXjiS4Lk',
            )
            .end((err, res) => {
                expect(res.status).toBe(401);
                expect(res.body.success).toBe(false);
                expect(res.body.message).toBe('Access token has expired');
                done();
            });
    });

    it('should return 401 Unauthorized with Invalid Access Token Signature', async (done) => {
        chai.request(app)
            .get('/api/v1/example')
            .set(
                'Authorization',
                'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTAsImVtYWlsIjoic21va2V0ZXN0QGV4YW1wbGUuY2' +
                    '9tIiwiaWF0IjoxNTc5OTA0MTE0LCJleHAiOjE1Nzk5OTA1MTR9.I-aibVJ6N7DcvIHefaJlhblDErXqKt5e4jTW7H_8ugI',
            )
            .end((err, res) => {
                expect(res.status).toBe(401);
                expect(res.body.success).toBe(false);
                expect(res.body.message).toBe('Access token has invalid signature');
                done();
            });
    });

    // Not entirely sure how to trigger this, the route is just there for safety, if it isn't one of the above reasons
    it('should return 401 Unauthorized with Invalid Access Token', async (done) => {
        chai.request(app)
            .get('/api/v1/example')
            .set('Authorization', 'Bearer Obviously_Malformed_JWT')
            .end((err, res) => {
                expect(res.status).toBe(401);
                expect(res.body.success).toBe(false);
                expect(res.body.message).toBe('Access token is not valid');
                done();
            });
    });

    it('should return 401 Unauthorized with No Access Token Signature', async (done) => {
        chai.request(app)
            .get('/api/v1/example')
            .end((err, res) => {
                expect(res.status).toBe(401);
                expect(res.body.success).toBe(false);
                expect(res.body.message).toBe('Access token is not supplied');
                done();
            });
    });
});
