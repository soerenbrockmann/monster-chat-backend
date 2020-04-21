import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/userLocal';
import passportJWT from 'passport-jwt';

import jwt from 'jsonwebtoken';

import config from '../config';

const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

const validateUser = async (jwt_payload, done) => {
  try {
    const user = await User.findOne({ id: jwt_payload.sub });
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (err) {
    return done(err, false);
  }
};

passport.use(new JwtStrategy(opts, validateUser));

export default passport.use(new LocalStrategy(User.authenticate()));

export const verifyUser = passport.authenticate('jwt', { session: false });

export const getToken = (user) => jwt.sign(user, config.secretKey, { expiresIn: 3600 });
