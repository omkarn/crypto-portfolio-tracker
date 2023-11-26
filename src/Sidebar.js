import React from "react";

import "./Sidebar.css";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="portfolio-header">
        <span>My Portfolios</span>
        <ModeEditOutlineOutlinedIcon style={{ color: "grey", cursor:'pointer' }} />
      </div>
      <div className="portfolios">
        <div className="portfolio">
          <div className="portfolio-details">
            <p className="portfolio-name">Portfolio 1</p>
            <p className="portfolio-value">$28,472.18</p>
          </div>
          {true && <DeleteForeverOutlinedIcon style={{ color: "red", cursor:'pointer' }} />}
        </div>
      </div>
      <button className="button">
        <AddOutlinedIcon /> 
        <span>Create Portfolio</span>
      </button>
    </div>
  );
}

export default Sidebar;
