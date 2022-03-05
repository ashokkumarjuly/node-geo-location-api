import IConfig from '../Config';
import { IOptions } from '../../interfaces/user/updateUser';
import hashPassword from '../../../../lib/hashPassword';
import { IUserAttributes } from '../../interfaces';

export default (config: IConfig) =>
    async ({ uid, data }: IOptions): Promise<Pick<IUserAttributes, 'uid'> | Error> => {
        let transaction = null;
        try {
            let profileCompleted = 0;
            const password = typeof data.password === 'string' ? { password: await hashPassword(data.password) } : {};
            const options = { omitNull: false };

            const prevRow = await config.models.User.findOne({
                where: { uid },
                raw: true
            });

            const prevRowObj = { ...prevRow, ...data };
            if (prevRowObj.email !== null) {
                profileCompleted = 100;
            }

            transaction = await config.sequelizeInstance.transaction();
            await config.models.User.update(
                {
                    ...data,
                    ...password,
                    profileCompletion: profileCompleted,
                    updatedAt: new Date().toDateString()
                },
                {
                    ...options,
                    where: { uid }
                }
            );

            // if (data.role) await RoleService.destroy(userId, transaction);
            // if (data.role)
            //     await RoleService.create({ item_name: data.role, user_id: userId }, transaction);

            // always call commit at the end
            await transaction.commit();

            const user = await config.models.User.findOne({
                attributes: ['uid'],
                where: { uid }
            });

            return user ? user.get({ plain: true }) : {};
        } catch (error) {
            if (transaction) {
                await transaction.rollback();
            }

            throw error;
        }
    };
