var mongoose = require('mongoose');
var User = require('../models/User.js');

module.exports = {
  create: function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, response) {
      if (err) res.status(500).send(err);
      else return res.status(200).send(response);
    });
  },

  loggedIn: function(req, res, next) {
    if (req.user) {
      next();
    } else {
      res.send({
        redirect: 'login'
      });
    }
  },

  loggedOut: function(req, res, next) {
    req.logout();
    req.session.destroy();
    res.redirect('/login');
  },

  currentUser: function(req, res, next) {
    if (req.user) {
      res.status(200).send(req.user);
    }
  },

  getWishlist: function(req, res, next) {
    User.findById(req.user).populate("wishlist").exec(function(err, resp) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(resp);
      }
    });
  },

  updateUser: function(req, res) {
    User.findByIdAndUpdate(req.user, {$push: {wishlist: req.body.wishlist}}, function(err, resp) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(resp);
      }
    });
  },

  deleteProduct: function(req, res) {
    var id = req.params.item;
    User.findByIdAndUpdate(req.user, {$pull: {wishlist: id}}, function(err, resp) {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send(resp);
      }
    });
  }

  // updateUser: function(req, res, next) {
  //   User.findById(req.user, function(err, user) {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       user.wishlist.push(req.body.wishlist);
  //       user.save(function(err, resp) {
  //         if (err) {
  //           res.status(500).send(err);
  //         } else {
  //           res.send(resp);
  //         }
  //       });
  //     }
  //   });
  // },

  // deleteProduct: function(req, res, next) {
  //   var id = req.params.item;
  //   User.findById(req.user, function(err, user) {
  //     if (err) {
  //       res.status(500).send(err);
  //     } else {
  //       var idx = user.wishlist.indexOf(id);
  //       user.wishlist.splice(idx, 1);
  //       user.save(function(err, resp) {
  //         if (err) {
  //           res.status(500).send(err);
  //         } else {
  //           res.status(200).send(resp);
  //         }
  //       }
  //     )}
  //   });
  // }
};
