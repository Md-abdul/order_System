const { Router } = require("express");
const buyerRoute = Router();
const BuyerModel = require("../models/buyer.model");
const sellerModel = require("../models/seller.model");

buyerRoute.post("/post", async (req, res) => {
  try {
    const newBuyer = new BuyerModel(req.body);
    const sellers = await sellerModel.find({
      sellerQty: newBuyer.buyerQty,
      sellerPrice: newBuyer.buyerPrice,
    });

    if (sellers.length > 0) {
      await newBuyer.save();
      const matchedSeller = sellers[0];
      await sellerModel.findByIdAndDelete(matchedSeller._id);
      await BuyerModel.findByIdAndDelete(newBuyer._id);

      res.status(200).json({
        msg: "Matched Transaction Completed",
        matchedTransaction: { seller: matchedSeller, buyer: newBuyer },
      });
    } else {
      await newBuyer.save();
      res.status(200).json({ msg: "Buyer Data Added" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


buyerRoute.get("/", async (req, res) => {
  try {
    const data = await BuyerModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = buyerRoute;
