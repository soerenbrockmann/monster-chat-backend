import express from 'express';
import passport from 'passport';
import User from '../models/userLocal';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('get list of users');
});

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
    res.json({ err });
  }
});

router.post('/login', passport.authenticate('local'), async (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Tyoe', 'application/json');
  res.json({ sucess: true, status: 'You are successfully logged in!!' });
});

router.get('/logout', (req, res, next) => {
  req.logout();
  res.statusCode = 200;
  res.setHeader('Content-Tyoe', 'application/json');
  res.json({ sucess: true, status: 'You are successfully logged out!' });
});

export default router;
