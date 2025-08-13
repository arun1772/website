import jwt from 'jsonwebtoken';

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET || 'fallback-secret',
    {
      expiresIn: process.env.JWT_EXPIRE || '7d'
    }
  );
};

export const generateRefreshToken = (userId: string): string => {
  return jwt.sign(
    { id: userId, type: 'refresh' },
    process.env.JWT_SECRET || 'fallback-secret',
    {
      expiresIn: '30d'
    }
  );
};

export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET || 'fallback-secret');
  } catch (error) {
    throw new Error('Invalid token');
  }
};

export const generateEmailVerificationToken = (userId: string): string => {
  return jwt.sign(
    { id: userId, type: 'email_verification' },
    process.env.JWT_SECRET || 'fallback-secret',
    {
      expiresIn: '24h'
    }
  );
};

export const generatePasswordResetToken = (userId: string): string => {
  return jwt.sign(
    { id: userId, type: 'password_reset' },
    process.env.JWT_SECRET || 'fallback-secret',
    {
      expiresIn: '1h'
    }
  );
};