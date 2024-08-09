const { orderModel } = require("../models/order.model");

// Post route for adding seller data to the database
async function postSellerOrders(req, res) {
  try {
    let data = new orderModel(req.body);
    await data.save();
    res.json(await orderModel.find({ type: "seller" }));
  } catch (error) {
    res.send(error);
  }
}

// Get route for sending seller orders to the frontend
async function getSellOrders(req, res) {
  try {
    res.json(await orderModel.find({ type: "seller" }));
  } catch (error) {
    res.send(error);
  }
}

// Delete route for seller order
async function deleteSellOrders(req, res) {
  const { id } = req.params;
  try {
    await orderModel.findByIdAndDelete({ _id: id });
    res.status(201).send("Deleted Successfully");
  } catch (error) {
    res.send(error);
  }
}

module.exports = { postSellerOrders, getSellOrders, deleteSellOrders };
