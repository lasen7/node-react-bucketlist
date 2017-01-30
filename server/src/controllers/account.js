import passport from 'passport';
import { validateSignupBody, validateSigninBody } from '../utils/validation';

/**
 * 회원가입
 * body: { email, fullname, username, password }
 */
export const signup = (req, res, next) => {
  const validate = validateSignupBody(req.body);
  if (validate.error.length > 0) {
    return res.status(400).send({
      msg: validate.error[0].message,
      code: validate.error[0].code
    });
  }

  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      return next(err);
    }

    // TODO: 회원가입을 하면 로그인을 시킨다.    
    // req.login(user, err => {
    //   if (err) {
    //     return next(err);
    //   }

    res.send(user);
    // });

  })(req, res, next);
};

/**
 * 로그인
 * body: { username, password }
 */
export const signin = (req, res, next) => {
  const validate = validateSigninBody(req.body);
  if (validate.error.length > 0) {
    return res.status(400).send({
      msg: validate.error[0].message,
      code: validate.error[0].code
    });
  }

  passport.authenticate('local-signin', (err, user, info) => {
    if (err) {
      return next(err);
    }

    req.login(user, err => {
      if (err) {
        return next(err);
      }

      res.send(user);
    });
  })(req, res, next);
};

/**
 * 로그아웃
 */
export const logout = (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send({ msg: 'SUCCESS' });
};

/**
 * 세션 확인
 */
export const getInfo = (req, res, next) => {
  let user = null;

  if (req.user) {
    const {_id, type, common_profile} = req.user;
    user = {
      _id,
      type,
      common_profile
    };
  }

  res.send({ user });
};

export const success = (req, res, next) => {
  // OAuth login success
  // redirect to client-side routing
  // console.log('OAuth login success', req.user);

  // TODO: Set the redirect url
  if (!req.user) {
    return res.redirect('/auth/oauth-failure');
  }

  if (req.user.common_profile.username !== null) {
    res.redirect('/auth/oauth-success');
  } else {
    res.redirect('/auth/register/additional-o');
  }
};

/* facebook */

export const facebook = (req, res, next) => {
  passport.authenticate('facebook', {
    scope: ['user_friends', 'email']
  })(req, res, next);
};

export const facebookCallback = (req, res, next) => {
  passport.authenticate('facebook', {
    failureRedirect: '/api/account/failure'
  })(req, res, next);
};

export const facebookCallbackSuccess = (req, res, next) => {
  console.log('facebookCallbackSuccess');
  res.redirect('/api/account/success');
};