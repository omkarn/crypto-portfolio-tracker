import React from "react";

import "./DetailsTop.css";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function DetailsTop() {
  return (
    <div className="details-top">
      <div className="details-top-left">
        <p
          style={{
            color: "rgb(88, 102, 126)",
            fontWeight: "400",
            fontSize: "14px",
          }}
        >
          Current Balance
        </p>
        <h1 className="details-top-h1">$28,259.86</h1>
        <p>
          <span
            className="span-one"
            style={{ color: "rgb(22, 199, 132)", fontWeight: "600" }}
          >
            + $28,259.86
          </span>{" "}
          <span
            className="span-two"
            style={{
              backgroundColor: "#eff2f5",
              borderRadius: "4px",
              fontSize: "14px",
              color: "#58667e",
              padding: "2px",
              fontWeight: "400",
            }}
          >
            24h
          </span>
        </p>
      </div>
      <div className="details-top-right">
        <button className="details-top-button edit">
          <ModeEditOutlineOutlinedIcon
            style={{ color: "grey", fontSize: "large", paddingRight: "5px" }}
          />{" "}
          <span> Edit</span>
        </button>
        <button className="details-top-button add">
          <AddOutlinedIcon style={{ fontSize: "large", paddingRight: "5px" }} />{" "}
          <span>Add Transaction</span>
        </button>
      </div>
    </div>
  );
}

export default DetailsTop;
