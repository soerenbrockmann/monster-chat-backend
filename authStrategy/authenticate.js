import passport from 'passport';
import LocalStrategy from 'passport-local';
import User from '../models/userLocal';

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

export default passport.use(new LocalStrategy(User.authenticate()));
