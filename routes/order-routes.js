const express = require('express');
const orderRoutes = express.Router();
let OrderModel = require('../model/order-model');
let CartModel = require('../model/cart-model');



orderRoutes.route('/placeorder').post(async function (req, res) {

  console.log('Data Received', req.body.userid,req.body.total);
  var date = new Date().toDateString();

  var orderId = Math.floor(Math.random() * (99999999 - 1 + 1) ) + 1;
   
              var order = new OrderModel(
                { 
                  orderId: orderId,
                  user: req.body.userid,
                  total:req.body.total,
                  date:date
                });
                await order.save();  

                CartModel.find({"UserId": {$eq:req.body.userid}} , async function(err, order) {
                let ArrayData = [];
                var length = order[0].items.length;
                console.log("length is ", length);
                let data = []
                order.forEach((meme,index) => {
                    data[index] = meme;
                    });
                     console.log(data[0].items.length);
                     var i = 0;
                     while (i < data[0].items.length) {
                      var query2 = OrderModel.update(
                          { "orderId": orderId},
                          { "$push": 
                              {"items": 
                                  {
                                      "ProductId": JSON.stringify(data[0].items[i].ProductId),
                                      "quantity": JSON.stringify(data[0].items[i].quantity)
                                  }
                              }
                          }
                        );
                        await query2.exec();  
                      i++;
                    }
                  }); 
                  res.status(200).json({'Order': 'Order Has been Placed Successfully'});
                });

orderRoutes.get('/order/:UserId', function(req, res, next) {
                  console.log('cart data Uid',req.params.UserId)
                  OrderModel
                    .find({ user: req.params.UserId })
                    .populate('items.ProductId')
                    .exec(function(err, foundOrder) {
                      if (err) 
                      return next(err);
                      let ArrayData = [];
                    for (step = 0; step < foundOrder.length; step++) {     
                    data = foundOrder[step].items.map(function(obj,index,arr){        
                        newobj = obj;
                        ArrayData.push(newobj);
                    });
                    }
                    //Creating a Final Array
                       var resultArray = {} 
                      resultArray = []; 
                      var formattedarray = ArrayData.map(function(obj,index,arr){
                      var prdid = obj.ProductId._id;    
                      var resultData = {
                          id: prdid,
                          name: obj.ProductId.name,
                          price: obj.ProductId.price,
                          quantity: obj.quantity,
                          image: obj.ProductId.image
                        };
                        resultArray.push(resultData);
                    });
                    
                      res.send({'order': foundOrder, 'products': resultArray});
                    });
              });

module.exports = orderRoutes;