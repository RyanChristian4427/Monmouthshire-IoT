import chai from 'chai';
import chaiHttp from 'chai-http';

import { app } from 'src/app';

chai.use(chaiHttp);

describe('POST /api/v1/users/login', () => {
    it('should return 200 OK with Token', async () => {
        const response = await chai
            .request(app)
            .post('/api/v1/users/login')
            .send({
                user: {
                    email: 'smoketest@example.com',
                    password: 'came try steady fewer',
                },
            });
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
        expect(response.body.message).toBe('Authentication successful');
        expect(response.body.user.token).toBeDefined();
    });

    it('should return 401 Unauthorized with Incorrect Password', async () => {
        const response = await chai
            .request(app)
            .post('/api/v1/users/login')
            .send({
                user: {
                    email: 'smoketest@example.com',
                    password: 'wrong password',
                },
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Incorrect Password');
    });

    it('should return 401 Unauthorized with Unknown User', async () => {
        const response = await chai
            .request(app)
            .post('/api/v1/users/login')
            .send({
                user: {
                    email: 'unknownuser@example.com',
                    password: 'came try steady fewer',
                },
            });
        expect(response.status).toBe(401);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Unknown User');
    });
});

describe('POST /api/v1/users/register', () => {
    it('should return 200 OK', async () => {
        const response = await chai
            .request(app)
            .post('/api/v1/users/register')
            .send({
                user: {
                    firstName: 'smoke',
                    lastName: 'test',
                    email: 'newsmoketest@example.com',
                    password: 'came try steady fewer',
                },
            });
        if (response.status == 200) {
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Registration successful');
            expect(response.body.user).toBeDefined();
        } else {
            expect(response.status).toBe(409);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Non-Unique Email');
        }
    });

    it('should return 409 Conflict with Non-Unique Email', async () => {
        const response = await chai
            .request(app)
            .post('/api/v1/users/register')
            .send({
                user: {
                    firstName: 'smoke',
                    lastName: 'test',
                    email: 'smoketest@example.com',
                    password: 'came try steady fewer',
                },
            });
        expect(response.status).toBe(409);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Non-Unique Email');
    });
});

describe('POST /api/v1/homes/register', () => {
    it('should return 200 OK', async () => {
        const response = await chai
            .request(app)
            .post('/api/v1/homes/register')
            .send({
                user: {
                    firstName: 'smoke',
                    lastName: 'test',
                    email: 'newsmoketesthome@example.com',
                    password: 'came try steady fewer',
                },
            });
        if (response.status == 200) {
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('Registration successful');
            expect(response.body.user).toBeDefined();
            expect(response.body.user.refreshToken).toBeDefined();
        } else {
            expect(response.status).toBe(409);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toBe('Non-Unique Email');
        }
    });

    it('should return 409 Conflict with Non-Unique Email', async () => {
        const response = await chai
            .request(app)
            .post('/api/v1/homes/register')
            .send({
                user: {
                    firstName: 'smoke',
                    lastName: 'test',
                    email: 'smoketesthome@example.com',
                    password: 'came try steady fewer',
                },
            });
        expect(response.status).toBe(409);
        expect(response.body.success).toBe(false);
        expect(response.body.message).toBe('Non-Unique Email');
    });
});
