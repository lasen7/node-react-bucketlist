import mongoose, { Schema } from 'mongoose';

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
  comments: []
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
}

export default mongoose.model('Post', Post);

