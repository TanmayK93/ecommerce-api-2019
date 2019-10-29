const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// For Sequential ID 
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection); 

let CommentsSchema = new Schema({
  product: { type: Number, ref: 'Products' },
  username: {
    type: String
  },
  description: {
    type: String
  },
  rating: {
    type: Number
  }
},{
    collection: 'comments'
});

// For Sequential ID 
CommentsSchema.plugin(autoIncrement.plugin, {
  model: 'comments',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('comments', CommentsSchema);