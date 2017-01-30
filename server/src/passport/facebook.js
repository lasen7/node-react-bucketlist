import passport from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import Account from '../models/account';

const config = {
  'appID': '728520353982100',
  'appSecret': process.env.FACEBOOK_SECRET,
  'callbackURL': 'http://localhost:3000/api/account/facebook/callback',
  'profileFields': ['id', 'name', 'emails', 'friends', 'gender']
};

passport.use(
  new FacebookStrategy({
    clientID: config.appID,
    clientSecret: config.appSecret,
    callbackURL: config.callbackURL,
    profileFields: config.profileFields
  },
    (access_token, refresh_token, profile, done) => {
      Account.findUserByFacebookID(profile.id)
        .then(account => {
          if (account) {
            return done(null, account);
          } else {
            Account.addUser({
              type: 'facebook',
              username: null,
              gender: profile.gender,
              fullname: profile.name.familyName + profile.name.givenName,
              email: profile.emails ? (profile.emails.length > 0 ? profile.emails[0].value : null) : null,
              id: profile.id,
              access_token
            })
              .then(account => {
                if (!account) return;
                return done(null, account);
              })
              .catch(err => {
                done(err);
              })
          }
        })
    }
  )
);