import { getUsers, updateProfile, getProfile, checkAuthentication, signUp, login } from '../services/users';

export const resolveGetUserController = async (req, res) => {
  try {
    const users = await getUsers();
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ users });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ err });
  }
};

export const resolveUpdateProfileController = async (req, res) => {
  try {
    await updateProfile(req);
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: true, status: 'Profile successfully updated!' });
  } catch (err) {
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json(err);
  }
};

export const resolveGetProfileController = async (req, res) => {
  try {
    const { name, avatar } = await getProfile(req.cookies);
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: true, name, avatar, status: 'Successful!' });
  } catch (err) {
    res.statusCode = 404;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: false, status: 'User was not found' });
  }
};

export const resolveIsAuthenticatedController = async (req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Tyoe', 'application/json');
  try {
    await checkAuthentication(req.cookies);
    res.json({ sucess: true, status: 'Authenticated!' });
  } catch (error) {
    res.json({ sucess: false, status: 'Not Authenticated!' });
  }
};

export const resolveSignUpController = async (req, res) => {
  try {
    await signUp(req.body);
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: true, status: 'Registration Successful!' });
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json(error);
  }
};

export const resolveLoginController = async (req, res) => {
  try {
    const jwtToken = await login(req.user);
    res.cookie('jwt', jwtToken, { httpOnly: true, secure: false });
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({ sucess: true, status: 'You are successfully logged in!!' });
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json(error);
  }
};

export const resolveLogoutController = (req, res) => {
  try {
    res.clearCookie('jwt');
    res.statusCode = 200;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json({ sucess: true, status: 'You are successfully logged out!' });
  } catch (error) {
    res.statusCode = 500;
    res.setHeader('Content-Tyoe', 'application/json');
    res.json(error);
  }
};
