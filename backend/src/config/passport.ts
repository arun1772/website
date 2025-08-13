import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github2';
import User, { IUser } from '../models/User';

// JWT Strategy
passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET || 'fallback-secret'
}, async (payload, done) => {
  try {
    const user = await User.findById(payload.id).select('-password');
    if (user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (error) {
    return done(error, false);
  }
}));

// Google OAuth Strategy
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user exists with this Google ID
      let user = await User.findOne({ 'socialAuth.google.id': profile.id });
      
      if (user) {
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      // Check if user exists with same email
      user = await User.findOne({ email: profile.emails?.[0]?.value });
      
      if (user) {
        // Link Google account to existing user
        user.socialAuth.google = {
          id: profile.id,
          email: profile.emails?.[0]?.value || ''
        };
        user.isEmailVerified = true;
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      // Create new user
      user = new User({
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        avatar: profile.photos?.[0]?.value,
        isEmailVerified: true,
        socialAuth: {
          google: {
            id: profile.id,
            email: profile.emails?.[0]?.value || ''
          }
        },
        lastLogin: new Date()
      });

      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// Facebook Strategy
if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 'socialAuth.facebook.id': profile.id });
      
      if (user) {
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      user = await User.findOne({ email: profile.emails?.[0]?.value });
      
      if (user) {
        user.socialAuth.facebook = {
          id: profile.id,
          email: profile.emails?.[0]?.value || ''
        };
        user.isEmailVerified = true;
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      user = new User({
        name: profile.displayName,
        email: profile.emails?.[0]?.value,
        avatar: profile.photos?.[0]?.value,
        isEmailVerified: true,
        socialAuth: {
          facebook: {
            id: profile.id,
            email: profile.emails?.[0]?.value || ''
          }
        },
        lastLogin: new Date()
      });

      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

// GitHub Strategy
if (process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET) {
  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: '/auth/github/callback'
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      let user = await User.findOne({ 'socialAuth.github.id': profile.id });
      
      if (user) {
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      user = await User.findOne({ email: profile.emails?.[0]?.value });
      
      if (user) {
        user.socialAuth.github = {
          id: profile.id,
          email: profile.emails?.[0]?.value || ''
        };
        user.isEmailVerified = true;
        user.lastLogin = new Date();
        await user.save();
        return done(null, user);
      }

      user = new User({
        name: profile.displayName || profile.username,
        email: profile.emails?.[0]?.value,
        avatar: profile.photos?.[0]?.value,
        isEmailVerified: true,
        socialAuth: {
          github: {
            id: profile.id,
            email: profile.emails?.[0]?.value || ''
          }
        },
        lastLogin: new Date()
      });

      await user.save();
      return done(null, user);
    } catch (error) {
      return done(error, null);
    }
  }));
}

passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id).select('-password');
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

export default passport;