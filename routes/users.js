import express from 'express';

import {
  resolveGetUserController,
  resolveUpdateProfileController,
  resolveGetProfileController,
  resolveIsAuthenticatedController,
  resolveLoginController,
  resolveLogoutController,
  resolveSignUpController,
} from '../controllers/users';
import { verifyUserMiddleware, authenticateMiddleware } from '../middlewares/authentication';
import { uploadMiddleware } from '../middlewares/fileUpload';

const router = express.Router();

router.get('/', verifyUserMiddleware, resolveGetUserController);
router.put('/profile', verifyUserMiddleware, uploadMiddleware, resolveUpdateProfileController);
router.get('/profile', verifyUserMiddleware, resolveGetProfileController);
router.get('/isAuthenticated', resolveIsAuthenticatedController);
router.post('/signup', resolveSignUpController);
router.post('/login', authenticateMiddleware, resolveLoginController);

router.get('/logout', resolveLogoutController);

export default router;
