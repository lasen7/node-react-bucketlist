import Post from '../models/post';

export const getTags = (req, res, next) => {
  if (!req.query.q) {
    return res.status(400).send({
      msg: 'Invalid query string',
      code: 1
    });
  }

  Post.findPostsByHashtag(req.query.q)
    .then(posts => {
      let result = {};
      result.msg = 'SUCCESS';
      result.data = posts;

      res.send(result);
    })
    .catch(err => {
      next(err);
    });
};