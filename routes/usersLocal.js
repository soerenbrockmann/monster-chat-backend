import express from 'express';
import passport from 'passport';
import User from '../models/userLocal';
import { verifyUser, getToken } from '../authStrategy/authenticate';

const router = express.Router();

router.get('/', verifyUser, async (req, res, next) => {
  try {
    const users = await User.find({});
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ users });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ err });
  }
});

router.get('/isAuthenticated', verifyUser, async (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Tyoe', 'application/json');
  res.json({ sucess: true, status: 'Authenticated!' });
});

router.get('/chat', async (req, res, next) => {});

router.post('/signup', async (req, res, next) => {
  try {
    await User.register(new User({ username: req.body.username }), req.body.password);
    passport.authenticate('local');
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: true, status: 'Registration Successful!' });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json(err);
  }
});

router.post('/login', passport.authenticate('local'), async (req, res, next) => {
  const token = getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.cookie('jwt', token, { httpOnly: true, secure: false });
  res.json({ sucess: true, status: 'You are successfully logged in!!' });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.statusCode = 200;
  res.setHeader('Content-Tyoe', 'application/json');
  res.json({ sucess: true, status: 'You are successfully logged out!' });
});

export default router;
