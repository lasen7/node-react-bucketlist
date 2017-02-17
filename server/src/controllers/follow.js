import Follow from '../models/follow';
import Account from '../models/account';
import Notice from '../models/notice';

export const follow = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  try {
    const account = await Account.findUser(req.params.username);
    if (!account) {
      let error = new Error();
      error.message = 'Not found user';
      error.code = 400;
      error.errorCode = 2;
      throw error;
    }

    const hasFollow = await Follow.findFollow(account._id, req.user._id);
    if (!hasFollow) {
      await Notice.addFollow(account._id, req.user._id);
      await Follow.addFollow(account._id, req.user._id);
    }

    const follow = await Follow.findFollowee(req.user._id, account._id);
    res.send({
      msg: 'SUCCESS',
      data: follow[0]
    });
  } catch (e) {
    next(e);
  }

  // Account.findUser(req.params.username)
  //   .then(account => {
  //     if (!account) {
  //       let error = new Error();
  //       error.message = 'Not found user';
  //       error.code = 400;
  //       error.errorCode = 2;
  //       throw error;
  //     }

  //     _account = account;

  //     return Follow.findFollow(account._id, req.user._id);
  //   })
  //   .then(follow => {
  //     if (!follow) {
  //       Notice.addFollow(_account._id, req.user._id);
  //       Follow.addFollow(_account._id, req.user._id);
  //     }
  //   })
  //   .then(() => {
  //     return Follow.findFollowee(req.user._id, _account._id);
  //   })
  //   .then(result => {
  //     res.send({
  //       msg: 'SUCCESS',
  //       data: result[0]
  //     });
  //   })
  //   .catch(err => {
  //     next(err);
  //   });
};

export const unfollow = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
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

export const getFollowers = (req, res, next) => {
  Account.findUser(req.params.username)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 1;
        throw error;
      }

      return Follow.findFollowers(account._id);
    })
    .then(followers => {
      let result = {};
      result.msg = 'SUCCESS';
      result.data = followers;

      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};

export const getFollowees = (req, res, next) => {
  Account.findUser(req.params.username)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 1;
        throw error;
      }

      return Follow.findFollowees(account._id);
    })
    .then(followees => {
      let result = {};
      result.msg = 'SUCCESS';
      result.data = followees;

      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};