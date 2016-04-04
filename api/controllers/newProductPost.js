var mongoose = require('mongoose');
var Product = require('../models/Product.js');
var User = require('../models/User.js');

module.exports = {
  // createProduct: function(req, res) {
  //   var product = new Product(req.body);
  //   var wishlistPush = User.findByIdAndUpdate(req.user, {$push: {wishlist: product._id}});
  //   Promise.all([product.save(), wishlistPush])
  //   .then(function(resp) {
  //     res.status(200).send(resp);
  //   }).catch(function(err) {
  //     res.status(500).send(err);
  //   }) ;
  // }

  createProduct: function(req, res) {
    console.log("req.body", req.body);
    var product = new Product(req.body);
    product.save(function(err, resp) {
      console.log("resp", resp);
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(resp);
      }
    });
  }
};
