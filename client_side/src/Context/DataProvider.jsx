import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

export const DataContext = createContext();

function DataProvider({ children }) {
  const [buyers, setBuyers] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [completedTransactions, setCompletedTransactions] = useState([]);

  const fetchData = async (url, setData) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const refreshAllData = () => {
    fetchData("http://localhost:8000/api/buyer/", setBuyers);
    fetchData("http://localhost:8000/api/seller/", setSellers);
  };

  const loadCompletedTransactions = () => {
    const storedData = localStorage.getItem("completedTransactions");
    if (storedData) {
      setCompletedTransactions(JSON.parse(storedData));
    }
  };

  const saveCompletedTransactions = (transactions) => {
    localStorage.setItem("completedTransactions", JSON.stringify(transactions));
  };

  useEffect(() => {
    refreshAllData();
    loadCompletedTransactions();
  }, []);

  const addBuyer = async (buyerData) => {
    try {
      const response = await fetch("http://localhost:8000/api/buyer/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(buyerData),
      });

      const result = await response.json();

      if (result.matchedTransaction) {
        const updatedTransactions = [
          ...completedTransactions,
          result.matchedTransaction,
        ];
        setCompletedTransactions(updatedTransactions);
        saveCompletedTransactions(updatedTransactions); 
      }

      refreshAllData();
    } catch (error) {
      console.error("Failed to add buyer:", error);
    }
  };

  const addSeller = async (sellerData) => {
    try {
      const response = await fetch("http://localhost:8000/api/seller/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sellerData),
      });

      const result = await response.json();

      if (result.matchedTransaction) {
        const updatedTransactions = [
          ...completedTransactions,
          result.matchedTransaction,
        ];
        setCompletedTransactions(updatedTransactions);
        saveCompletedTransactions(updatedTransactions); 
      }

      refreshAllData();
    } catch (error) {
      console.error("Failed to add seller:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{ buyers, sellers, completedTransactions, addBuyer, addSeller }}
    >
      {children}
    </DataContext.Provider>
  );
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DataProvider;
