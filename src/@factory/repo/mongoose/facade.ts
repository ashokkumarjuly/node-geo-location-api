import IConfig from './Config';
import { ModelDbInterface } from '../Db';
import UserFacade from './_user.facade';
import ServerFacade from './_server.facade';

export default (config: IConfig): ModelDbInterface => ({
    ...UserFacade(config),
    ...ServerFacade(config)
});
