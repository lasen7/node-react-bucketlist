import Post from '../models/post';
import { validateObjectId, validateWriteCommentBody } from '../utils/validation';

/**
 * Write comment
 * body: { comment }
 */
export const writeComment = (req, res, next) => {
  const validateParams = validateObjectId(req.params.postId);
  if (!validateParams) {
    return res.status(400).send({
      msg: 'Invalid postId',
      code: 1
    });
  }

  if (!req.body) {
    return res.status(400).send({
      msg: 'Invalid comment',
      code: 2
    });
  }

  const body = {
    comment: req.body.comment
  };

  const validate = validateWriteCommentBody(body);
  if (validate.error.length > 0) {
    return res.status(400).send({
      msg: validate.error[0].message,
      code: validate.error[0].code
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      cde: 3
    });
  }

  Post.findPost(req.params.postId)
    .then(post => {
      if (!post) {
        let error = new Error();
        error.message = 'Not found resource';
        error.code = 400;
        error.errorCode = 4;
        throw error;
      }

      return Post.writeComment(req.params.postId, req.user._id, body.comment);
    })
    .then(result => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Get all comments
 */
export const getComments = (req, res, next) => {
  const validateParams = validateObjectId(req.params.postId);
  if (!validateParams) {
    return res.status(400).send({
      msg: 'Invalid postId',
      code: 1
    });
  }

  Post.getComments(req.params.postId)
    .then(post => {
      if (!post) {
        let error = new Error();
        error.message = 'Not found resource';
        error.code = 400;
        error.errorCode = 2;
        throw error;
      }

      let result = {};
      result.msg = 'SUCCESS';
      result.data = post.comments;
      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};