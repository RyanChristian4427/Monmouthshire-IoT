import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from 'src/app';

chai.use(chaiHttp);

export const login = async (): Promise<string> => {
    const response = await chai
        .request(app)
        .post('/api/v1/users/login')
        .send({
            user: {
                email: 'smoketest@example.com',
                password: 'came try steady fewer',
            },
        });

    if (response.body.user) return response.body.user.token;
    return 'Error';
};
