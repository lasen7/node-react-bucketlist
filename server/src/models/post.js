import mongoose, { Schema } from 'mongoose';
import Comment from './comment';

const Post = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  writer: String,
  image: String,
  description: String,
  location: {
    latitude: Number,
    longitude: Number
  },
  tags: [String],
  date: { type: Date, default: Date.now },
  likes: [String],
  comments: [Comment]
});

Post.statics.writePost = function ({ accountId, username, image, description, latitude, longitude, hashtags }) {
  let post = new this();
  post.accountId = accountId;
  post.writer = username;
  post.image = image;
  post.description = description;
  post.location.latitude = latitude;
  post.location.longitude = longitude;
  post.tags = hashtags;

  return post.save();
};

Post.statics.writeComment = function (id, accountId, comment) {
  return this.update({ _id: id }, {
    $push: {
      comments: {
        $each: [{ accountId, comment }]
      }
    }
  }).exec();
};

Post.statics.findPost = function (id) {
  return this.findOne({ _id: id }).exec();
};

Post.statics.editPost = function (id, params) {
  return this.update({ _id: id }, params).exec();
};

Post.statics.getPostCountByUsername = function (username) {
  return this.count({ writer: username }).exec();
};

Post.statics.deletePost = function (id) {
  return this.remove({ _id: id }).exec();
};

Post.statics.previewPost = function (username) {
  return this.find({ writer: username }, { image: true, _id: 1 }).exec();
};

Post.statics.getComments = function (id) {
  return this.findOne({ _id: id })
    .populate('comments.accountId', 'common_profile.thumbnail common_profile.username')
    .select({
      comments: 1
    })
    .exec();
};

Post.statics.getPostDetail = function (id) {
  return this.findOne({ _id: id })
    .populate('accountId', 'common_profile.thumbnail')
    .exec();
};

Post.statics.findPostsByHashtag = function (hashtag) {
  return this.aggregate([
    { $match: { tags: { $regex: hashtag } } },
    { $unwind: '$tags' },
    {
      $group: {
        _id: { tag: '$tags' },
        count: { $sum: 1 }
      }
    },
    { $match: { '_id.tag': { $regex: hashtag } } }
  ]).exec();
};

export default mongoose.model('Post', Post);

