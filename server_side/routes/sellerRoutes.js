const { Router } = require("express");
const sellerRoute = Router();
const sellerModel = require("../models/seller.model");
const BuyerModel = require("../models/buyer.model");


sellerRoute.post("/post", async (req, res) => {
  try {
    const newSeller = new sellerModel(req.body);
    const buyers = await BuyerModel.find({
      buyerQty: newSeller.sellerQty,
      buyerPrice: newSeller.sellerPrice,
    });

    if (buyers.length > 0) {
      await newSeller.save();
      const matchedBuyer = buyers[0];
      await BuyerModel.findByIdAndDelete(matchedBuyer._id);
      await sellerModel.findByIdAndDelete(newSeller._id);

      res.status(200).json({
        msg: "Matched Transaction Completed",
        matchedTransaction: { seller: newSeller, buyer: matchedBuyer },
      });
    } else {
      await newSeller.save();
      res.status(200).json({ msg: "Seller Data Added" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

sellerRoute.get("/", async (req, res) => {
  try {
    const data = await sellerModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = sellerRoute;
