const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// For Sequential ID 
const autoIncrement = require('mongoose-auto-increment');

autoIncrement.initialize(mongoose.connection); 

// Define collection and schema for Post
let ProductsSchema = new Schema({
  // For Sequential ID - Override
  _id: {type: Number, default: 0, unique: true},
  name: {
    type: String
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  price: {
    type: String,
  },
  rating:{
    type: Number,
  },
  sale: {
    type: String,
  },
  discount: {
    type: Number,
  },
  shippingCost: {
    type: String,
  }
},{
    collection: 'products'
});

// For Sequential ID 
ProductsSchema.plugin(autoIncrement.plugin, {
  model: 'Products',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Products', ProductsSchema);