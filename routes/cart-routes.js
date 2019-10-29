const express = require("express");
const cartRoutes = express.Router();

// Require Post model in our routes module
let CartModel = require("../model/cart-model");

cartRoutes.route("/addToCart").post(function(req, res) {
  console.log(
    "Data Received",
    req.body.UserId,
    req.body.ProductId,
    req.body.quantity
  );
  const uid = req.body.UserId;
  const pid = req.body.ProductId;

  try {
    console.log("add");
    CartModel.findOne({ UserId: { $eq: uid } }, async function(err, cart) {
      console.log("1st Block");
      if (cart) {
        CartModel.findOne(
          { UserId: { $eq: uid }, "items.ProductId": { $eq: pid } },
          async function(err, product) {
            console.log("2nd Block");
            if (product) {
              console.log("Update product");
              var query = CartModel.updateOne(
                { UserId: req.body.UserId, "items.ProductId": { $eq: pid } },
                {
                  $set: { "items.$.quantity": req.body.quantity }
                }
              );
              await query.exec();
              console.log("done1");
              res
                .status(200)
                .json({
                  Cart: "Product Updated Quantity successfully in Cart"
                });
            } else {
              console.log("Update quantity with Product");
              var query2 = CartModel.update(
                { UserId: req.body.UserId },
                {
                  $addToSet: {
                    items: [
                      {
                        ProductId: req.body.ProductId,
                        quantity: req.body.quantity
                      }
                    ]
                  }
                }
              );
              await query2.exec();
              console.log("done2");
              res
                .status(200)
                .json({
                  Cart: "Product Updated (Created) successfully in Cart"
                });
            }
          }
        );
      } else {
        cart = new CartModel({
          UserId: req.body.UserId,
          items: [
            {
              ProductId: req.body.ProductId,
              quantity: req.body.quantity
            }
          ]
        });
        await cart.save();
        res.status(200).json({ Cart: "Product Added successfully in Cart" });
      }
    });
  } catch (err) {}
});

cartRoutes.route("/edit/:id/:pid").delete(function(req, res) {
  let userid = req.params.id;
  let productID = req.params.pid;

  CartModel.findOne(
    { UserId: { $eq: userid }, "items.ProductId": { $eq: productID } },
    async function(err, product) {
      console.log("delete Block");
      if (product) {
        console.log("Update product", userid, productID);
        var query = CartModel.update(
          { UserId: userid },
          { $pull: { items: { ProductId: productID } } },
          { multi: true }
        );

        await query.exec();
        console.log("done1");
        res
          .status(200)
          .json({ Cart: "Product Updated Quantity successfully in Cart" });
      }
    }
  );
});

cartRoutes.get("/cart/:UserId", function(req, res, next) {
  console.log("cart data Uid", req.params.UserId);
  CartModel.find({ UserId: req.params.UserId })
    .populate("items.ProductId")
    .exec(function(err, foundCart) {
      if (err) return next(err);

      //Converting Object To Array
      let ArrayData = [];
      for (step = 0; step < foundCart.length; step++) {
        data = foundCart[step].items.map(function(obj, index, arr) {
          newobj = obj;
          ArrayData.push(newobj);
        });
      }
      //Creating a Final Array
      var resultArray = {};
      resultArray = [];
      var formattedarray = ArrayData.map(function(obj, index, arr) {
        var prdid = obj.ProductId._id;
        var resultData = {
          id: prdid,
          name: obj.ProductId.name,
          description: obj.ProductId.description,
          price: obj.ProductId.price,
          quantity: obj.quantity,
          image: obj.ProductId.image
        };
        resultArray.push(resultData);
      });
      res.json(resultArray);
    });
});

module.exports = cartRoutes;
