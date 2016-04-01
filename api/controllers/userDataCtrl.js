var mongoose = require('mongoose');
var User = require('../models/User.js');

module.exports = {
  create: function(req, res, next) {
    var user = new User(req.body);
    user.save(function(err, response) {
      if (err) res.status(500).json(err);
      else return res.status(200).json(response);
    });
  },

  loggedIn: function(req, res, next) {
    if (req.user) {
      console.log(req.user);
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
    console.log("User Logged Out");
    res.redirect('/login');
  },

  currentUser: function(req, res, next) {
    console.log(req.user);
    if (!req.user) {
      res.send('error');
    } else {
      res.status(200).send(req.user);
    }
  }
};
