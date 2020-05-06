import jwt from 'jsonwebtoken';
import config from '../config';

export const isAuthenticated = (req, res, next) => {
  const jwtToken = req.cookies['jwt'];

  try {
    jwt.verify(jwtToken, config.secretKey);
    next();
  } catch (error) {
    res.statusCode = 401;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ message: 'Token is invalid' });
  }
};
