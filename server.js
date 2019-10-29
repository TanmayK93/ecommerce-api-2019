const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');

const config = require('./connect.js');

const productRoute = require('../api/routes/product-routes.js');
const userRoute = require('../api/routes/user-routes.js');
const cartRoute = require('../api/routes/cart-routes.js');
const orderRoute = require('../api/routes/order-routes.js');
const commentRoute = require('../api/routes/comment-routes.js');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, { useNewUrlParser: true }).then(
  () => {
    console.log('Database is connected') 
  },
  err => { 
    console.log('Can not connect to the database'+ err)
  }
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());


app.use('/posts', productRoute);
app.use('/users',userRoute);
app.use('/carts',cartRoute);
app.use('/orders',orderRoute);
app.use('/comments',commentRoute);

app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});