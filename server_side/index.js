const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const buyerRoute = require("./routes/buyerRoutes");
const sellerRoute = require("./routes/sellerRoutes");
const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(
      `mongodb+srv://mdabdulq62:nadim123@cluster0.mjympox.mongodb.net/ordersystem?retryWrites=true&w=majority`
    );
    console.log("connected");
  } catch (error) {
    console.log(error);
  }
};

app.use("/api/buyer", buyerRoute);
app.use("/api/seller", sellerRoute);

app.listen(port, () => {
  connect();
  console.log("server is running");
});
