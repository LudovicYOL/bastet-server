import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const config = require('../config/config');

const Schema = mongoose.Schema;

let Account = new Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  role: {
    type: String,
    enum: ['USER', 'ADMIN', 'SCHOOL', 'OTHER'],
    default: 'USER'
  },
  hash: String,
  salt: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
});

Account.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

Account.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

Account.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    user: this.user,
    role: this.role,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.SECRET_JWT);
};

export default mongoose.model('Account', Account);