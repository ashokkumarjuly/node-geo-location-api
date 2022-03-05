export const MAX_PAGINATION_LIMIT = 500;
export const DEFAULT_PAGINATION_LIMIT = 20;
export const DEFAULT_PAGINATION_OFFSET = 0;
export const DEFAULT_HOME_PAGINATION_LIMIT = 10;
export const DEFAULT_SORT_ORDER = [['createdAt', 'desc']];
export const ONE_HOUR = 3600; // seconds
export const TWO_HOURS = 7200; // seconds

export const API_ROUTE = '/api';
export const API_ROUTE_V1 = '/api/v1';
export const AUTH_HEADER_NAME = 'authorization';
export const AUTH_BODY_FIELD_NAME = 'authToken';
export const AUTH_PARAM_NAME = 'authToken';
export const AUTH_SCHEME_NAME = 'JWT';

export const SITE = {
    Name: 'GeoPlaces API',
    MODES: {
        DEVELOPMENT: 'development',
        PRODUCTION: 'production'
    }
};
export const APP_PATHS = {
    JWT_EXCLUDED: [
        `${API_ROUTE_V1}/auth/login`,
        `${API_ROUTE_V1}/auth/reset-password`,
        `${API_ROUTE_V1}/auth/forget-password`,
        `${API_ROUTE_V1}/auth/email-activation`,
        `${API_ROUTE_V1}/docs`,
        `${API_ROUTE_V1}/logs`,
        `${API_ROUTE_V1}/test/unit`,
        `${API_ROUTE_V1}/test/coverage`,
        `${API_ROUTE_V1}/auth/test-email`
    ],
    Files: {
        // All the paths should be relative to the web root folder. i.e. /server/
        DOWNLOADS: 'files/downloads/',
        TEMP: 'files/temp/',
        UPLOAD_FOR: {
            TEMP: {
                KEY: 'temp',
                MAX_SIZE: 2 * 1024 * 1024 // 2 mb
            },
            PROFILE: {
                KEY: 'profile',
                MAX_SIZE: 2 * 1024 * 1024 // 2 mb
            },
            ARTIST: {
                KEY: 'artist',
                MAX_SIZE: 2 * 1024 * 1024 // 2 mb
            },
            NFT_RESOURCE: {
                KEY: 'nft_resource',
                MAX_SIZE: 2 * 1024 * 1024 // 2 mb
            },
            EULA: {
                KEY: 'eula',
                MAX_SIZE: 2 * 1024 * 1024 // 2 mb
            }
        }
    },
    mailTemplates: 'mail/_templates'
};

export const FILE_STORAGE_PREFIX = {
    USER_profileImage: 'files/user'
};

export const SITE_STATUS = {
    ACTIVE: 1,
    INACTIVE: 0,
    DELETED: -1
};

export const TIME_OUT = {
    RATE_LIMITER_DURATION: 1,
    RESET_PASSWORD_EXPIRES_IN: 3600
};

export const LOGGER = {
    CLEANUP_ON_LOGIN: 0, // change to 0 when cron job is configured
    CLEANUP_OLDER_LOGS: 30 // clean logs older than 30 days
};
