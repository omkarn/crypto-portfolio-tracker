import React, { useState } from "react";

import "../styles/Assets.css";

import Transaction from "./Transaction";

import AddIcon from "@mui/icons-material/Add";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";

import { login, selectUser } from "../features/userSlice";
import { useDispatch, useSelector } from "react-redux";

import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Tooltip } from "@mui/material";

function Assets(props) {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  const [transactionVisible, setTransactionVisible] = useState(false);
  const [passTransaction, setPassTransaction] = useState({});
  const [deleteVisible, setDeleteVisible] = useState(false);

  const handleClick = (crypto) => {
    setTransactionVisible(true);
    setPassTransaction(crypto);
  };

  const deleteTransaction = async (transactionName) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    const oldPortfolios = userData.portfolios;
    let newPortfolios = [];

    oldPortfolios.forEach((portfolio) => {
      if (portfolio.portfolioName === user.viewingPortfolio.portfolioName) {
        let oldTransactions = portfolio.transactions;
        let newTransactions = [];

        oldTransactions.forEach((transaction) => {
          if (transaction.name !== transactionName) {
            newTransactions.push(transaction);
          }
        });

        newPortfolios.push({
          ...portfolio,
          transactions: newTransactions,
        });
      } else {
        newPortfolios.push(portfolio);
      }
    });

    let newViewingPortfolio;
    newPortfolios.forEach((portfolio) => {
      if (portfolio.portfolioName === user.viewingPortfolio.portfolioName)
        newViewingPortfolio = portfolio;
    });

    console.log(user.viewingPortfolio);

    dispatch(
      login({
        ...user,
        portfolios: newPortfolios,
        viewingPortfolio: newViewingPortfolio,
      })
    );

    await updateDoc(docRef, {
      portfolios: newPortfolios,
    });

    setDeleteVisible(false);
  };

  return (
    <div className="assets">
      <h2>Assets</h2>
      <table>
        <thead>
          <tr className="th">
            <th>Name</th>
            <th>Price</th>
            <th className="skipped">1h%</th>
            <th className="skipped">24h%</th>
            <th className="skipped">7d%</th>
            <th className="skipped">Holdings</th>
            <th className="skipped">Avg. Buy Price</th>
            <th>Profit/Loss</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {user.viewingPortfolio.transactions.map((transcation) => {
            return (
              <tr className="tr">
                <td className="name">
                  <img src={transcation.image} />
                  <p style={{ padding: "0 8px" }}>{transcation.name}</p>
                  <p
                    className="skipped"
                    style={{ color: "rgb(128, 138, 157)", fontWeight: 500 }}
                  >
                    {transcation.symbol.toUpperCase()}
                  </p>
                </td>
                <td>${Intl.NumberFormat().format(transcation.current_price)}</td>
                <td
                  className="skipped"
                  style={
                    transcation.price_change_percentage_24h < 0
                      ? { color: "#ea3943" }
                      : { color: "#16c784" }
                  }
                >
                  {(transcation.price_change_percentage_24h / 24).toFixed(2)}%
                </td>
                <td
                  className="skipped"
                  style={
                    transcation.price_change_percentage_24h < 0
                      ? { color: "#ea3943" }
                      : { color: "#16c784" }
                  }
                >
                  {transcation.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td
                  className="skipped"
                  style={
                    transcation.price_change_percentage_24h < 0
                      ? { color: "#ea3943" }
                      : { color: "#16c784" }
                  }
                >
                  {(transcation.price_change_percentage_24h * 7).toFixed(2)}%
                </td>
                <td className="skipped">
                  <p>
                    $
                    {Intl.NumberFormat().format((transcation.quantity * transcation.current_price).toFixed(
                      2
                    ))}
                  </p>
                  <p className="small">
                    {Intl.NumberFormat().format(transcation.quantity)} {transcation.symbol.toUpperCase()}
                  </p>
                </td>
                <td className="skipped">${Intl.NumberFormat().format(parseFloat(transcation.buyPrice).toFixed(2))}</td>
                <td>
                  <p>
                    {transcation.current_price - transcation.buyPrice > 0
                      ? `+`
                      : ``}
                    {Intl.NumberFormat().format((
                      (transcation.current_price - transcation.buyPrice) *
                      transcation.quantity
                    ).toFixed(2))}
                  </p>
                  <p
                    className="small"
                    style={
                      transcation.current_price - transcation.buyPrice < 0
                        ? { color: "#ea3943" }
                        : { color: "#16c784" }
                    }
                  >
                    {(
                      (((transcation.current_price - transcation.buyPrice) *
                        transcation.quantity) /
                        (transcation.buyPrice * transcation.quantity)) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                </td>
                <td className="actions">
                  <Tooltip title="Add Transaction">
                    <AddIcon
                      onClick={() => {
                        handleClick(transcation);
                      }}
                      style={{
                        color: "grey",
                        cursor: "pointer",
                        fontSize: "27px",
                        background: "none",
                      }}
                      className="add-plus"
                    />
                  </Tooltip>
                  <div className="transaction-model">
                    <Transaction
                      visible={transactionVisible}
                      closeModel={setTransactionVisible}
                      selectedCrypto={passTransaction}
                    />
                  </div>
                  {!props.setDelete && (
                    <Tooltip title="More">
                      <MoreHorizIcon
                        onClick={props.toggleDelete}
                        style={{
                          color: "grey",
                          cursor: "pointer",
                          fontSize: "27px",
                        }}
                        name="delete"
                        className="more"
                      />
                    </Tooltip>
                  )}
                  {props.setDelete && (
                    <Tooltip title="Delete">
                      <DeleteForeverOutlinedIcon
                        onClick={() => deleteTransaction(transcation.name)}
                        style={{ color: "red", cursor: "pointer" }}
                      />
                    </Tooltip>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Assets;
