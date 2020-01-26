import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from 'src/app';

chai.use(chaiHttp);

describe('POST /api/v1/users/login', () => {
    it('should return 200 OK with Token', async (done) => {
        chai.request(app)
            .post('/api/v1/users/login')
            .send({
                user: {
                    email: 'smoketest@example.com',
                    password: 'came try steady fewer',
                },
            })
            .end((err, res) => {
                expect(res.status).toBe(200);
                expect(res.body.success).toBe(true);
                expect(res.body.message).toBe('Authentication successful');
                expect(res.body.user.token).toBeDefined();
                done();
            });
    });

    it('should return 401 Unauthorized with Incorrect Password', async (done) => {
        chai.request(app)
            .post('/api/v1/users/login')
            .send({
                user: {
                    email: 'smoketest@example.com',
                    password: 'wrong password',
                },
            })
            .end((err, res) => {
                expect(res.status).toBe(401);
                expect(res.body.success).toBe(false);
                expect(res.body.message).toBe('Incorrect Password');
                done();
            });
    });

    it('should return 401 Unauthorized with Unknown User', async (done) => {
        chai.request(app)
            .post('/api/v1/users/login')
            .send({
                user: {
                    email: 'unknownuser@example.com',
                    password: 'came try steady fewer',
                },
            })
            .end((err, res) => {
                expect(res.status).toBe(401);
                expect(res.body.success).toBe(false);
                expect(res.body.message).toBe('Unknown User');
                done();
            });
    });
});

describe('POST /api/v1/users/register', () => {
    it('should return 200 OK', async (done) => {
        chai.request(app)
            .post('/api/v1/users/register')
            .send({
                user: {
                    firstName: 'smoke',
                    lastName: 'test',
                    email: 'newsmoketest@example.com',
                    password: 'came try steady fewer',
                },
            })
            .end((err, res) => {
                if (res.status == 200) {
                    expect(res.status).toBe(200);
                    expect(res.body.success).toBe(true);
                    expect(res.body.message).toBe('Registration successful');
                    expect(res.body.user).toBeDefined();
                } else {
                    expect(res.status).toBe(409);
                    expect(res.body.success).toBe(false);
                    expect(res.body.message).toBe('Non-Unique Email');
                }
                done();
            });
    });

    it('should return 409 Conflict with Non-Unique Email', async (done) => {
        chai.request(app)
            .post('/api/v1/users/register')
            .send({
                user: {
                    firstName: 'smoke',
                    lastName: 'test',
                    email: 'smoketest@example.com',
                    password: 'came try steady fewer',
                },
            })
            .end((err, res) => {
                expect(res.status).toBe(409);
                expect(res.body.success).toBe(false);
                expect(res.body.message).toBe('Non-Unique Email');
                done();
            });
    });
});

describe('POST /api/v1/homes/register', () => {
    it('should return 200 OK', async (done) => {
        chai.request(app)
            .post('/api/v1/homes/register')
            .send({
                user: {
                    firstName: 'smoke',
                    lastName: 'test',
                    email: 'newsmoketesthome@example.com',
                    password: 'came try steady fewer',
                },
            })
            .end((err, res) => {
                if (res.status == 200) {
                    expect(res.status).toBe(200);
                    expect(res.body.success).toBe(true);
                    expect(res.body.message).toBe('Registration successful');
                    expect(res.body.user).toBeDefined();
                    expect(res.body.user.refreshToken).toBeDefined();
                } else {
                    expect(res.status).toBe(409);
                    expect(res.body.success).toBe(false);
                    expect(res.body.message).toBe('Non-Unique Email');
                }
                done();
            });
    });

    it('should return 409 Conflict with Non-Unique Email', async (done) => {
        chai.request(app)
            .post('/api/v1/homes/register')
            .send({
                user: {
                    firstName: 'smoke',
                    lastName: 'test',
                    email: 'smoketesthome@example.com',
                    password: 'came try steady fewer',
                },
            })
            .end((err, res) => {
                expect(res.status).toBe(409);
                expect(res.body.success).toBe(false);
                expect(res.body.message).toBe('Non-Unique Email');
                done();
            });
    });
});
