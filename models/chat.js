import mongoose, { SchemaTypes } from 'mongoose';

const Schema = mongoose.Schema;

const Chat = new Schema({
  userId: SchemaTypes.String,
  text: SchemaTypes.String,
});

export default mongoose.model('Chat', Chat);
