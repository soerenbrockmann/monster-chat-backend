import passport from 'passport';

export const verifyUserMiddleware = passport.authenticate('jwt', { session: false });

export const authenticateMiddleware = passport.authenticate('local');
