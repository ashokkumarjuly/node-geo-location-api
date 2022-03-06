import IConfig from './Config';
import Service from './Service';
import { AuthFacades } from './auth';
import { UserFacades } from './users';

import { ServerFacades } from './server';
import { GeoPlacesFacades } from './geoplaces';

export default (config: IConfig): Service => ({
    // ..._mailFacades(config),
    ...AuthFacades(config),
    ...UserFacades(config),
    ...ServerFacades(config),
    ...GeoPlacesFacades(config)
});
