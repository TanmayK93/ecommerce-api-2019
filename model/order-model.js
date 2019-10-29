var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection); 


var OrderSchema = new Schema({
  _id: {type: Number, default: 0, unique: true},
  orderId: { type: Number},
  user: {type: Number, ref: 'users'},
  total:{type: Number, default: 0},
  date:{type:String},
  items: [{
    ProductId: { type: Number, ref: 'Products'},
    quantity: { type: Number, default: 1},
  }]
});

// For Sequential ID 
OrderSchema.plugin(autoIncrement.plugin, {
  model: 'Order',
  field: '_id',
  startAt: 1,
  incrementBy: 1
});

module.exports = mongoose.model('Order', OrderSchema);