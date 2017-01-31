import mongoose, { Schema } from 'mongoose';

const Comment = new Schema({
  writer: String,
  comment: String,
  likes: [String],
  date: { type: Date, default: Date.now }
});

export default Comment;

