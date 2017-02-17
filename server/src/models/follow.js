import mongoose, { Schema } from 'mongoose';

const Follow = new Schema({
  followee: { type: Schema.Types.ObjectId, ref: 'Account' },
  follower: { type: Schema.Types.ObjectId, ref: 'Account' },
  date: { type: Date, default: Date.now }
});

Follow.statics.findFollow = function (followee, follower) {
  return this.findOne({ followee, follower }).exec();
};

Follow.statics.findFollowers = function (followee) {
  return this.find({ followee })
    .populate('follower', 'common_profile.username common_profile.thumbnail')
    .select({
      follower: 1
    })
    .exec();
};

Follow.statics.findFollowee = function (follower, followee) {
  return this.find({ follower, followee })
    .populate('followee', 'common_profile.username common_profile.thumbnail')
    .select({
      followee: 1
    })
    .exec();
};

Follow.statics.findFollowees = function (follower) {
  return this.find({ follower })
    .populate('followee', 'common_profile.username common_profile.thumbnail')
    .select({
      followee: 1
    })
    .exec();
};

Follow.statics.addFollow = function (followee, follower) {
  let follow = new this();
  follow.followee = followee;
  follow.follower = follower;

  return follow.save();
};

Follow.statics.deleteFollow = function (followee, follower) {
  return this.remove({ followee, follower }).exec();
};

Follow.statics.getFollowerCount = function (followee) {
  return this.count({ followee }).exec();
};

Follow.statics.getFolloweeCount = function (follower) {
  return this.count({ follower }).exec();
};

export default mongoose.model('Follow', Follow);