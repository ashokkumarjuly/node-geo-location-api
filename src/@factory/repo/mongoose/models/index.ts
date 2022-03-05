import User from './User';

export interface IModels {
    User: typeof User;

    // [key: string]: typeof key;
}

export { default as User } from './User';
