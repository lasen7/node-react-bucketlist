import passport from 'passport';
import './local';
import './facebook';

passport.serializeUser((user, done) => {
  console.log('serializeUser');
  done(null, user);
});

passport.deserializeUser((user, done) => {
  console.log('deserializeUser');
  done(null, user);
});