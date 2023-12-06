import React, { useState } from "react";

import "./Transaction.css";
import { FormGroup } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/userSlice";
import {
  Firestore,
  arrayUnion,
  doc,
  getDoc,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "./firebase";

function Transaction(props) {
  const close = () => {
    props.closeModel(false);
  };

  const [transactionType, setTransactionType] = useState("buy");

  const [formState, setFormState] = useState({
    quantity: null,
    pricePerCoin: props.selectedCrypto?.current_price,
    date: new Date().toISOString().split("T")[0],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });

    console.log(formState);
  };

  const setTransaction = (buttonType) => {
    setTransactionType(buttonType);
  };

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const addTransaction = async (e) => {
    e.preventDefault();

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();

    let oldPortfolios = [...userData.portfolios];

    let newPortfolios = [];
    oldPortfolios.forEach((portfolio) => {
      if (props.selectedPortfolio === portfolio.portfolioName) {
        let oldTransactions = [...portfolio.transactions];
        oldTransactions.push({
          cryptoName: props.selectedCrypto.name,
          cryptoImage: props.selectedCrypto.image,
          cryptoCurrentPrice: props.selectedCrypto.current_price,
          cryptoSymbol: props.selectedCrypto.symbol,
          quantity: formState.quantity,
          buyPrice: formState.pricePerCoin,
          date: formState.date,
          priceChange24H:props.selectedCrypto.price_change_24h,
          percentageChange24H:props.selectedCrypto.price_change_percentage_24h
        })

        newPortfolios.push({
          ...portfolio,
          transactions: oldTransactions
        });
      } else {
        newPortfolios.push(portfolio);
      }
    });

    await updateDoc(docRef, {
      portfolios: newPortfolios,
    });

    const updatedData = await getDoc(docRef);

    console.log(updatedData);
    dispatch(
      login({
        ...user,
        portfolios: updatedData.data().portfolios,
      })
    );

    close();
  };

  return (
    props.visible && (
      <div className="transaction-model-background">
        <div className="transaction-model-container">
          <div className="heading">
            <h1>Add Transaction</h1>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="close-icon"
              onClick={close}
              fill="currentColor"
              height="24px"
              width="24px"
              viewBox="0 0 24 24"
              color="neutral3"
              class="sc-aef7b723-0 jhvPQd"
            >
              <path
                d="M18 6L6 18M18 18L6 6"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <div className="buy-sell-div">
            <button
              className="buy-sell-button"
              onClick={() => {
                setTransaction("buy");
              }}
              style={
                transactionType === "buy"
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "rgb(239, 242, 245)" }
              }
            >
              Buy
            </button>
            <button
              className="buy-sell-button"
              onClick={() => {
                setTransaction("sell");
              }}
              style={
                transactionType === "sell"
                  ? { backgroundColor: "white" }
                  : { backgroundColor: "rgb(239, 242, 245)" }
              }
            >
              Sell
            </button>
          </div>
          <div className="selected-crypto">
            <div className="name">
              <img
                className="top-crypto-image"
                src={props.selectedCrypto.image}
              />
              <p>
                {props.selectedCrypto.name}
                <span>{props.selectedCrypto.symbol.toUpperCase()}</span>
              </p>
            </div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              height="20"
              width="20"
              viewBox="0 0 24 24"
              class="sc-aef7b723-0 gTkjCc cmc-rtl-flip"
              color="text2"
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                stroke-width="2"
                stroke-miterlimit="10"
                stroke-linecap="round"
                stroke-linejoin="round"
              ></path>
            </svg>
          </div>
          <div className="transaction-details">
            <div>
              <p>Quantity</p>
              <input
                placeholder="0.00"
                name="quantity"
                type="number"
                required
                value={formState.quantity}
                onChange={handleChange}
              />
            </div>
            <div>
              <p>Price Per Coin</p>
              <input
                placeholder={props.selectedCrypto?.current_price}
                name="pricePerCoin"
                type="number"
                required
                value={formState.pricePerCoin}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="date">
            <input
              type="date"
              name="date"
              value={formState.date}
              onChange={handleChange}
            />
          </div>
          <div className="summary">
            <p>Total Spent</p>
            <h1>
              $
              {isNaN(formState.quantity * formState?.pricePerCoin)
                ? 0
                : (formState.quantity * formState?.pricePerCoin).toFixed(2)}
            </h1>
          </div>
          <div className="add-transaction-button-div">
            <button onClick={addTransaction} className="add-transaction-button">
              Add Transaction
            </button>
          </div>
        </div>
      </div>
    )
  );
}

export default Transaction;
