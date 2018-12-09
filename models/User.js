import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';

const config = require('../config/config');

const Schema = mongoose.Schema;

let User = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  promotion: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  description: {
    type: String,
  },
  phone: {
    type: String,
  },
  city: {
    type: String,
  },
  facebook: {
    type: String,
  },
  twitter: {
    type: String,
  },
  linkedin: {
    type: String,
  },
  twitter: {
    type: String,
  },
  hash: String,
  salt: String
});

User.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

User.methods.validPassword = function (password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
  return this.hash === hash;
};

User.methods.generateJwt = function () {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, config.SECRET_JWT);
};

export default mongoose.model('User', User);