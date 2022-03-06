/* istanbul ignore file */

/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as passport from 'passport';

/**
 * JWT Strategy Auth
 */

export const JwtAuthenticate = (callback: any) => passport.authenticate('jwt', { session: false }, callback);

/**
 * Local Strategy Auth
 */

export const LocalAuthenticate = (callback: any) => passport.authenticate('local', { session: false }, callback);
