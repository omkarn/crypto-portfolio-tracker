import React, { useEffect, useState } from "react";

import "./Main.css";

import Sidebar from "./Sidebar";
import DetailsTop from "./DetailsTop";
import Stats from "./Stats";
import Assets from "./Assets";

import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import NoPortfolio from "./NoPortfolio";

import CreateTransactionModel from "./CreateTransactionModel";

function Main() {
  const user = useSelector(selectUser);


  const [createTransactionPopUp, setCreateTransactionPopUp] = useState(false);

  const handleClick = (e) => {
    setCreateTransactionPopUp(true);
  };

 

  // console.log(user.portfolios)
 

  return (
    <div className="main">
      {user.portfolios.length === 0 ? (
        <NoPortfolio
        />
      ) : (
        <>
          <Sidebar
          />
          {user.viewingPortfolio.transactions.length !== 0 ? (
            <section className="middle">
              <DetailsTop
              />
              <Stats
              />
              <Assets
              />
            </section>
          ) : (
            <>
              <section className="middle-no-transaction">
                <img
                  class="no-manual-portfolioimg"
                  src="https://s2.coinmarketcap.com/static/cloud/img/portfolio/no-manual-portfolio.png?_=6516593"
                />
                <h1>This portfolio needs some final touches…</h1>
                <p>Add a coin to get started</p>
                <div className="button-div">
                  <button onClick={handleClick}>+ Add Transaction</button>
                </div>
              </section>
              <div className="create-transaction-model">
                <CreateTransactionModel
                  visible={createTransactionPopUp}
                  closeModel={setCreateTransactionPopUp}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Main;
