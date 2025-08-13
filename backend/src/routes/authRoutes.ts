import express from 'express';
import passport from 'passport';
import {
  register,
  login,
  getMe,
  updateProfile,
  logout,
  socialAuthSuccess,
  socialAuthFailure
} from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

// Regular auth routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);
router.put('/profile', protect, updateProfile);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/auth/failure' }),
  socialAuthSuccess
);

// Facebook OAuth routes
router.get('/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/auth/failure' }),
  socialAuthSuccess
);

// GitHub OAuth routes
router.get('/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/failure' }),
  socialAuthSuccess
);

// Auth callback handlers
router.get('/success', socialAuthSuccess);
router.get('/failure', socialAuthFailure);

export default router;