import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const User = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  hash: {
    type: String,
    required: true,
  },
  salt: {
    type: String,
    required: true,
  },
  name: {
    type: String,
  },
  avatarURL: {
    type: String,
  },
});

export default mongoose.model('User', User);
