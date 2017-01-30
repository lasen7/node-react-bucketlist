import { validateObjectId, validateWritePostBody, validateEditPostBody } from '../utils/validation';
import Post from '../models/post';
import fs from 'fs';
import path from 'path';

import { uploadToS3, deleteInS3 } from '../utils/awsWrapper';
// const uploadToS3 = require('../utils/awsWrapper');

/**
 * 게시물 작성하기
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
      cde: 1
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
      Post.writePost({
        accountId: req.user._id,
        image: url,
        description: body.description,
        latitude: body.latitude,
        longitude: body.longitude
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
 * 게시물 수정하기
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
    latitude: +req.body.latitude,
    longitude: +req.body.longitude
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
      cde: 1
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

        if (post.accountId.toString() !== req.user._id) {
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
        if (body.description) params.description = body.description;
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
    if (body.description) params.description = body.description;
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

        if (post.accountId.toString() !== req.user._id) {
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