var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cors = require('cors');
var mongoose = require('mongoose');
var q = require('q');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var User = require('./api/models/User.js');
var app = express();
///////SERVER-SIDE CONTROLLERS/////////
var amazon = require('./api/controllers/amazonCtrl.js');
var userCtrl = require('./api/controllers/userDataCtrl.js');
var secret = require('./secrets.js');

///////////////////////////////
//CONNECTING TO THE DATABASE//
/////////////////////////////
mongoose.connect('mongodb://localhost/compare');
mongoose.connection.once('open', function() {
  console.log("Connected to MongoDB");
});
//////////LOGIN AUTH///////////
passport.use('local-login', new LocalStrategy({
    usernameField: 'email'
  },
  function(email, password, cb) {
    User.findOne({
      'email' : email
    }, function(err, user) {
      if (err) {
        return cb(err);
      }
      if (!user) {
        return cb(null, false);
      }
      if (!user.validatePassword(password)) {
        console.log("cb5", cb);
        return cb(null, false);
      }
      return cb(null, user);
    });
  }));

//////////SIGNUP AUTH//////////
passport.use('local-signup', new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, function(req, email, password, done) {
  User.findOne({
    'email': email
  }, function(err, user) {
    if (err) return done(err);
    if (user) return done(null, false);
    else {
      var newUser = new User(req.body);
      newUser.password = newUser.generateHash(req.body.password);
      newUser.save(function(err, response) {
        if (err) return done(null, err);
        else return done(null, response);
      });
    }
  });
}));

passport.serializeUser(function(user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function(id, cb) {
  User.findById(id, function(err, user) {
    if (err) {
      return cb(err);
    }
    cb(null, user);
  });
});

//////////MIDDLEWARE//////////
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.use(cors());
app.use(session({
  secret: secret.sessionSecret,
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.post('/login', passport.authenticate('local-login', {failureRedirect: '/login'}), function(req, res) {
  console.log('Logged in');
  res.status(200).send({msg: 'okay!'});
});

app.post('/signup', passport.authenticate('local-signup', {failureRedirect: '/login'}), function(req, res) {
    res.status(200).json(req.body);
});

app.get('/logout', userCtrl.loggedOut);

app.get('/api/compare', userCtrl.loggedIn, amazon.getProducts);
app.get('/users', userCtrl.currentUser);

//port
app.listen('9000', function() {
  console.log('Listening to port 9000');
});
