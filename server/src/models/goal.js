import mongoose, { Schema } from 'mongoose';

const Goal = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  username: String,
  goals: [{
    title: String,
    date: { type: Date, default: Date.now },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }
  }]
});

Goal.statics.findGoal = function (username) {
  return this.findOne({ username }).exec();
};

Goal.statics.writeGoal = function (accountId, username, title) {
  return this.update({ accountId }, {
    username,
    $push: {
      goals: {
        $each: [{ title, postId: null }]
      }
    }
  }, { upsert: true }).exec();
};

export default mongoose.model('Goal', Goal);