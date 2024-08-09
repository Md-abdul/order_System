const mongoose = require("mongoose");

const sellerSchema = mongoose.Schema({
  sellerQty: Number,
  sellerPrice: Number,
});

const sellerModel = mongoose.model("seller", sellerSchema);

module.exports = sellerModel;
