import React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

import "../styles/PieChartDiv.css";

import { selectUser } from "../features/userSlice";
import { useSelector } from "react-redux";

function PieChartDiv(props) {
  const user = useSelector(selectUser);
  let data = [];
  let index = 0;
  user.viewingPortfolio.transactions.map((transaction) => {
    data.push({
      id: index++,
      value: transaction.quantity * transaction.current_price,
      label: transaction.name,
    });
  });
  return (
    props.pieChartToggle && (
      <div className="pie-chart-div">
        <PieChart
          series={[
            {
              data,
              highlightScope: { faded: "global", highlighted: "item" },
              faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
              innerRadius: 30,
              outerRadius: 100,
              paddingAngle: 4,
              cornerRadius: 4,
              color: "red"
            },
          ]}
          height={200}
        />
      </div>
    )
  );
}

export default PieChartDiv;
