export const USER_STATUS = {
    INACTIVE: 0,
    ACTIVE: 1,
    PENDING: 2,
    DELETED: -1
};

export const USER_ACCOUNT_STATUS = {
    ACTIVE: 1,
    INACTIVE: 0,
    DELETED: -1
};

export const MASTER_EULA_STATUS = {
    ACTIVE: 1,
    INACTIVE: 0,
    DELETED: -1,
    DEACTIVE: 2
};

export const USER_STATUS_LABEL: { [key: number]: string } = {
    1: 'ACTIVE',
    0: 'INACTIVE'
};
