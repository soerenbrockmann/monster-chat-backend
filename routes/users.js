import express from 'express';
import User from '../models/user';

const router = express.Router();

/* GET users listing. */
router.get('/', (req, res, next) => {
  res.send('get list of usres');
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

export default router;
