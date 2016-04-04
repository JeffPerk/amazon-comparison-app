var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

var schema = mongoose.Schema({
  email: { type: String, unique: true, required: true, index: true},
  username: { type: String, unique: true, required: true, index: true},
  password: { type: String, required: true},
  wishlist: [{
    type: mongoose.Schema.Types.ObjectId, ref: 'Product'
  }]
});

schema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, salt);
};

schema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', schema);
