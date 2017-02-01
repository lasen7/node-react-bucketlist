import { validateObjectId } from '../utils/validation';
import Report from '../models/report';
import Account from '../models/account';

export const reportPost = (req, res, next) => {
  const validateParams = validateObjectId(req.params.postId);
  if (!validateParams) {
    return res.status(400).send({
      msg: 'Invalid postId',
      code: 2
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Report.findReport(req.params.postId)
    .then(report => {
      if (!report) {
        return Report.reportPost(req.params.postId);
      }

      report.count += 1;
      return report.save();
    })
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};

export const getReportedPosts = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Account.findUser(req.user.common_profile.username)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 2;
        throw error;
      }

      if (!account.admin) {
        let error = new Error();
        error.message = 'Not authorized';
        error.code = 401;
        error.errorCode = 1;
        throw error;
      }

      return Report.findReportsNotReviewed();
    })
    .then(reports => {
      let result = {};
      result.msg = 'SUCCESS';
      result.data = reports;

      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};

export const reviewPost = (req, res, next) => {
  const validateParams = validateObjectId(req.params.postId);
  if (!validateParams) {
    return res.status(400).send({
      msg: 'Invalid postId',
      code: 2
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Account.findUser(req.user.common_profile.username)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 3;
        throw error;
      }

      if (!account.admin) {
        let error = new Error();
        error.message = 'Not authorized';
        error.code = 401;
        error.errorCode = 1;
        throw error;
      }

      return Report.findReport(req.params.postId);
    })
    .then(report => {
      if (!report) {
        let error = new Error();
        error.message = 'Not found report';
        error.code = 400;
        error.errorCode = 4;
        throw error;
      }

      report.review = true;
      report.save();
    })
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};

export const blockUser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Account.findUser(req.user.common_profile.username)
    .then(account => {
      if (!account) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 2;
        throw error;
      }

      if (!account.admin) {
        let error = new Error();
        error.message = 'Not authorized';
        error.code = 401;
        error.errorCode = 1;
        throw error;
      }

      return Account.blockUser(req.params.username);
    })
    .then(result => {
      if (result.n === 0) {
        let error = new Error();
        error.message = 'Not found user';
        error.code = 400;
        error.errorCode = 3;
        throw error;
      }

      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};