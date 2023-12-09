import React from "react";

import "./Stats.css";

function Stats(props) {
  const allTimeProfit = (
    props.viewingPortfolio.transactions.reduce((a, b) => {
      return a + b.current_price * b.quantity;
    }, 0) -
    props.viewingPortfolio.transactions.reduce((a, b) => {
      return a + b.buyPrice * b.quantity;
    }, 0)
  ).toFixed(2);

  const allTimeProfitPercentage = (
    (allTimeProfit /
      props.viewingPortfolio.transactions.reduce((a, b) => {
        return a + b.buyPrice * b.quantity;
      }, 0)) *
    100
  ).toFixed(2);

  const getPerformers = () => {
    let bestPerformer;
    let max = 0;

    let worstPerformer;
    let min = Number.MAX_VALUE;
    props.viewingPortfolio.transactions.forEach((transaction) => {
      if (
        max <
        (transaction.current_price * transaction.quantity -
          transaction.buyPrice * transaction.quantity)
      ) {
        bestPerformer = transaction;
        max = (transaction.current_price * transaction.quantity -
          transaction.buyPrice * transaction.quantity)
      }

      if (
        min >
        (transaction.current_price * transaction.quantity -
          transaction.buyPrice * transaction.quantity)
      ) {
        worstPerformer = transaction;
        min = (transaction.current_price * transaction.quantity -
          transaction.buyPrice * transaction.quantity)
      }
    });

    return {
      bestPerformer: {
        name: bestPerformer.name,
        image: bestPerformer.image,
        symbol: bestPerformer.symbol,
        change: ((bestPerformer.current_price - bestPerformer.buyPrice) * bestPerformer.quantity).toFixed(2),
        changePercentage: (((bestPerformer.current_price - bestPerformer.buyPrice)) / bestPerformer.buyPrice * 100).toFixed(2)
      },
      worstPerformer:
      {
        name: worstPerformer.name,
        image: worstPerformer.image,
        symbol: worstPerformer.symbol,
        change: ((worstPerformer.current_price - worstPerformer.buyPrice) * worstPerformer.quantity).toFixed(2),
        changePercentage: (((worstPerformer.current_price - worstPerformer.buyPrice)) / worstPerformer.buyPrice * 100).toFixed(2)
      },
    };
  };

  return (
    <div className="stats">
      <div style={allTimeProfit < 0 ? { color: "#EA3943" } : { color: "#16C784" }}>
        <p className="title" style={{ fontSize: "14px", fontWeight: "600" }}>All-time profit</p>
        <p className="change" style={{ marginTop: "8px", marginBottom: "8px", fontWeight: 600, fontSize: "20px" }}>
          {allTimeProfit > 0 ? `+` : ``} $
          {allTimeProfit}
        </p>
        <p className="change" style={{ paddingLeft: "5px" }}>
          ({allTimeProfitPercentage}%)
        </p>
      </div>
      <div style={getPerformers().bestPerformer.change < 0 ? { color: "#EA3943" } : { color: "#16C784" }}>
        <p className="title" style={{ fontSize: "14px", fontWeight: "600" }}>
          Best Performer
        </p>
        <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
          <img src={getPerformers().bestPerformer.image} style={{ width: "25px" }} />
          <p style={{ paddingLeft: "8px", fontWeight: 700, fontSize: "20px" }}>{(getPerformers().bestPerformer.symbol).toUpperCase()}</p>
        </div>
        <p className="change">{getPerformers().bestPerformer.change > 0 ? `+` : ``} ${getPerformers().bestPerformer.change}{"   "}({getPerformers().bestPerformer.changePercentage}%)</p>
      </div>
      <div style={getPerformers().worstPerformer.change < 0 ? { color: "#EA3943" } : { color: "#16C784" }}>
        <p className="title" style={{ fontSize: "14px", fontWeight: "600" }}>
          Worst Performer
        </p>
        <div style={{ display: "flex", marginTop: "8px", marginBottom: "8px" }}>
          <img src={getPerformers().worstPerformer.image} style={{ width: "25px" }} />
          <p style={{ paddingLeft: "8px", fontWeight: 700, fontSize: "20px" }}>{(getPerformers().worstPerformer.symbol).toUpperCase()}</p>
        </div>
        <p className="change">{getPerformers().worstPerformer.change > 0 ? `+` : ``} ${getPerformers().worstPerformer.change}{"   "}({getPerformers().worstPerformer.changePercentage}%)</p>
      </div>
    </div>
  );
}

export default Stats;
