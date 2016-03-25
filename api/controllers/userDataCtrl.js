var mongoose = require('mongoose');
var User = require("../mongoDB/Schemas/userSchema.js");
var Product = require("../mongoDB/Schemas/productSchema.js");

module.exports = {
  addUser: function(req, res) {
    new User(req.body).save(function(err, data) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(data);
      }
    });
  }
};
