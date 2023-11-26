import React from "react";

import "./Assets.css";

function Assets() {
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Bitcoin</td>
            <td>$28,304.78</td>
            <td>0.05%</td>
            <td>1.03%</td>
            <td>5.40%</td>
            <td>
              <p>$28,304.78</p>
              <p>1 BTC</p>
            </td>
            <td>$20,000.00</td>
            <td>
              <p>+8300.73</p>
              <p>41.53%</p>
            </td>
            <td>+ -</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Assets;
