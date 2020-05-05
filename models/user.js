<<<<<<< HEAD:models/userLocal.js
import mongoose, { SchemaType, SchemaTypes } from 'mongoose';
=======
import mongoose from 'mongoose';

>>>>>>> master:models/user.js
import passportLocalMongoose from 'passport-local-mongoose';

const Schema = mongoose.Schema;

const User = new Schema({
  name: SchemaTypes.String,
  avatarURL: SchemaTypes.String,
});

User.plugin(passportLocalMongoose);

export default mongoose.model('User', User);
