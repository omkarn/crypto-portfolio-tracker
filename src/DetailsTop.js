import React, { useState } from "react";

import "./DetailsTop.css";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import CreateTransactionModel from "./CreateTransactionModel";

function DetailsTop(props) {
  const [createTransactionPopUp, setCreateTransactionPopUp] = useState(false);

  const handleClick = (e) => {
    setCreateTransactionPopUp(true);
  };

  return (
    <div className="details-top">
      <div className="details-top-left">
        <p
          style={{
            color: "#616E85",
            fontWeight: "600",
            fontSize: "16px",
          }}
        >
          {props.viewingPortfolio.portfolioName}
        </p>
        <h1 className="details-top-h1">
          $
          {props.viewingPortfolio.transactions
            .reduce((a, b) => {
              return a + b.cryptoCurrentPrice * b.quantity;
            }, 0)
            .toFixed(2)}
        </h1>
        <p>
          <span
            className="span-one"
            style={
              (
              props.viewingPortfolio.transactions.reduce((a, b) => {
                return a + b.cryptoCurrentPrice * b.quantity;
              }, 0) -
              props.viewingPortfolio.transactions.reduce((a, b) => {
                return a + b.priceChange24H * b.quantity;
              }, 0)
            ).toFixed(2) > 0 ? 
              { color: "rgb(22, 199, 132)", fontWeight: "700" } : { color: "#EA3943", fontWeight: "700" }}
          >
            +{" "}
            {(
              props.viewingPortfolio.transactions.reduce((a, b) => {
                return a + b.cryptoCurrentPrice * b.quantity;
              }, 0) -
              props.viewingPortfolio.transactions.reduce((a, b) => {
                return a + b.priceChange24H * b.quantity;
              }, 0)
            ).toFixed(2)}
          </span>{" "}
          <span
            className="span-two"
            style={{
              backgroundColor: "#eff2f5",
              borderRadius: "4px",
              fontSize: "14px",
              color: "#58667e",
              padding: "2px",
              fontWeight: "500",
            }}
          >
            24h
          </span>
        </p>
      </div>
      <div className="details-top-right">
        <div className="button-div">
          <button onClick={handleClick}>+ Add Transaction</button>
        </div>
        <div className="create-transaction-model">
          <CreateTransactionModel
            visible={createTransactionPopUp}
            closeModel={setCreateTransactionPopUp}
            selectedPortfolio={props.selectedPortfolio}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsTop;
