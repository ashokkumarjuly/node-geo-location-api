import Config from '../Config';
import CacheLayer from '../CacheLayer';
import getRecord from './getRecord';
import setRecord from './setRecord';
import setRecordWithExpiration from './setRecordWithExpiration';

export default (config: Config): CacheLayer => ({
    get: getRecord(config),
    set: setRecord(config),
    setex: setRecordWithExpiration(config)
});
