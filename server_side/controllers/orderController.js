const { orderModel } = require("../models/order.model");

async function postOrders(req, res) {
  try {
    let data = new orderModel(req.body);
    await data.save();
    res.json(await orderModel.find());
  } catch (error) {
    res.send(error);
  }
}

async function postCompletedOrders(req, res) {
  try {
    let data = new orderModel(req.body);
    await data.save();
    res.json("Posted");
  } catch (error) {
    res.send(error);
  }
}

async function getBuyOrders(req, res) {
  try {
    res.json(await orderModel.find({ type: "buyer" }));
  } catch (error) {
    res.send(error);
  }
}

async function getSellOrders(req, res) {
  try {
    res.json(await orderModel.find({ type: "seller" }));
  } catch (error) {
    res.send(error);
  }
}

async function getCompletedOrder(req, res) {
  try {
    res.json(await orderModel.find({ status: "completed" }));
  } catch (error) {
    res.send(error);
  }
}

async function deleteBuyOrders(req, res) {
  const { id } = req.params;
  try {
    await orderModel.findByIdAndDelete({ _id: id });
    res.status(201).send("Updated Successfully");
  } catch (error) {
    res.send(error);
  }
}

async function deleteSellOrders(req, res) {
  const { id } = req.params;
  try {
    await orderModel.findByIdAndDelete({ _id: id });
    res.status(201).send("Updated Successfully");
  } catch (error) {
    res.send(error);
  }
}

async function updateAll(req, res) {
  const updatedData = req.body;
  try {
    const removeOps = updatedData
      .filter(({ quantity }) => quantity === 0)
      .map(({ _id }) => ({
        deleteOne: {
          filter: { _id: _id },
        },
      }));

    const updateOps = updatedData.map(({ _id, quantity }) => ({
      updateOne: {
        filter: { _id: _id },
        update: {
          $set: { quantity: quantity },
        },
      },
    }));

    let updated = await orderModel.bulkWrite([...updateOps, ...removeOps]);
    res.json(updated);
  } catch (error) {
    res.send(error.message);
  }
}

const getAllOrders = async (req, res) => {
  try {
    res.json(await orderModel.find());
  } catch (error) {
    res.send(error.message);
  }
};

module.exports = {
  postOrders,
  getSellOrders,
  getBuyOrders,
  deleteBuyOrders,
  deleteSellOrders,
  getCompletedOrder,
  updateAll,
  postCompletedOrders,
  getAllOrders,
};
