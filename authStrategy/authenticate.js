import passport from 'passport';
import LocalStrategy from 'passport-local';
import passportJWT from 'passport-jwt';
import jwt from 'jsonwebtoken';

import User from '../models/user';
import config from '../config';

const JwtStrategy = passportJWT.Strategy;

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const opts = {};
opts.jwtFromRequest = (req) => req.cookies.jwt;
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

const localStrategy = new LocalStrategy(User.authenticate());

const strategy = passport.use(localStrategy);

export default strategy;

export const verifyUser = passport.authenticate('jwt', { session: false });

export const verifyJWT = (token) => jwt.verify(token, opts.secretOrKey);

export const getToken = (user) => jwt.sign(user, config.secretKey, { expiresIn: 3600 });
