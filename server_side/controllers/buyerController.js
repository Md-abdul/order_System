const { orderModel } = require("../models/order.model");

// Post route for adding buyer data to the database
async function postBuyerOrders(req, res) {
  try {
    let data = new orderModel(req.body);
    await data.save();
    res.json(await orderModel.find({ type: "buyer" }));
  } catch (error) {
    res.send(error);
  }
}

// Get route for sending buyer orders to the frontend
async function getBuyOrders(req, res) {
  try {
    res.json(await orderModel.find({ type: "buyer" }));
  } catch (error) {
    res.send(error);
  }
}

// Delete route for buyer order
async function deleteBuyOrders(req, res) {
  const { id } = req.params;
  try {
    await orderModel.findByIdAndDelete({ _id: id });
    res.status(201).send("Deleted Successfully");
  } catch (error) {
    res.send(error);
  }
}

module.exports = { postBuyerOrders, getBuyOrders, deleteBuyOrders };
