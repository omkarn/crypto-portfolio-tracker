import React from "react";

import "./Stats.css";

function Stats(props) {
  const allTimeProfit = (
    props.viewingPortfolio.transactions.reduce((a, b) => {
      return a + b.cryptoCurrentPrice * b.quantity;
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
        (transaction.cryptoCurrentPrice * transaction.quantity -
          transaction.buyPrice * transaction.quantity)
      ) {
        bestPerformer = transaction;
        max=(transaction.cryptoCurrentPrice * transaction.quantity -
          transaction.buyPrice * transaction.quantity)
      }

      if (
        min >
        (transaction.cryptoCurrentPrice * transaction.quantity -
          transaction.buyPrice * transaction.quantity)
      ) {
        worstPerformer = transaction;
        min=(transaction.cryptoCurrentPrice * transaction.quantity -
          transaction.buyPrice * transaction.quantity)
      }
    });

    return {
      bestPerformer: {
        name : bestPerformer.cryptoName,
        change : ((bestPerformer.cryptoCurrentPrice - bestPerformer.buyPrice) * bestPerformer.quantity).toFixed(2),
        changePercentage : (((bestPerformer.cryptoCurrentPrice - bestPerformer.buyPrice) * bestPerformer.quantity)/bestPerformer.buyPrice*100).toFixed(2)
      },
      worstPerformer: 
      {
        name : worstPerformer.cryptoName,
        change : ((worstPerformer.cryptoCurrentPrice - worstPerformer.buyPrice) * worstPerformer.quantity).toFixed(2),
        changePercentage : (((worstPerformer.cryptoCurrentPrice - worstPerformer.buyPrice) * worstPerformer.quantity)/worstPerformer.buyPrice*100).toFixed(2)
      },
    };
  };

  return (
    <div className="stats">
      <div>
        <p className="title">All-time profit</p>
        <p className="change">
          {allTimeProfitPercentage}%({allTimeProfit > 0 ? `+` : ``} $
          {allTimeProfit}){" "}
        </p>
      </div>
      <div>
        <p className="title">
          Best Performer({getPerformers().bestPerformer.name})
        </p>
        <p className="change">{getPerformers().bestPerformer.changePercentage}%({getPerformers().bestPerformer.change > 0 ? `+` : ``} ${getPerformers().bestPerformer.change})</p>
      </div>
      <div>
        <p className="title">
          Worst Performer({getPerformers().worstPerformer.name})
        </p>
        <p className="change">{getPerformers().worstPerformer.changePercentage}%({getPerformers().worstPerformer.change > 0 ? `+` : ``} ${getPerformers().worstPerformer.change})</p>
      </div>
    </div>
  );
}

export default Stats;
