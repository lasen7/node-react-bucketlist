import mongoose, { Schema } from 'mongoose';

const Notice = new Schema({
  followee: { type: Schema.Types.ObjectId, ref: 'Account' },
  follower: { type: Schema.Types.ObjectId, ref: 'Account' },
  date: { type: Date, default: Date.now }
});

Notice.statics.addFollow = function (followee, follower) {
  let follow = new this();
  follow.followee = followee;
  follow.follower = follower;

  return follow.save();
};

Notice.statics.getNotices = function (followee) {
  return this.find({ followee })
    .populate('follower', 'common_profile.username common_profile.thumbnail')
    .select({
      follower: 1,
      date: 1
    })
    .exec();
};

export default mongoose.model('Notice', Notice);