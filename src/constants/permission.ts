export const PERMISSION_ATTRIBUTE = {
    ADD: 'add',
    EDIT: 'edit',
    DELETE: 'delete',
    VIEW: 'view',
    LIST: 'list',
    UPLOAD: 'upload',
    SELF: 'self',
    DOWNLOAD: 'download'
};

export const CAN_GET_USER = 'user.view';
export const CAN_GET_USERS = 'user.list';
export const CAN_UPDATE_USER = 'user.update';
export const CAN_DELETE_USER = 'user.delete';
export const CAN_CREATE_USER = 'user.create';

export const CAN_ADMINISTER = 'administer';

export const DEFAULT_ADMIN_PERMISSIONS: any[] = [
    {
        name: CAN_ADMINISTER,
        label: 'Allows to perform any action'
    }
];

export const DEFAULT_USER_PERMISSIONS: any[] = [
    // USERS
    {
        name: CAN_GET_USERS,
        label: 'Allows to get all users'
    },
    {
        name: CAN_GET_USER,
        label: 'allows to get user for a given id'
    },
    {
        name: CAN_UPDATE_USER,
        label: 'allows to update user for a given id'
    },
    {
        name: CAN_DELETE_USER,
        label: 'allows to get delete for a given id'
    }
];

export const DEFAULT_USER_ROLE = {
    name: 'user',
    description: 'default user role'
};
