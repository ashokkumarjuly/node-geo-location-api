/* istanbul ignore file */

import facade from './facade';
import APP_CONFIG from '../../@core/app.config';
import Db from './Db';

export default (): Db =>
    facade({
        modelDb_ORM_NAME: APP_CONFIG.modelDb.DB_ORM_NAME
    });
