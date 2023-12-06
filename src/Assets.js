import React from "react";

import "./Assets.css";

function Assets(props) {
  return (
    <div className="assets">
      <h2>Assets</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>1h%</th>
            <th>24h%</th>
            <th>7d%</th>
            <th>Holdings</th>
            <th>Avg. Buy Price</th>
            <th>Profit/Loss</th>
          </tr>
        </thead>
        <tbody>
          {props.viewingPortfolio.transactions.map((transcation) => {
            return (
              <tr>
                <td>{transcation.cryptoName}</td>
                <td>${transcation.cryptoCurrentPrice}</td>
                <td>{(transcation.percentageChange24H/24).toFixed(2)}%</td>
                <td>{(transcation.percentageChange24H).toFixed(2)}%</td>
                <td>{(transcation.percentageChange24H*7).toFixed(2)}%</td>
                <td>
                  <p>$28,304.78</p>
                  <p>{transcation.quantity} {transcation.cryptoSymbol.toUpperCase()}</p>
                </td>
                <td>${transcation.buyPrice}</td>
                <td>
                  <p>{((transcation.cryptoCurrentPrice-transcation.buyPrice)*transcation.quantity) > 0 ? `+` : ``}{((transcation.cryptoCurrentPrice-transcation.buyPrice)*transcation.quantity).toFixed(2)}</p>
                  <p>{(((transcation.cryptoCurrentPrice-transcation.buyPrice)*transcation.quantity)/(transcation.buyPrice*transcation.quantity)*100).toFixed(2)}%</p>
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
