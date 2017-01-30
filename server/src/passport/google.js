import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import Account from '../models/account';

const config = {
  'appID': '1004924578959-na5o656hp62afvll384no2u2rplbq251.apps.googleusercontent.com',
  'appSecret': process.env.GOOGLE_SECRET,
  'callbackURL': 'http://localhost:3000/api/account/google/callback'
};

passport.use(
  new GoogleStrategy({
    clientID: config.appID,
    clientSecret: config.appSecret,
    callbackURL: config.callbackURL
  },
    (access_token, refresh_token, profile, done) => {
      console.log('google passport: ', profile);
      Account.findUserByGoogleID(profile.id)
        .then(account => {
          if (account) {
            return done(null, account);
          } else {
            Account.addUser({
              type: 'google',
              username: null,
              gender: profile.gender || 'hidden',
              fullname: profile.name.familyName + profile.name.givenName,
              email: profile.emails[0].value,
              id: profile.id,
              access_token
            })
              .then(account => {
                if (!account) return;
                return done(null, account);
              })
              .catch(err => {
                done(err);
              });
          }
        })
    })
)
