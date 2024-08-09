const mongoose = require('mongoose')

const BuyerSchema = mongoose.Schema({
    buyerQty: Number,
    buyerPrice: Number
})

const BuyerModel = mongoose.model('buyer', BuyerSchema);

module.exports = BuyerModel;