import mongoose, { Schema } from 'mongoose';

const Comment = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  comment: String,
  likes: [String],
  date: { type: Date, default: Date.now }
});

export default Comment;

