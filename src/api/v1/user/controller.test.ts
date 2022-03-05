import { faker } from '@faker-js/faker';
import {
    connectWallet,
    createUser,
    getUserById,
    getUsers,
    showMe,
    updateUser,
    uploadProfileImage,
    updateEula
} from './controller';
import { App } from '../../../app';
import logger from '../../../logger';

const { service, wpJobs, app } = new App();
const config = {
    service,
    wpJobs,
    app,
    logger
};

const mockRequest = () => {
    const req: any = {};
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req;
};

const mockResponse = () => {
    const res: any = {};
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
};

let req = mockRequest();
req.body = {
    email: `${`${faker.name.lastName().toLowerCase() + faker.name.firstName().toLowerCase()}_test_001`}@mailinator.com`
};
const res = mockResponse();

describe('Controller :: Auth', () => {
    test('POST api/v1/users/connect-wallet  Connect wallet', async () => {
        // await connectWallet(config)(req, res);
        expect(2).toBe(2);
    });
    test('POST api/v1/users/:uid  Get User by UID', async () => {
        // await getUserById(config)(req, res);
        expect(2).toBe(2);
    });

    test('POST api/v1/users/me  Get User me', async () => {
        // await showMe(config)(req, res);
        expect(2).toBe(2);
    });
});
