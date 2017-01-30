import { validateWritePostBody } from '../utils/validation';
import Post from '../models/post';
import fs from 'fs';

import { uploadToS3 } from '../utils/awsWrapper';
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