import mongoose, { Schema } from 'mongoose';

const Report = new Schema({
  postId: { type: Schema.Types.ObjectId, ref: 'Post' },
  review: { type: Boolean, default: false },
  count: { type: Number, default: 1 }
});

Report.statics.findReport = function (postId) {
  return this.findOne({ postId }).exec();
};

Report.statics.reportPost = function (postId) {
  let report = new this();
  report.postId = postId;
  return report.save();
};

export default mongoose.model('Report', Report);