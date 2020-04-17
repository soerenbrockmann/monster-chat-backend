import express from 'express';
import passport from 'passport';
import User from '../models/user';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('get list of users');
});

router.post('/signup', async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });

  try {
    if (existingUser !== null) {
      const error = new Error(`User ${req.body.email} already exists!`);
      error.status = 403;
      next(error);
    }

    const user = await User.create({ email: req.body.email, password: req.body.password });
    res.statusCode = 200;
    res.json({ status: 'Registration Successful!', user });
  } catch (err) {
    console.log(err);
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  if (!req.session.user) {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (user === null) {
        const err = new Error(`User ${req.body.email} does not exist!`);
        err.status = 403;
        return next(err);
      } else if (user.password.trim() !== req.body.password.trim()) {
        const err = new Error(`Password is incorrect!`);
        err.status = 403;
        return next(err);
      } else if (user.email.trim() === req.body.email.trim() && user.password.trim() === req.body.password.trim()) {
        req.session.user = 'authenticated';
        res.statusCode = 200;
        res.end('You are authenticated');
      } else {
        const err = new Error(`Something is missing here!`);
        err.status = 403;
        return next(err);
      }
    } catch (err) {
      console.log(err);
      next(err);
    }
  } else {
    res.statusCode = 200;
    res.end('You are already authenticated!');
  }
});

router.delete('/logout', (req, res, next) => {
  console.log(req.session);

  if (req.session.user) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.end('You are logged out');
  } else {
    const err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

export default router;
