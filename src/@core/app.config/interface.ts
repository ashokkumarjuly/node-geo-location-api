import { Algorithm } from 'jsonwebtoken';
import { Dialect } from 'sequelize/types';

export interface IAppEmails {
    debugEmail: string;
    siteEmail: string;
    ContactEmail: string;
    noReplyEmail: string;
    bccEmail: string[];
}
export interface IAppConfig {
    lang: string;
    timezone: string;
    env: string;
    isLocal: boolean;
    isDev: boolean;
    isQA: boolean;
    isTest: boolean;
    isStaging: boolean;
    isProduction: boolean;
    WEB_HOST: string;
    API_RELEASE_VERSION: string;
    API_BUILD_VERSION: string;
    ENABLE_HTTPS: boolean;
    ENABLE_CORS: boolean;
    ALLOWED_ORIGINS: string;
    base_URL: string;

    ENABLE_DEBUG: boolean;
    keepAliveTimeout: number;
    headersTimeout: number;
    express: {
        port: number;
        host: string;
        https_port: number;
        ViewEngine: string;
        viewPath: string;
        publicPath: string;
    };
    jwt: {
        secretAccessToken: string;
        accessTokenExpiresIn: string;
        algoritm: Algorithm;
        secretRefreshToken: string;
        secretRefreshTokenExpiresIn: number;
    };
    OTP: {
        secretOTP: string | number;
        secretOTPMaxReuse: number;
        secretOTPExpiresIn: number;
    };
    file: {
        isCloudUpload: boolean;
        storageAccountName: string;
        storageAccountKey: string;
        uploadPath: string;
        storageContainerName: string;
        storageURI: string;
        storageAccessToken: string;
    };
    mail: {
        enabled: boolean;
        name: string;
        debug: boolean;
        host: string;
        port: number;
        ssl: string;
        username: string;
        password: string;
        templatePath: string;
        sendGridApiKey: string;
        appEmails: IAppEmails;
    };
    modelDb: {
        DB_ORM_NAME: string;
        DB_LOG_QUERY: boolean;
        username: string;
        password: string;
        database: string;
        host: string;
        port: number;
        sequelize: {
            connectionOptions: {
                dialect: Dialect;
                logging: boolean | any;
                omitNull: boolean;
                timezone: string;
                pool: {
                    max: number;
                    min: number;
                    acquire: number;
                    idle: number;
                };
                define: {
                    underscored: boolean;
                    freezeTableName: boolean;
                    charset: string;
                    dialectOptions: {
                        collate: string;
                    };
                    timestamp: boolean;
                    createdAt: string;
                    updatedAt: string;
                };
            };
            operatorsAliases: string;
        };
        mongo: {
            connectionOptions: {
                connectTimeoutMS: number;
                keepAlive: number;
                poolSize: number;
            };
        };
    };
    cachingLibrary: {
        enable: boolean;
        name: string;
        clientUrl: string;
    };
    logging: {
        maxFiles: string;
        maxSize: string;
        level: string;
        winstonDirectory: string;
        morganDirectory: string;
        morganLogFormat: string;
    };
    swagger: {
        enable: boolean;
        path: string;
        url: string;
        username: string;
        password: string;
    };
    testSuite: {
        enable: boolean;
        coveragePath: string;
        jestStarePath: string;
    };
    apiDoc: {
        enable: boolean;
        path: string;
        url: string;
        username: string;
        password: string;
    };
    locale: {
        isLocaleUrl: boolean;
        isLocalePath: string;
        isLocaleMissingPath: string;
    };
}

export interface IJwtPayload {
    data: {
        uid?: string;
        id?: number;
        account_id?: string;
        otp?: number;
        reissueUntil?: number;
    };
    expiresIn?: string | number;
}
export interface IRequestUser {
    id: number;
    user_id: number;
    uid: string;
    role: number;
    email: string;
}
