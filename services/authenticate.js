import jwt from 'jsonwebtoken';
import argon2 from 'argon2';
import { randomBytes } from 'crypto';

import User from '../models/user';
import config from '../config';

export const signUp = async (email, password) => {
  const salt = randomBytes(32);
  const hash = await argon2.hash(password, { salt });

  const userRecord = await User.create({
    hash,
    email,
    salt: salt.toString('hex'),
    name: '',
    avatarURL: '',
  });

  return {
    user: {
      email: userRecord.email,
      name: userRecord.name,
    },
  };
};

export const login = async (email, password) => {
  const userRecord = await User.findOne({ email });

  if (!userRecord) {
    throw new Error('User not found');
  } else {
    const matchedPassword = await argon2.verify(userRecord.hash, password);
    if (!matchedPassword) {
      throw new Error('Incorrect password');
    }
  }

  return generateJWT({
    data: {
      _id: userRecord._id,
      name: userRecord.name,
      email: userRecord.email,
    },
  });
};

const generateJWT = (user) => jwt.sign(user, config.secretKey, { expiresIn: 3600 });

export const verifyIfUserIsAuthenticated = (token) => jwt.verify(token, config.secretKey);
