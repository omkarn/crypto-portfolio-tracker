import React, { useState } from "react";

import "./Sidebar.css";

import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "./features/userSlice";
import { selectCryptoData } from "./features/cryptoSlice";

import { db } from "./firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AddTransactionModel from "./AddTransactionModel";

function Sidebar(props) {
  const [addTransactionPopUp, setaddTransactionPopUp] = useState(false);
  const handleClick = () => {
    setaddTransactionPopUp(true);
  };

  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const [edit, setEdit] = useState(false);

  const deletePortfolio = async (pName) => {

    let viewingPortfolioNew;

    user.portfolios.length-1 === 0
    ? viewingPortfolioNew = ""
    : viewingPortfolioNew =(user.portfolios[0].portfolioName);

    dispatch(
      login({
        ...user,
        viewingPortfolio: viewingPortfolioNew
      })
    );

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    const oldPortfolios = userData.portfolios;

    const newPortfolios = oldPortfolios.filter(
      (portfolio) => portfolio.portfolioName !== pName
    );
    await updateDoc(docRef, {
      portfolios: newPortfolios,
    });

   

    dispatch(
      login({
        ...user,
        portfolios: newPortfolios
      })
    );

    setEdit(false)
   
  };

  return (
    <>
      <div className="sidebar">
        <div className="portfolio-header">
          <span>My Portfolios</span>
          <ModeEditOutlineOutlinedIcon
            onClick={() => setEdit(!edit)}
            style={{ color: "grey", cursor: "pointer" }}
          />
        </div>
        <div className="portfolios">
          {user.portfolios.map((portfolio) => {
            return (
              <div
                onClick={() => {
                  dispatch(
                    login({
                      ...user,
                      viewingPortfolio: portfolio
                    })
                  );
                }}
                className="portfolio"
                style={
                  user.viewingPortfolio.portfolioName === portfolio.portfolioName
                    ? { backgroundColor: "#eff2f5" }
                    : { backgroundColor: "white" }
                }
              >
                <div className="portfolio-details">
                  <p className="portfolio-name">{portfolio.portfolioName}</p>
                  <p className="portfolio-value">
                    $
                    {portfolio.transactions.length === 0
                      ? 0
                      : (portfolio.transactions.reduce((a, b) => {
                        return a + b.current_price * b.quantity;
                      }, 0)).toFixed(2)}
                  </p>
                </div>
                {edit && (
                  <DeleteForeverOutlinedIcon
                    onClick={() => deletePortfolio(portfolio.portfolioName)}
                    style={{ color: "red", cursor: "pointer" }}
                  />
                )}
              </div>
            );
          })}
        </div>
        <button onClick={handleClick} className="button">
          + Create Portfolio
        </button>
      </div>
      <div className="add-transaction-model">
        <AddTransactionModel
          visible={addTransactionPopUp}
          closeModel={setaddTransactionPopUp}
        />
      </div>
    </>
  );
}

export default Sidebar;
