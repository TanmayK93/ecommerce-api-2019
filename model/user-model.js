const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// For Sequential ID 
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection); 

// Define collection and schema for Post
let UserSchema = new Schema({
  // For Sequential ID - Override
  _id: {type: Number, default: 0, unique: true},
  username: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  phone: {
    type: String
  }
},{
    collection: 'users'
});

// For Sequential ID 
UserSchema.plugin(autoIncrement.plugin, {
  model: 'users',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('users', UserSchema);