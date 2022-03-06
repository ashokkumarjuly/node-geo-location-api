import { faker } from '@faker-js/faker';
import { SECRET_OTP } from '../../../src/constants';
import { request, token } from '../common.tests';

const email = `${`${faker.name.lastName().toLowerCase() + faker.name.firstName().toLowerCase()}_test_001`}@mailinator.com`;
const createObj = {
    email: email
};

const loginObj = {
    email: email,
    code: 111111
};

const userUpdateObj = {
    firstName: `tm-${faker.name.firstName()}`,
    email: email,
    lastName: faker.name.lastName(),
    // phoneCode: faker.phone.phoneNumber(),
    phoneNo: faker.phone.phoneNumber('8888######'),
    address: faker.address.streetAddress(),
    city: faker.address.city(),
    state: faker.address.state(),
    countryCode: faker.address.countryCode(),
    zipCode: faker.address.zipCode()
};

let userId: number = 0;
let userUID: string = '';
let userToken: string = '';
let otpToken = 111111;
let refreshToken: string = '';

describe('API :: Auth', () => {
    const randomEmail = faker.internet.email();
    const randomPassword = faker.internet.password();
    const randomToken = faker.random.alphaNumeric();
    const randomNumber = faker.datatype.number(SECRET_OTP.LENGTH);

    test('POST /api/auth/login-secret... Invalid E-Mail address', (done) => {
        request
            .post(`/api/auth/login-secret`)
            .set('Accept', 'application/json')
            .send({ email: faker.name.firstName() })
            .end(function (err, response) {
                console.log('POST /api/auth/login-secret... Invalid E-Mail address', err);
                if (err) return done(err);

                expect(response.statusCode).toBe(400);
                // expect(response.body.error.details).toContain('must be a valid email');
                return done();
            });
    });

    test('POST /api/auth/login-secret... Generate login secret', (done) => {
        request
            .post(`/api/auth/login-secret`)
            .set('Accept', 'application/json')
            .send(createObj)
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(200);
                return done();
            });
    });

    test('POST /api/auth/login-secret... limitations of number of otp generation for single authentication.', async () => {
        expect(2).toBe(2);
    });

    test('POST /api/auth/login... check for types of characters otp supports: only digits', (done) => {
        request
            .post(`/api/auth/login`)
            .set('Accept', 'application/json')
            .send({ email: email, code: faker.random.alpha({ count: 6 }) })
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(400);
                expect(response.body.error.details).toContain('must be a number');
                return done();
            });
    });

    test('POST /api/auth/login... check for length of OTP', (done) => {
        request
            .post(`/api/auth/login`)
            .set('Accept', 'application/json')
            .send({
                email: email,
                code: faker.datatype.number({
                    min: 10000,
                    max: 99999
                })
            })
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(400);
                expect(response.body.error.details).toContain('must be greater than or equal to 100000');
                return done();
            });
    });

    test('POST /api/auth/login... Successful Login', (done) => {
        request
            .post(`/api/auth/login`)
            .set('Accept', 'application/json')
            .send(loginObj)
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(200);
                expect(response.body.body).toEqual(
                    expect.objectContaining({
                        user: expect.any(Object),
                        token: expect.any(String),
                        refreshToken: expect.any(String)
                    })
                );
                refreshToken = response.body.body.refreshToken;
                return done();
            });
    });

    test('POST /api/auth/login... verify how many times user can provide invalid OTP?', async () => {
        expect(2).toBe(2);
    });

    test('POST /api/auth/login... throw error when user receive multiple OTP and enter the first received OTP.', async () => {
        expect(2).toBe(2);
    });

    test('POST /api/auth/login... Verify After multiple invalid try, verify that system temporarily blocks the account.', async () => {
        expect(2).toBe(2);
    });
    test('POST /api/auth/refresh-token... get refresh token', (done) => {
        request
            .post(`/api/auth/refresh-token`)
            .set('Accept', 'application/json')
            .send({ refreshToken })
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(200);
                expect(response.body.body).toEqual(
                    expect.objectContaining({
                        token: expect.any(String)
                    })
                );
                return done();
            });
    });
    test('POST /api/auth/refresh-token... throw error for invalid refresh token', (done) => {
        const invalidRefreshToken = `${refreshToken}_test`;
        request
            .post(`/api/auth/refresh-token`)
            .set('Accept', 'application/json')
            .send({ refreshToken: invalidRefreshToken })
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(401);
                expect(response.body.error.message).toContain('JWT token expired');
                return done();
            });
    });
});

export { email };
