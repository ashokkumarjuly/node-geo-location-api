/* istanbul ignore file */

import { Router } from 'express';
import { ICoreConfig } from '../../@core/ICoreConfig';
import { loginSecret, login, getTokenByRefreshToken } from './controller';
import { RoutePayloadValidator } from '../../helpers';
import { loginSchema, loginSecretSchema, refreshTokenSchema } from './route.validate';

export default class {
    public _router: Router;

    public _config: ICoreConfig;

    constructor(config: ICoreConfig) {
        this._router = Router();
        this._config = config;
        this._routes();
    }

    public _routes(): void {
        /**
         * @api {post} /login-secret
         * @apiName Login Secret
         * @apiGroup Auth
         * @apiPermission master
         * @apiParam {String} email User's email.
         * @apiSuccess (Success 201) {String} Otp to user's email.
         * @apiError 401 Invalid credentials.
         * */
        this._router.post(
            '/login-secret',
            RoutePayloadValidator(this._config, loginSecretSchema, false),
            loginSecret(this._config)
        );

        /**
         * @api {post} /login
         * @apiName verify OTP
         * @apiGroup Auth
         * @apiPermission master
         * @apiParam {String} email User's email.
         * @apiParam {String} email token.
         * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
         * @apiSuccess (Success 201) {Object} user Current user's data.
         * @apiError 401 Invalid credentials.
         * */
        this._router.post('/login', RoutePayloadValidator(this._config, loginSchema, false), login(this._config));

        /**
         * @api {post} /refresh-token
         * @apiName Refresh token
         * @apiGroup Auth
         * @apiPermission master
         * @apiParam {String} refreshToken.
         * @apiSuccess (Success 201) {String} token User `access_token` to be passed to other requests.
         * @apiError 401 Session expired.
         * */
        this._router.post(
            '/refresh-token',
            RoutePayloadValidator(this._config, refreshTokenSchema, false),
            getTokenByRefreshToken(this._config)
        );

        // this._router.post('/forget-password', forgetPassword(this._config));

        // this._router.post('/reset-password', resetPassword(this._config));

        /**
         * @api {get} /email-activation-verify/:token Verify token
         * @apiName showEmailVerification
         * @apiGroup Auth
         * @apiSuccess {String} token Email verification token.
         * @apiSuccess {Object} user User's data.
         * @apiError 404 Token has expired or doesn't exist.
         */
        // this._router.get('/email-activation-verify/:token', showEmailVerification(this._config));
        /**
         * @api {post} /email-activation Activate Emal
         * @apiName Email Verification
         * @apiGroup Auth
         * @apiParam {String{6..}} token Email verification token.
         * @apiSuccess {Object} user User's data.
         * @apiError {Object} 400 Some parameters may contain invalid values.
         * @apiError 404 Token has expired or doesn't exist.
         */
        // this._router.post('/email-activation', activateEmail(this._config));

        // router.post('./logut', authController.logout)
    }
}
