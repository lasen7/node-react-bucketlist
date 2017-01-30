import mongoose, { Schema } from 'mongoose';

const Post = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
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

Post.statics.writePost = function ({ accountId, image, description, latitude, longitude }) {
  let post = new this();
  post.accountId = accountId;
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

export default mongoose.model('Post', Post);

