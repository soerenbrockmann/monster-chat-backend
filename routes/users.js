import express from 'express';
import fs from 'fs';
import passport from 'passport';
import multer from 'multer';
import User from '../models/userLocal';
import config from '../config';
import { verifyUser, getToken, verifyJWT } from '../authStrategy/authenticate';

const removeImage = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    cb(null, 'images/');
  },

  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.get('/', verifyUser, async (req, res, next) => {
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

router.put('/profile', verifyUser, upload.single('avatar'), async (req, res, next) => {
  try {
    const payload = await getJwtPayloadFromToken(req.cookies['jwt']);
    if (req.body.isNewFile) {
      try {
        const { avatarURL } = await User.findById({ _id: payload._id });
        await removeImage(`${__dirname}/../${config.imageDirectory}/${avatarURL}`);
      } catch (error) {
        console.log(error);
      }
    }

    await User.findByIdAndUpdate({ _id: payload._id }, { name: req.body.name, avatarURL: req.file.filename });
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: true, status: 'Profile successfully updated!' });
  } catch (err) {
    console.log(err);

    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json(err);
  }
});

router.get('/profile', verifyUser, async (req, res, next) => {
  try {
    const payload = await verifyJWT(req.cookies['jwt']);
    const { name, avatarURL } = await User.findById({ _id: payload._id });

    const avatar = `${config.host}:${config.port}/${config.imageDirectory}/${avatarURL}`;

    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: true, name, avatar, status: 'Successful!' });
  } catch (err) {
    res.statusCode = 404;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: false, status: 'User was not found' });
  }
});

router.get('/isAuthenticated', async (req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Tyoe', 'application/json');
  try {
    await verifyJWT(req.cookies['jwt']);
    res.json({ sucess: true, status: 'Authenticated!' });
  } catch (error) {
    res.json({ sucess: false, status: 'Not Authenticated!' });
  }
});

router.get('/chat', async (req, res, next) => {});

router.post('/signup', async (req, res, next) => {
  try {
    await User.register(new User({ username: req.body.username, name: '', avatarURL: '' }), req.body.password);
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
  const jwtToken = getToken({ _id: req.user._id });
  res.cookie('jwt', jwtToken, { httpOnly: true, secure: false });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');

  res.json({ sucess: true, status: 'You are successfully logged in!!' });
});

router.get('/logout', (req, res, next) => {
  res.clearCookie('jwt');
  res.statusCode = 200;
  res.setHeader('Content-Tyoe', 'application/json');
  res.json({ sucess: true, status: 'You are successfully logged out!' });
});

export default router;
