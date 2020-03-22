import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from 'src/app';
import { login } from 'test/common';

chai.use(chaiHttp);

describe('POST /api/v1/sensors/all', () => {
    it('should return 200 OK with Data', async () => {
        const response = await chai
            .request(app)
            .get('/api/v1/sensors')
            .set('Authorization', `Bearer ${await login()}`);
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Data retrieval successful');
    });

    // it('should return 401 Bad Request', async (done) => {
    //     chai.request(app)
    //         .get('/api/v1/sensors/all')
    //         // TODO Fix this once you can request data for an email, and not rely on tokens
    //         .set(
    //             'Authorization',
    //             'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJmYWtlc21va2V0ZXN0QGV4YW1wbG' +
    //                 'UuY29tIiwiaWF0IjoxNTgwNTA3NjQzLCJleHAiOjE4ODA1OTQwNDN9.47P9F5C_YcxMVBxcwBa3_HAV1dDacm-va97sNCL5iI8',
    //         )
    //         .end((err, res) => {
    //             console.log(res);
    //             expect(res.status).toBe(401);
    //             expect(res.body.success).toBe(false);
    //             done();
    //         });
    // });
});
