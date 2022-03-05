import IConfig from '../Config';
import { IOptions } from '../../interfaces/user/updateUser';
import hashPassword from '../../../../lib/hashPassword';
import { IUserAttributes } from '../../interfaces';

export default (config: IConfig) =>
    async ({ uid, data }: IOptions): Promise<Pick<IUserAttributes, 'uid'> | Error> => {
        try {
            let profileCompleted = 0;
            const password = typeof data.password === 'string' ? { password: await hashPassword(data.password) } : {};

            const prevRow = await config.models.User.findOne({ uid }).lean();

            const prevRowObj = { ...prevRow, ...data };
            if (prevRowObj.email !== null) {
                profileCompleted = 100;
            }

            const updatedRow = await config.models.User.findByIdAndUpdate(prevRowObj._id, {
                ...data,
                ...password,
                profileCompletion: profileCompleted,
                updatedAt: new Date().toDateString()
            });

            return updatedRow || {};
        } catch (error) {
            console.log(error);
            throw error;
        }
    };
