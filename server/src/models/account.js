import mongoose, { Schema } from 'mongoose';

const type = "local facebook google".split(' ');
const gender = "male female hidden".split(' ');

const Account = new Schema({
  type: { type: String, enum: type },
  password: String,
  common_profile: {
    username: String,
    fullname: String,
    email: String,
    gender: { type: String, enum: gender },
    thumbnail: { type: String, default: "none" }
  },
  o_auth: {
    facebook: {
      id: String,
      access_token: String
    },
    google: {
      id: String,
      access_token: String
    }
  }
});

Account.statics.findUser = function (username) {
  return this.findOne({ 'common_profile.username': username }).exec();
};

Account.statics.findUserByEmail = function (email) {
  return this.findOne({ 'common_profile.email': email }).exec();
};

Account.statics.addUser = function ({hash, username, fullname, gender, email}) {
  let account = new this();
  account.type = 'local';
  account.password = hash;
  account.common_profile.username = username;
  account.common_profile.fullname = fullname;
  account.common_profile.gender = gender;
  account.common_profile.email = email;
  return account.save();
};

export default mongoose.model('Account', Account);

