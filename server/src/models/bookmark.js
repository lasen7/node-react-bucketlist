import mongoose, { Schema } from 'mongoose';

const Bookmark = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  username: String,
  posts: [Schema.Types.ObjectId]
});

Bookmark.statics.findBookmark = function (accountId) {
  return this.findOne({ accountId }).exec();
};

Bookmark.statics.likeBookmark = function (accountId, username, postId) {
  let bookmark = new this();
  bookmark.accountId = accountId;
  bookmark.username = username;
  bookmark.posts.push(postId);

  return bookmark.save();
};

export default mongoose.model('Bookmark', Bookmark);