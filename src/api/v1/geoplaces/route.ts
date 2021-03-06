/* istanbul ignore file */

import { Router } from 'express';
import { ICoreConfig } from '../../../@core/ICoreConfig';
import { RoutePayloadValidator } from '../../../helpers';
import { getAddressSchema, getWeatherSchema } from './route.validate';
import { getGeoPlace, getWeatherByGeoPlace } from './controller';

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
         * @api {get} /address/verify Retrieve/validate address
         * @apiName RetrieveAdresss
         * @apiGroup Places
         * @apiPermission public
         * @apiSuccess {Object} Geo address data.
         * @apiError 404 Address not found.
         */
        this._router.get('/verify', RoutePayloadValidator(this._config, getAddressSchema), getGeoPlace(this._config));

        /**
         * @api {get} /address/weather Retrieve weather info
         * @apiName RetrieveWeather
         * @apiGroup Places
         * @apiPermission public
         * @apiSuccess {Object} Weather data.
         * @apiError 404 Weather data not found.
         */
        this._router.get(
            '/weather',
            RoutePayloadValidator(this._config, getWeatherSchema),
            getWeatherByGeoPlace(this._config)
        );
    }
}
