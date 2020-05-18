import fs from 'fs';
import User from '../models/user';
import { getToken, verifyJWT } from './authenticate';
import config from '../config';

export const getUsers = async () => await User.find({});

const unlinkImage = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
};

const deleteImage = async (id) => {
  try {
    const { avatarURL } = await User.findById({ _id: id });
    await unlinkImage(`${__dirname}/../${config.imageDirectory}/${avatarURL}`);
  } catch (error) {
    console.log(error);
  }
};

export const updateProfile = async ({ body, file, cookies }) => {
  const isNewFile = file && file.filename;
  try {
    const payload = await verifyJWT(cookies['jwt']);
    if (isNewFile) {
      await deleteImage(payload._id);
    }
    const userPayload = { name: body.name };
    userPayload.avatarURL = file.filename;

    await User.findByIdAndUpdate({ _id: payload._id }, userPayload);
  } catch (error) {
    throw new Error(error);
  }
};

export const getProfile = async (cookies) => {
  try {
    const payload = await verifyJWT(cookies['jwt']);
    const { name, avatarURL } = await User.findById({ _id: payload._id });
    const avatar = `${config.host}:${config.port}/${config.imageDirectory}/${avatarURL}`;
    return { name, avatar };
  } catch (error) {
    throw new Error(error);
  }
};

export const signUp = async (body) => {
  try {
    await User.register(new User({ username: body.username, name: '', avatarURL: '' }), body.password);
  } catch (error) {
    throw new Error(error);
  }
};

export const checkAuthentication = async (cookies) => {
  try {
    await verifyJWT(cookies['jwt']);
  } catch (error) {
    throw new Error(error);
  }
};

export const login = async (user) => {
  try {
    const jwtToken = await getToken({ _id: user._id });
    return jwtToken;
  } catch (error) {
    throw new Error(error);
  }
};
