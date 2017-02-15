import { validateObjectId, validateWritePostBody, validateEditPostBody } from '../utils/validation';
import Post from '../models/post';
import Bookmark from '../models/bookmark';
import Follow from '../models/follow';

import fs from 'fs';
import path from 'path';

import findHashtags from 'find-hashtags';

import { uploadToS3, deleteInS3 } from '../utils/awsWrapper';



/**
 * Write post
 * body: { image, description, location }
 */
export const writePost = (req, res, next) => {
  if (!req.file || !req.body) {
    return res.status(400).send({
      msg: 'Invalid request'
    });
  }

  const body = {
    image: req.file,
    description: req.body.description,
    latitude: req.body.latitude,
    longitude: req.body.longitude
  };

  const validate = validateWritePostBody(body);
  if (validate.error.length > 0) {
    return res.status(400).send({
      msg: validate.error[0].message,
      code: validate.error[0].code
    });
  }

  if (!req.user) {
    // if not log in
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  // 1. write s3
  // 2. write db
  // 3. delete image file    
  uploadToS3({
    path: body.image.path,
    name: body.image.filename,
    contentType: body.image.mimetype
  })
    .then(url => {
      const hashtags = findHashtags(body.description);

      Post.writePost({
        accountId: req.user._id,
        username: req.user.common_profile.username,
        image: url,
        description: body.description,
        latitude: body.latitude,
        longitude: body.longitude,
        hashtags
      });
    })
    .then(() => {
      fs.unlink(body.image.path, err => {
        res.send({ msg: 'SUCCESS' });
      });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Edit post
 * body: { image, description, location }
 */
export const editPost = (req, res, next) => {
  if (!req.file && !req.body) {
    return res.status(400).send({
      msg: 'Invalid request',
      code: 2
    });
  }

  const validateParams = validateObjectId(req.params.postId);
  if (!validateParams) {
    return res.status(400).send({
      msg: 'Invalid request',
      code: 2
    });
  }

  const body = {
    image: req.file,
    description: req.body.description,
    latitude: req.body.latitude && +req.body.latitude,
    longitude: req.body.longitude && +req.body.longitude
  };

  const validate = validateEditPostBody(body);
  if (validate.error.length > 0) {
    return res.status(400).send({
      msg: 'Invalid request',
      code: 2
    });
  }

  if (!req.user) {
    // if not log in
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  let oldImage = null;

  if (body.image) {
    // 1. upload image
    // 2. edit db
    // 3. delete image in upload folder
    // 4. delete image in s3

    Post.findPost(req.params.postId)
      .then(post => {
        if (!post) {
          let error = new Error();
          error.message = 'Not found resource';
          error.code = 400;
          error.errorCode = 3;
          throw error;
        }

        if (post.writer !== req.user.common_profile.username) {
          let error = new Error();
          error.message = 'Not authorized';
          error.code = 401;
          error.errorCode = 1;
          throw error;
        }

        oldImage = path.basename(post.image);

        return uploadToS3({
          path: body.image.path,
          name: body.image.filename,
          contentType: body.image.mimetype
        });
      })
      .then(url => {
        let params = {};
        if (body.image) params.image = url;
        if (body.description) {
          params.description = body.description;

          const hashtags = findHashtags(body.description);
          params.tags = hashtags;
        }
        if (body.latitude) {
          params.location = {};
          params.location.latitude = body.latitude;
          params.location.longitude = body.longitude;
        }

        Post.editPost(req.params.postId, params);
      })
      .then(() => {
        fs.unlink(body.image.path, err => { });
      })
      .then(() => {
        deleteInS3(oldImage)
      })
      .then(() => {
        res.send({ msg: 'SUCCESS' });
      })
      .catch(err => {
        next(err);
      });
  } else {
    // 1. edit db
    let params = {};
    if (body.description) {
      params.description = body.description;

      const hashtags = findHashtags(body.description);
      params.tags = hashtags;
    }
    if (body.latitude) {
      params.location = {};
      params.location.latitude = body.latitude;
      params.location.longitude = body.longitude;
    }

    Post.findPost(req.params.postId)
      .then(post => {
        if (!post) {
          let error = new Error();
          error.message = 'Not found resource';
          error.code = 400;
          error.errorCode = 3;
          throw error;
        }

        if (post.writer !== req.user.common_profile.username) {
          let error = new Error();
          error.message = 'Not authorized';
          error.code = 401;
          error.errorCode = 1;
          throw error;
        }

        Post.editPost(req.params.postId, params);
      })
      .then(() => {
        res.send({ msg: 'SUCCESS' });
      })
      .catch(err => {
        next(err);
      });
  }
};

/**
 * Get post count
 */
export const getPostCount = (req, res, next) => {
  Post.getPostCountByUsername(req.params.username)
    .then(count => {
      res.send({
        msg: 'SUCCESS',
        count: count
      });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Delete post
 */
export const deletePost = (req, res, next) => {
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

  Post.findPost(req.params.postId)
    .then(post => {
      if (!post) {
        let error = new Error();
        error.message = 'Not found resource';
        error.code = 400;
        error.errorCode = 3;
        throw error;
      }

      if (post.writer !== req.user.common_profile.username) {
        let error = new Error();
        error.message = 'Not authorized';
        error.code = 401;
        error.errorCode = 1;
        throw error;
      }

      Post.deletePost(req.params.postId);
    })
    .then(() => {
      res.send({
        msg: 'SUCCESS',
        _id: req.params.postId
      });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Preview post
 */
export const getPreview = (req, res, next) => {
  Post.previewPost(req.params.username)
    .then(posts => {
      let result = { msg: 'SUCCESS' };
      result.data = posts;
      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Like post
 */
export const likePost = (req, res, next) => {
  const validateParams = validateObjectId(req.params.postId);
  if (!validateParams) {
    return res.status(400).send({
      msg: 'Invalid request',
      code: 2
    });
  }

  if (!req.user) {
    // if not log in
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Post.findPost(req.params.postId)
    .then(post => {
      if (!post) {
        let error = new Error();
        error.message = 'Not found resource';
        error.code = 400;
        error.errorCode = 3;
        throw error;
      }

      let index = post.likes.indexOf(req.user.common_profile.username);
      if (index === -1) {
        post.likes.push(req.user.common_profile.username);
        post.save();
      }
    })
    .then(() => {
      res.send({
        msg: 'SUCCESS',
        postId: req.params.postId,
        username: req.user.common_profile.username
      });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Unlike post
 */
export const unlikePost = (req, res, next) => {
  const validateParams = validateObjectId(req.params.postId);
  if (!validateParams) {
    return res.status(400).send({
      msg: 'Invalid request',
      code: 2
    });
  }

  if (!req.user) {
    // if not log in
    return res.status(401).send({
      msg: 'Not authorized',
      code: 1
    });
  }

  Post.findPost(req.params.postId)
    .then(post => {
      if (!post) {
        let error = new Error();
        error.message = 'Not found resource';
        error.code = 400;
        error.errorCode = 3;
        throw error;
      }

      let index = post.likes.indexOf(req.user.common_profile.username);
      if (index > -1) {
        post.likes.splice(index, 1);
        post.save();
      }
    })
    .then(() => {
      res.send({
        msg: 'SUCCESS',
        postId: req.params.postId,
        username: req.user.common_profile.username
      });
    })
    .catch(err => {
      next(err);
    });
};

/**
 * Get detail post
 */
export const getPost = (req, res, next) => {
  const validateParams = validateObjectId(req.params.postId);
  if (!validateParams) {
    return res.status(400).send({
      msg: 'Invalid postId',
      code: 1
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 3
    });
  }

  let result = { msg: 'SUCCESS' };
  let _post = null;

  Post.getPostDetail(req.params.postId)
    .then(post => {
      if (!post) {
        let error = new Error();
        error.message = 'Not found resource';
        error.code = 400;
        error.errorCode = 2;
        throw error;
      }

      return combineResult(post, req);
    })
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};

export const handleGetPosts = (req, res, next) => {
  let queryString = req.query.q;
  if (!queryString) {
    return res.status(400).send({
      msg: 'Invalid query string',
      code: 1
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 2
    });
  }

  switch (queryString) {
    case 'feed':
      getPostsFeed(req, res, next);
      break;
    case 'friend':
      getPostsFriend(req, res, next);
      break;
    case 'hashtag':
      getPostsHashtag(req, res, next);
      break;
    default:
      return res.status(400).send({
        msg: 'Invalid query string',
        code: 1
      });
  }
};

export const handleGetPostsByType = async (req, res, next) => {
  const listType = req.params.listType;
  const postId = req.params.postId;
  let queryString = req.query.q;

  if (!queryString) {
    return res.status(400).send({
      msg: 'Invalid query string',
      code: 1
    });
  }

  if (listType !== 'old' && listType !== 'new') {
    return res.status(400).json({
      error: 'Invalid list type',
      code: 2
    });
  }

  const validateParams = validateObjectId(postId);
  if (!validateParams) {
    return res.status(400).send({
      msg: 'Invalid postId',
      code: 1
    });
  }

  if (!req.user) {
    return res.status(401).send({
      msg: 'Not authorized',
      code: 3
    });
  }

  switch (queryString) {
    case 'feed':
      getPostsFeedByType(req, res, next);
      break;
    case 'friend':
      getPostsFriendByType(req, res, next);
      break;
    case 'hashtag':
      getPostsHashtagByType(req, res, next);
      break;
    default:
      return res.status(400).send({
        msg: 'Invalid query string',
        code: 4
      });
  }
};

/**
 * This function combine post, bookmark and follow
 */
const combineResult = (post, req) => {
  // combine a result
  let result = {};
  result._id = post._id;
  result.writer = post.writer;

  result.common_profile = {
    thumbnail: post.accountId.common_profile.thumbnail
  };

  result.post = {
    image: post.image,
    description: post.description,
    date: post.date,
    likes: post.likes
  };

  result.comment_count = post.comments.length;

  return Bookmark.findBookmarkById(req.user._id, req.params.postId)
    .then(bookmark => {
      result.bookmark = bookmark ? true : false;

      return Follow.findFollow(post.accountId._id, req.user._id);
    })
    .then(follow => {
      result.follow = follow ? true : false;

      // own post
      if (post.accountId._id.toString() === req.user._id)
        result.follow = true;

      return result;
    })
    .catch(err => {
      throw err;
    });
};

const getPostsFeed = async (req, res, next) => {
  let datas = [];

  try {
    const posts = await Post.getPostsFeed();

    for (let post of posts) {
      const data = await combineResult(post, req);
      datas.push(data);
    }

    res.send({ msg: 'SUCCESS', data: datas });
  } catch (err) {
    next(err);
  }
};

const getPostsFeedByType = async (req, res, next) => {
  const listType = req.params.listType;
  const postId = req.params.postId;

  let datas = [];

  try {
    const posts = await Post.getPostsFeedByType(postId, listType);

    for (let post of posts) {
      const data = await combineResult(post, req);
      datas.push(data);
    }

    res.send({ msg: 'SUCCESS', data: datas });
  } catch (err) {
    next(err);
  }
};

const getPostsFriend = async (req, res, next) => {
  let datas = [];

  try {
    const followees = await Follow.findFollowees(req.user._id);
    const followeeNames = followees.map((followee, index) => {
      return followee.followee.common_profile.username;
    });

    const posts = await Post.getPostsFriend(followeeNames);

    for (let post of posts) {
      const data = await combineResult(post, req);
      datas.push(data);
    }

    res.send({ msg: 'SUCCESS', data: datas });
  } catch (err) {
    next(err);
  }
};

export const getPostsFriendByType = async (req, res, next) => {
  const listType = req.params.listType;
  const postId = req.params.postId;

  let datas = [];

  try {
    const followees = await Follow.findFollowees(req.user._id);
    const followeeNames = followees.map((followee, index) => {
      return followee.followee.common_profile.username;
    });

    const posts = await Post.getPostsFriendByType(postId, listType, followeeNames);

    for (let post of posts) {
      const data = await combineResult(post, req);
      datas.push(data);
    }

    res.send({ msg: 'SUCCESS', data: datas });
  } catch (err) {
    next(err);
  }
};

export const getPostsHashtag = async (req, res, next) => {
  const hashtag = req.query.hashtag;
  if (!hashtag) {
    return res.status(400).send({
      msg: 'Invalid hashtag',
      code: 3
    });
  }

  let datas = [];

  try {
    const posts = await Post.getPostsHashtag(hashtag);

    for (let post of posts) {
      const data = await combineResult(post, req);
      datas.push(data);
    }

    res.send({ msg: 'SUCCESS', data: datas });
  } catch (err) {
    next(err);
  }
};

export const getPostsHashtagByType = async (req, res, next) => {
  const listType = req.params.listType;
  const postId = req.params.postId;
  const hashtag = req.query.hashtag;

  if (!hashtag) {
    return res.status(400).send({
      msg: 'Invalid hashtag',
      code: 4
    });
  }

  let datas = [];

  try {
    const posts = await Post.getPostsHashtagByType(postId, listType, hashtag);

    for (let post of posts) {
      const data = await combineResult(post, req);
      datas.push(data);
    }

    res.send({ msg: 'SUCCESS', data: datas });
  } catch (err) {
    next(err);
  }
};