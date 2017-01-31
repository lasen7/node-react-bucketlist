import Follow from '../models/follow';
import Account from '../models/account';

export const follow = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      cde: 1
    });
  }

  let _account = null;

  Account.findUser(req.params.username)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 2;
        throw error;
      }

      _account = account;

      return Follow.findFollow(account._id, req.user._id);
    })
    .then(follow => {
      if (!follow) {
        Follow.addFollow(_account._id, req.user._id);
      }
    })
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};

export const unfollow = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      cde: 1
    });
  }

  let _account = null;

  Account.findUser(req.params.username)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 2;
        throw error;
      }

      _account = account;

      return Follow.findFollow(account._id, req.user._id);
    })
    .then(follow => {
      if (!follow) {
        let error = new Error();
        error.message = 'Not found follow';
        error.code = 400;
        error.errorCode = 3;
        throw error;
      }

      Follow.deleteFollow(_account._id, req.user._id);
    })
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};

export const getFollowerCount = (req, res, next) => {
  Account.findUser(req.params.username)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 1;
        throw error;
      }

      return Follow.getFollowerCount(account._id);
    })
    .then(count => {
      res.send({ msg: 'SUCCESS', count });
    })
    .catch(err => {
      next(err);
    });
};

export const getFolloweeCount = (req, res, next) => {
  Account.findUser(req.params.username)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 1;
        throw error;
      }

      return Follow.getFolloweeCount(account._id);
    })
    .then(count => {
      res.send({ msg: 'SUCCESS', count });
    })
    .catch(err => {
      next(err);
    });
};