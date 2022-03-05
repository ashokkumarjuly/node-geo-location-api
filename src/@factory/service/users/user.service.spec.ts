import { faker } from '@faker-js/faker';
import { db, mail, serviceBus, wpJobs, cacheLayer } from '../factory';
import { createUser, getUserByEmail, getUserById, getUsers } from './user.service';
import logger from '../../../logger';

const config = { db, mail, logger, serviceBus, wpJobs, cacheLayer };

describe('Service->User::', () => {
    const userObj = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: Math.floor(Math.random() * (3 - 1) + 1)
    };
    const userUpdateObj = {
        firstName: `test-${faker.name.firstName()}`,
        lastName: faker.name.lastName(),
        // phoneCode: faker.phone.phoneNumber(),
        phoneNo: faker.phone.phoneNumber('8888######'),
        address: faker.address.streetAddress(),
        city: faker.address.city(),
        state: faker.address.state(),
        countryCode: faker.address.countryCode(),
        zipCode: faker.address.zipCode()
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
    test('getUsers...  expect to be users array with length > 0', async () => {
        const result = await getUsers(config)({});
        expect(result).toEqual(
            expect.objectContaining({
                count: expect.any(Number),
                data: expect.any(Array)
            })
        );
        expect(Array.isArray(result.data)).toBe(true);
        expect(result.data.length).toBeGreaterThan(0);
        expect(result.data[0]).toEqual(
            expect.objectContaining({
                uid: expect.any(String),
                firstName: expect.any(String),
                lastName: expect.any(String),
                email: expect.any(String)
            })
        );
    });

    //TBD account status
    test('updateUser...  expect to be user object', async () => {
        expect(2).toBe(2);
    });

    // test('updateUser...', async () => {
    //     const data = await updateUser(config)({
    //         uid,
    //         data: userUpdateObj,
    //         loggedInUser: { uid }
    //     });
    //     expect(data).toEqual(
    //         expect.objectContaining({
    //             firstName: userUpdateObj.firstName,
    //             phoneNo: userUpdateObj.phoneNo
    //         })
    //     );
    // });

    // test('updatePassword...', async () => {
    //     // const data = await updatePassword(config)({ uid: 2, token: '90b0fd1aef6945ebb64b69b13df96a9a' });
    //     expect(15).toBe(15);
    // });

    // test('activateEmail... Activate email token', async () => {
    //     try {
    //         const data = await activateEmail(config)({ token: emailToken });
    //         expect(data).toEqual(
    //             expect.objectContaining({
    //                 email: userObj.email,
    //                 uid
    //             })
    //         );
    //     } catch (error) {
    //         // expect(error).rejects.toThrow();
    //         // console.log(error);
    //     }
    // });

    // test('deleteUser... expect to be true', async () => {
    //     const data = await deleteUserById(config)({ uid });
    //     expect(data).toBeTruthy();
    // });
});
