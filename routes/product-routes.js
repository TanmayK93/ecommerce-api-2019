const express = require("express");
const productRoutes = express.Router();

// Require Post model in our routes module
let Product = require("../model/product-model.js");

// Defined get data(index or listing) route
productRoutes.route("/").get(function(req, res) {
  Product.find(function(err, product) {
    if (err) {
      res.json(err);
    } else {
      res.json(product);
    }
  });
});

module.exports = productRoutes;
