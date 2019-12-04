const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Define collection and schema for Post
let coffeeSchema = new Schema(
  {
    name: {
      type: String
    },
    description: {
      type: String
    },
    image: {
      type: String
    }
  },
  {
    collection: "coffee"
  }
);

module.exports = mongoose.model("coffee", coffeeSchema);
