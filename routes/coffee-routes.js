const express = require("express");
const coffeeRoutes = express.Router();

// Require Post model in our routes module
let coffeeModel = require("../model/coffee-model.js");

// Defined get data(index or listing) route
coffeeRoutes.route("/").get(function(req, res) {
  coffeeModel.find(function(err, coffee) {
    if (err) {
      res.json(err);
    } else {
      res.json(coffee);
    }
  });
});

module.exports = coffeeRoutes;
