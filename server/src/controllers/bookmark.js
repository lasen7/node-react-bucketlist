import Bookmark from '../models/bookmark';
import { validateObjectId } from '../utils/validation';

export const likeBookmark = (req, res, next) => {
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

  Bookmark.findBookmark(req.user._id)
    .then(bookmark => {
      if (!bookmark) {
        // if bookmark not exists, add bookmark
        return Bookmark.likeBookmark(req.user._id, req.user.common_profile.username, req.params.postId);
      }

      let index = bookmark.posts.indexOf(req.params.postId);
      if (index === -1) {
        // if post of bookmark not exists, push bookmark
        bookmark.posts.push(req.params.postId);
        bookmark.save();
      } else {
        let error = new Error();
        error.message = 'Already liked';
        error.code = 400;
        error.errorCode = 3;
        throw error;
      }
    })
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};

export const unlikeBookmark = (req, res, next) => {
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

  Bookmark.findBookmark(req.user._id)
    .then(bookmark => {
      if (!bookmark) {
        let error = new Error();
        error.message = 'Not found resource';
        error.code = 400;
        error.errorCode = 4;
        throw error;
      }

      if (bookmark.accountId.toString() !== req.user._id) {
        let error = new Error();
        error.message = 'Not authorized';
        error.code = 400;
        error.errorCode = 1;
        throw error;
      }

      let index = bookmark.posts.indexOf(req.params.postId);
      if (index !== -1) {
        bookmark.posts.splice(index, 1);
        bookmark.save();
      }
    })
    .then(() => {
      res.send({ msg: 'SUCCESS' });
    })
    .catch(err => {
      next(err);
    });
};

export const getBookmarks = (req, res, next) => {
  Bookmark.getBookmarks(req.params.username)
    .then(bookmark => {
      let result = {};
      result.msg = 'SUCCESS';
      result.data = bookmark ? bookmark.posts : [];

      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};