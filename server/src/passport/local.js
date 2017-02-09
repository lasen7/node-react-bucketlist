import passport from 'passport';
import Account from '../models/account';
import { Strategy as LocalStrategy } from 'passport-local';
import { generateHash, compareHash } from '../utils/bcrypt';

passport.use(
  'local-signup',
  new LocalStrategy(
    { passReqToCallback: true, usernameField: 'username', passwordField: 'password' },
    (req, username, password, done) => {
      Account.findUser(username)
        .then(account => {
          if (account) {
            // account exists
            let error = new Error();
            error.code = 400;
            error.message = 'Duplicate username';
            error.errorCode = 6;
            throw error;
          } else {
            // check email duplication
            return Account.findUserByEmail(req.body.email);
          }
        })
        .then(account => {
          if (account) {
            // email exists
            let error = new Error();
            error.code = 400;
            error.message = 'Duplicate email';
            error.errorCode = 7;
            throw error;
          } else {
            // generate password hash
            return generateHash(password);
          }
        })
        .then(hash => {
          return Account.addUser({
            type: 'local',
            hash,
            username,
            fullname: req.body.fullname,
            gender: req.body.gender,
            email: req.body.email,
          });
        })
        .then(doc => {
          return done(null, {
            _id: doc._id,
            type: doc.type,
            common_profile: doc.common_profile
          })
        })
        .catch(err => {
          done(err);
        });
    }
  )
);

passport.use(
  'local-signin',
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    (username, password, done) => {

      let _account = undefined;

      Account.findUser(username)
        .then(account => {
          if (!account) {
            let error = new Error();
            error.message = 'Invalid auth';
            error.code = 400;
            throw error;
          } else {
            if (account.type !== 'local') {
              let error = new Error();
              error.message = 'Invalid auth';
              error.code = 400;
              throw error;
            }

            _account = account;
            return compareHash(account.password, password);
          }
        })
        .then(result => {
          if (!result) {
            let error = new Error();
            error.message = 'Invalid auth';
            error.code = 400;
            throw error;
          } else {
            return done(null, {
              _id: _account._id,
              type: _account.type,
              common_profile: _account.common_profile
            });
          }
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);