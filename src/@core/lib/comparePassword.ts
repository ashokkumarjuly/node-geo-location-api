/* istanbul ignore file */

import * as bcrypt from 'bcrypt';

export default async (plainPassword: string, hashedPassword?: string): Promise<boolean> => {
    if (hashedPassword) {
        return bcrypt.compare(plainPassword, hashedPassword);
    }
    return false;
};
