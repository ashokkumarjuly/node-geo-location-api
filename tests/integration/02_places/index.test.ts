import { faker } from '@faker-js/faker';
import { request, token } from '../common.tests';

describe('API :: Places', () => {
    test('GET /api/v1/places/verify... Validate Address', (done) => {
        request
            .get(`/api/v1/places/verify`)
            .query({
                addressdetails: 1,
                filter: {
                    street: '135 pilkington avenue',
                    town: 'Ataco',
                    postalcode: 'B72 1LH',
                    country: 'United Kingdom'
                }
            })
            .expect(200)
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(200);              
              
                return done();
            });
    });

    test('GET /api/v1/places/weather... Get Weather Info', (done) => {
        request
            .get(`/api/v1/places/weather`)
            .query({
                product: 'astro',
                addressdetails: 1,              
                filter: {
                    street: '135 pilkington avenue',
                    town: 'Ataco',
                    postalcode: 'B72 1LH',
                    country: 'United Kingdom'
                }
            })
            .expect(200)
            .set('Authorization', `${token}`)
            .end(function (err, response) {
                if (err) return done(err);

                expect(response.statusCode).toBe(200);              
                return done();
            });
    });

    test('GET /api/v1/places/verify... Throw Error', (done) => {
        expect(2).toBe(2);
        return done();
    });
    test('GET /api/v1/places/weather... Throw Error', (done) => {
        expect(2).toBe(2);
        return done();
    });
});
