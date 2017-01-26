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