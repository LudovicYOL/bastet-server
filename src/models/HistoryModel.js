import { User } from '../models/UserModel';
import mongoose from 'mongoose';

var mongoosePaginate = require('mongoose-paginate');
const Schema = mongoose.Schema;

let History = new Schema({
  text: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
});

History.methods.createInstance = function (user, text) {
    this.text = user.firstName +" "+ user.lastName +" "+ text;
    this.user = user.id;
    this.date = new Date();
    this.save();
  };

History.plugin(mongoosePaginate);

export default mongoose.model('History', History);