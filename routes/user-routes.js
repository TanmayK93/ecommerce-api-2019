const express = require('express');
const userRoutes = express.Router();
const bcrypt = require('bcryptjs');

// Require Post model in our routes module
let UserModel = require('../model/user-model');


// Defined get data(index or listing) route
userRoutes.route('/').get(function (req, res) {
  UserModel.find(function(err, User){
    if(err){
      res.json(err);
    }
    else {
      res.json(User);
    }
  });
});

userRoutes.route('/userdetails/:uid').get(function (req, res) {
  console.log("user", req.params.uid);
  UserModel.find({"_id": {$eq:req.params.uid}}, function(err, users){
  if(err){
    res.json(err);
  }
  else {
    res.json(users);
  }
});
});

// Defined store route
userRoutes.route('/add').post(function (req, res) {
  let salt = bcrypt.genSaltSync();
  let hashpass = bcrypt.hashSync(req.body.password, salt);

    let user = new UserModel({
      username: req.body.username,
      email: req.body.email,
      password: hashpass
    });
    user.save()
      .then(() => {
        res.status(200).json({'User': 'User in added successfully'});
      })
      .catch(() => {
        res.status(400).send("unable to save User to database");
      });
});

userRoutes.route('/login').post((req, res) => {
  console.log(req.body.email,req.body.password);
  let salt = bcrypt.genSaltSync();
  let hash = bcrypt.hashSync(req.body.password, salt);
  let isValid = bcrypt.compareSync(req.body.password, hash);

  if(isValid) {
  UserModel.find({
      email: req.body.email,
  }, function (err, user) {
      if (err) {
          res.send(err)
      }
      if (user.length === 0) {
          res.status(401).json({
              status: 401,
              message: 'Unauthorized credentials mismatch'
          })
      } else {
          res.json(user)
      }
  })
}
})

userRoutes.route('/login/:userid').get((req, res) => {
  console.log(req.params.userid);
  
  UserModel.find({ _id: req.params.userid }, function (err, user) {
      if (err) {
          res.send(err)
      }
      if (user.length === 0) {
          res.status(401).json({
              status: 401,
              message: 'Unauthorized credentials mismatch'
          })
      } else {
        var resultArray = {} 
        resultArray = []; 
        var formattedarray = user.map(function(obj,index,arr){
          var resultData = {
              id: obj._id,
              username: obj.username,
              email: obj.email,
              phone: obj.phone
            };
            resultArray.push(resultData);
        });
          res.json(resultArray)
      }
  })
})


userRoutes.route('/update').post(function (req, res) {
  console.log("updat",req.body);

  Post.findById({ _id: req.body.userid } , function(err, user) {
  if (!user)
    res.status(404).send("data is not found");
  else {
      let salt = bcrypt.genSaltSync();
      let hashpass = bcrypt.hashSync(req.body.password, salt);
      console.log("new pass", hashpass);
      user.password = hashpass;
      user.save().then(() => {
        res.json('Update complete');
    })
    .catch(() => {
          res.status(400).send("unable to update the database");
    });
  }
});
});



module.exports = userRoutes;