// import React from 'react'
import { Route, Routes } from "react-router-dom";
import BuyerForm from "../Pages/BuyerForm";
import SellerForm from "../Pages/SellerForm";
import Home from "../Pages/Home";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/buyerform" element={<BuyerForm />} />
        <Route path="/sellerform" element={<SellerForm />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
