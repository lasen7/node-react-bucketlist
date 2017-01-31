import Notice from '../models/notice';

export const getNotices = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Notice.getNotices(req.user._id)
    .then(notices => {
      let result = {};
      result.msg = 'SUCCESS';
      result.data = notices;

      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};