import React, { useState } from "react";

import "./NoPortfolio.css";
import AddTransactionModel from "./AddTransactionModel";

function NoPortfolio(props) {
  const [addTransactionPopUp, setaddTransactionPopUp] = useState(false);
  const handleClick = () => {
    setaddTransactionPopUp(true);
  };
  return (
    <>
      <div className="no-portfolio">
        <img
          className="image"
          src="https://s2.coinmarketcap.com/static/cloud/img/portfolio/no-portfolio.png?_=a137d56"
        />
         <div className="heading">
            <h1>Let’s get started with your first portfolio!</h1>
            <p>Track profits, losses and valuation all in one place.</p>
          </div>
        <div className="add-transactions" onClick={handleClick}>
          <div>
            <img
              src="https://s2.coinmarketcap.com/static/cloud/img/portfolio/manual.svg?_=a137d56"
              className="pointer"
            />
          </div>
          <div>
            <h3>Add Transactions manually</h3>
            <p>
              Enter all transaction details at your own pace to track your
              portfolio.
            </p>
          </div>
        </div>
      </div>
      <div className="add-transaction-model">
        <AddTransactionModel
          visible={addTransactionPopUp}
          closeModel={setaddTransactionPopUp}
          selectedPortfolio={props.selectedPortfolio}
        />
      </div>
    </>
  );
}

export default NoPortfolio;

export const { handleClick } = NoPortfolio;
