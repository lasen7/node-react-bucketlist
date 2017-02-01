import { validateObjectId } from '../utils/validation';
import Report from '../models/report';

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