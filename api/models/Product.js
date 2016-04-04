var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productSchema = new Schema({
  title: {type: String, unique: true, required: true, index: true},
  brand: {type: String},
  largeImage: {type: String},
  thumbImage: {type: String},
  description: {type: String},
  listPrice: {type: Number},
  newPrice: {type: Number},
  usedPrice: {type: Number},
  salesRank: {type: Number, required: true},
  productLink: {type: String, required: true}
});

module.exports = mongoose.model("Product", productSchema);
