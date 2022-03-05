import * as bcrypt from 'bcrypt';

export default async (input: string): Promise<string> => {
    return bcrypt.hash(input, 12);
};
