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
  keywords: [{
    type: String
  }],
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
  github: {
    type: String,
  },
});

export default mongoose.model('User', User);