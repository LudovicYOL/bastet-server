import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Mission = new Schema({
  poste: {
    type: String,
    required: true
  },
  enterprise: {
    type: String,
    required: true
  },
  domain: {
    type: String,
    required: true
  },
  startMonth: {
    type: String,
    required: true
  },
  startYear: {
    type: Number,
    required: true
  },
  endMonth: {
    type: String,
    required: false
  },
  endYear: {
    type: Number,
    required: false
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User'
  },
});

export default mongoose.model('Mission', Mission);