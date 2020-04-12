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
});
