const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const PORT = 4000;
const cors = require("cors");
const mongoose = require("mongoose");

const config = require("./connect.js");

const productRoute = require("./routes/product-routes");
const userRoute = require("./routes/user-routes.js");
const cartRoute = require("./routes/cart-routes.js");
const orderRoute = require("./routes/order-routes");
const commentRoute = require("./routes/comment-routes.js");
const coffeeRoute = require("./routes/coffee-routes.js");

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log("Database is connected");
  },
  err => {
    console.log("Can not connect to the database" + err);
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/posts", productRoute);
app.use("/coffee", coffeeRoute);
app.use("/users", userRoute);
app.use("/carts", cartRoute);
app.use("/orders", orderRoute);
app.use("/comments", commentRoute);

app.listen(process.env.PORT || PORT, function() {
  console.log("Server is running on Port:", PORT);
});
