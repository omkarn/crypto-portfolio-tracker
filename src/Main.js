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
import PieChartDiv from "./PieChartDiv";
import { CircularProgress } from "@mui/material";

function Main() {
  const [loading, setLoading] = useState(true);
  setTimeout(() => {
    setLoading(false);
  }, "1000");
  const user = useSelector(selectUser);

  const [createTransactionPopUp, setCreateTransactionPopUp] = useState(false);

  const [pieChartToggle, setPieChartToggle] = useState(false);

  const handleClick = (e) => {
    setCreateTransactionPopUp(true);
  };

  const [setDelete, setSetDelete] = useState(false);

  // console.log(user.portfolios)

  const toggleDelete = (e) => {
    console.log(e.target.getAttribute("name"));
    const name = e.target.getAttribute("name");
    name === "delete" ? setSetDelete(true) : setSetDelete(false);
  };

  return (
    <>
      {loading === true ? (
        <div className="loader">
          <CircularProgress />
        </div>
      ) : (
        <div className="main" onClick={toggleDelete}>
          {user.portfolios.length === 0 ? (
            <NoPortfolio />
          ) : (
            <>
              <Sidebar />
              {user.viewingPortfolio.transactions.length !== 0 ? (
                <section className="middle">
                  <DetailsTop
                    pieChartToggle={pieChartToggle}
                    setPieChartToggle={setPieChartToggle}
                  />
                  <PieChartDiv pieChartToggle={pieChartToggle} />
                  <Stats />
                  <Assets
                    setDelete={setDelete}
                    setSetDelete={setSetDelete}
                    toggleDelete={toggleDelete}
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
      )}
    </>
  );
}

export default Main;
