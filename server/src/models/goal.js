import mongoose, { Schema } from 'mongoose';

const Goal = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  goals: [{
    title: String,
    date: { type: Date, default: Date.now },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' }
  }]
});

// Goal.statics.findGoal = function (accountId) {
//   return this.findOne({ accountId }).exec();
// };

Goal.statics.writeGoal = function (accountId, title) {
  return this.update({ accountId }, {
    $push: {
      goals: {
        $each: [{ title, postId: null }]
      }
    }
  }, { upsert: true }).exec();
};

export default mongoose.model('Goal', Goal);