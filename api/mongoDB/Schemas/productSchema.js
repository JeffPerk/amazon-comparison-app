var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var productSchema = new mongoose.Schema({
  title: String,
  owner: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
});

module.export = mongoose.model("Product", productSchema);
