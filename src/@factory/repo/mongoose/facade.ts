import IConfig from './Config';
import { ModelDbInterface } from '../Db';
import UserFacade from './_user.facade';
import ServerFacade from './_server.facade';
import GeoPlaceFacade from './_geoPlace.facade';

export default (config: IConfig): ModelDbInterface => ({
    ...UserFacade(config),
    ...ServerFacade(config),
    ...GeoPlaceFacade(config)
});
