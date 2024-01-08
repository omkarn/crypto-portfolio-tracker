import React, { useState } from "react";

import "../styles/DetailsTop.css";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

import { selectUser } from "../features/userSlice";

import { useSelector } from "react-redux";

import CreateTransactionModel from "./CreateTransactionModel";
import { Switch, Tooltip } from "@mui/material";

function DetailsTop(props) {
  const [createTransactionPopUp, setCreateTransactionPopUp] = useState(false);

  const handleClick = (e) => {
    setCreateTransactionPopUp(true);
  };

  const user = useSelector(selectUser);

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
          {user.viewingPortfolio.portfolioName}
        </p>
        <h1 className="details-top-h1">
          $
          {user.viewingPortfolio.transactions
            .reduce((a, b) => {
              return a + b.current_price * b.quantity;
            }, 0)
            .toFixed(2)}
        </h1>
        <p>
          <span
            className="span-one"
            style={
              user.viewingPortfolio.transactions
                .reduce((a, b) => {
                  return a + b.price_change_24h * b.quantity;
                }, 0)
                .toFixed(2) > 0
                ? { color: "rgb(22, 199, 132)", fontWeight: "700" }
                : { color: "#EA3943", fontWeight: "700" }
            }
          >
            +{" "}
            {user.viewingPortfolio.transactions
              .reduce((a, b) => {
                return a + b.price_change_24h * b.quantity;
              }, 0)
              .toFixed(2)}
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
        <div className="switch">
          <p>Show chart</p>
          <Switch onClick={()=>{props.setPieChartToggle(!props.pieChartToggle)}} />
        </div>
        <div className="button-div">
          <button onClick={handleClick}>+ Add Transaction</button>
        </div>
        <div className="create-transaction-model">
          <CreateTransactionModel
            visible={createTransactionPopUp}
            closeModel={setCreateTransactionPopUp}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailsTop;
