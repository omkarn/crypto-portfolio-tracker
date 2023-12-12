import React, { useState } from "react";

import "./Assets.css";

import Transaction from "./Transaction";

import AddIcon from '@mui/icons-material/Add';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";

function Assets(props) {

   
  const user = useSelector(selectUser);


  const [transactionVisible, setTransactionVisible] = useState(false);
  const [passTransaction, setPassTransaction] = useState({});

  const handleClick = (crypto) => {
    setTransactionVisible(true);
    setPassTransaction(crypto);
  }

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
                  <p className="skipped" style={{ color: "rgb(128, 138, 157)", fontWeight: 500 }}>{transcation.symbol.toUpperCase()}</p>
                </td>
                <td>${transcation.current_price}</td>
                <td className="skipped" style={transcation.price_change_percentage_24h < 0 ? { color: "#ea3943" } : { color: "#16c784" }}>{(transcation.price_change_percentage_24h / 24).toFixed(2)}%</td>
                <td className="skipped" style={transcation.price_change_percentage_24h < 0 ? { color: "#ea3943" } : { color: "#16c784" }}>{transcation.price_change_percentage_24h.toFixed(2)}%</td>
                <td className="skipped" style={transcation.price_change_percentage_24h < 0 ? { color: "#ea3943" } : { color: "#16c784" }}>{(transcation.price_change_percentage_24h * 7).toFixed(2)}%</td>
                <td className="skipped">
                  <p>${(transcation.quantity * transcation.current_price).toFixed(2)}</p>
                  <p className="small">
                    {transcation.quantity}{" "}
                    {transcation.symbol.toUpperCase()}
                  </p>
                </td>
                <td className="skipped">${transcation.buyPrice}</td>
                <td>
                  <p>
                    {(transcation.current_price - transcation.buyPrice) >
                      0
                      ? `+`
                      : ``}
                    {(
                      (transcation.current_price - transcation.buyPrice) *
                      transcation.quantity
                    ).toFixed(2)}
                  </p>
                  <p className="small" style={transcation.current_price - transcation.buyPrice < 0 ? { color: "#ea3943" } : { color: "#16c784" }}>
                    {(
                      (((transcation.current_price -
                        transcation.buyPrice) *
                        transcation.quantity) /
                        (transcation.buyPrice * transcation.quantity)) *
                      100
                    ).toFixed(2)}
                    %
                  </p>
                </td>
                <td className="actions">
                  <AddIcon onClick={() => { handleClick(transcation) }} style={{ color: "grey", cursor: "pointer", fontSize: "27px", background: "none" }} className="add-plus" />
                  <div className="transaction-model">
                    <Transaction
                      visible={transactionVisible}
                      closeModel={setTransactionVisible}
                      selectedCrypto={passTransaction}
                    />
                  </div>
                  <MoreHorizIcon style={{ color: "grey", cursor: "pointer", fontSize: "27px"}} className="more" />
                </td>
              </tr>
            );

          })}
        </tbody>
      </table>
    </div >
  );
}

export default Assets;
