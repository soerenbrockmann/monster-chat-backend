import express from 'express';
import { signUp, login, verifyIfUserIsAuthenticated } from '../services/authenticate';
import { isAuthenticated } from '../middlewares/isAuthenticated';
import User from '../models/user';

const router = express.Router();

router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const users = await User.find({});
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ users });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ err });
  }
});

router.get('/isAuthenticated', async (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Tyoe', 'application/json');
  try {
    await verifyIfUserIsAuthenticated(req.cookies['jwt']);
    res.json({ sucess: true, status: 'Authenticated!' });
  } catch (error) {
    res.json({ sucess: false, status: 'Not Authenticated!' });
  }
});

router.get('/chat', async (req, res, next) => {});

router.post('/signup', async (req, res, next) => {
  try {
    await signUp(req.body.email, req.body.password);
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: true, status: 'Registration Successful!' });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const jwtToken = await login(req.body.email, req.body.password);
    res.cookie('jwt', jwtToken, { httpOnly: true, secure: false });
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: true, status: 'You are successfully logged in!!' });
  } catch (err) {
    console.log(err);
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json(err);
  }
});

router.get('/logout', (req, res, next) => {
  res.clearCookie('jwt');
  res.statusCode = 200;
  res.setHeader('Content-Tyoe', 'application/json');
  res.json({ sucess: true, status: 'You are successfully logged out!' });
});

export default router;
