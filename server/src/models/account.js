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

Account.statics.findUserByFacebookID = function (id) {
  return this.findOne({ 'o_auth.facebook.id': id }).exec();
};

Account.statics.addUser = function ({type, hash, username, fullname, gender, email, id, access_token}) {
  let account = new this();
  account.type = type;
  account.password = hash;
  account.common_profile.username = username;
  account.common_profile.fullname = fullname;
  account.common_profile.gender = gender;
  account.common_profile.email = email;

  if (type === 'facebook') {
    account.o_auth.facebook.id = id;
    account.o_auth.facebook.access_token = access_token;
  }

  if (type === 'google') {
    account.o_auth.google.id = id;
    account.o_auth.google.access_token = access_token;
  }

  return account.save();
};

export default mongoose.model('Account', Account);

