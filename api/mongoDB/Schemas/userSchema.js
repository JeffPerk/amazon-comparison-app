var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  email: {type:String, required:true, lowercase:true, unique:true, index:true},
  password: {type:String, required:true, match:"/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/"},
});

module.exports = mongoose.model("User", UserSchema);
