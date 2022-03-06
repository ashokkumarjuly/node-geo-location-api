import { faker } from '@faker-js/faker';
import { db, mail, geoPlaces, cacheLayer } from '../factory';
import { createUser, getUserByEmail, getUserById } from './user.service';
import logger from '../../../logger';

const config = { db, mail, logger, geoPlaces, cacheLayer };

describe('Service->User::', () => {
    const userObj = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email().toLocaleLowerCase(),
        // password: faker.internet.password(),
        role: Math.floor(Math.random() * (2 - 1) + 1)
    };
    let uid = '';
    let emailToken: string = '';

    test('createUser... expect to be user object', async () => {
        const data = await createUser(config)(userObj);
        if (data.uid) {
            uid = data.uid;
        }
        if (data.authToken) {
            emailToken = data.authToken;
        }

        expect(data).toEqual(
            expect.objectContaining({
                email: userObj.email
            })
        );
    });

    test('getUserByEmail...  expect to be user object', async () => {
        const data = await getUserByEmail(config)({ email: userObj.email });

        expect(data).toEqual(
            expect.objectContaining({
                email: userObj.email
            })
        );
    });
    test('getUserById...  expect to be user object', async () => {
        const data = await getUserById(config)({ uid });

        expect(data).toEqual(
            expect.objectContaining({
                email: userObj.email,
                uid
            })
        );
    });
});
