import mongoose, { Schema } from 'mongoose';

const Bookmark = new Schema({
  accountId: { type: Schema.Types.ObjectId, ref: 'Account' },
  username: String,
  posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }]
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

Bookmark.statics.getBookmarks = function (username) {
  return this.findOne({ username })
    .populate('posts', 'image')
    .exec();
};

export default mongoose.model('Bookmark', Bookmark);