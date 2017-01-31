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
      code: 3
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

/**
 * Like comment
 */
export const likeComment = (req, res, next) => {
  const validatePostId = validateObjectId(req.params.postId);
  if (!validatePostId) {
    return res.status(400).send({
      msg: 'Invalid postId',
      code: 2
    });
  }

  const validatecommentId = validateObjectId(req.params.commentId);
  if (!validatecommentId) {
    return res.status(400).send({
      msg: 'Invalid commentId',
      code: 3
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Post.findPost(req.params.postId)
    .then(post => {
      if (!post) {
        let error = new Error();
        error.message = 'Not found post';
        error.code = 400;
        error.errorCode = 4;
        throw error;
      }

      let finded = post.comments.find(comment => comment._id.toString() === req.params.commentId);
      if (!finded) {
        let error = new Error();
        error.message = 'Not found comment';
        error.code = 400;
        error.errorCode = 5;
        throw error;
      }

      let index = finded.likes.indexOf(req.user.common_profile.username);
      if (index === -1) {
        finded.likes.push(req.user.common_profile.username);
        post.save();
      }
    })
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};

export const unlikeComment = (req, res, next) => {
  const validatePostId = validateObjectId(req.params.postId);
  if (!validatePostId) {
    return res.status(400).send({
      msg: 'Invalid postId',
      code: 2
    });
  }

  const validatecommentId = validateObjectId(req.params.commentId);
  if (!validatecommentId) {
    return res.status(400).send({
      msg: 'Invalid commentId',
      code: 3
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Post.findPost(req.params.postId)
    .then(post => {
      if (!post) {
        let error = new Error();
        error.message = 'Not found post';
        error.code = 400;
        error.errorCode = 4;
        throw error;
      }

      let finded = post.comments.find(comment => comment._id.toString() === req.params.commentId);
      if (!finded) {
        let error = new Error();
        error.message = 'Not found comment';
        error.code = 400;
        error.errorCode = 5;
        throw error;
      }

      let index = finded.likes.indexOf(req.user.common_profile.username);
      if (index > -1) {
        finded.likes.splice(index, 1);
        post.save();
      }
    })
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};