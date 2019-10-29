var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection); 


var CartSchema = new Schema({
  _id: {type: Number, default: 0, unique: true},
  UserId: { type: Number, ref: 'users'},
  items: [{
    ProductId: { type: Number, ref: 'Products'},
    quantity: { type: Number, default: 1},
  }]
});

// For Sequential ID 
CartSchema.plugin(autoIncrement.plugin, {
  model: 'Cart',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Cart', CartSchema);