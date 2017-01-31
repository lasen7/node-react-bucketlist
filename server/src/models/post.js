import mongoose, { Schema } from 'mongoose';
import Comment from './comment';

const Post = new Schema({
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

Post.statics.writePost = function ({ username, image, description, latitude, longitude }) {
  let post = new this();
  post.writer = username;
  post.image = image;
  post.description = description;
  post.location.latitude = latitude;
  post.location.longitude = longitude;

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

export default mongoose.model('Post', Post);

