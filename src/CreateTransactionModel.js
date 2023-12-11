import React, { useState } from "react";

import "./CreateTransactionModel.css";

import { useSelector } from "react-redux";
import { selectCryptoData } from "./features/cryptoSlice";
import Transaction from "./Transaction";

function CreateTransactionModel(props) {
  const close = () => {
    props.closeModel(false);
  };

  const cryptoData = useSelector(selectCryptoData);

  const [transactionVisible, setTransactionVisible] = useState(false);

  const [inputValue, setInputValue] = useState("");

  const [selectedCrypto,setSelectedCrypto]=useState("");

  const onInputChange = (e) => {
    e.preventDefault();
    const { value } = e.target;
    setInputValue(value);
  };

  const cryptoSelected = (crypto) => {
    close();
    setTransactionVisible(true);
    setSelectedCrypto(crypto);
  };

  return (
    <>
      {props.visible && (
        <div className="create-transaction-model-background">
          <div className="create-transaction-model-container">
            <div className="heading">
              <h1>Select Coin</h1>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="close-icon"
                onClick={close}
                fill="currentColor"
                height="24px"
                width="24px"
                viewBox="0 0 24 24"
                color="neutral3"
                class="sc-aef7b723-0 jhvPQd"
              >
                <path
                  d="M18 6L6 18M18 18L6 6"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-miterlimit="10"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search"
              onChange={onInputChange}
              value={inputValue}
            />

            <div className="crypto-list">
              {cryptoData
                .filter((crypto) =>
                  crypto.name.toLowerCase().includes(inputValue.toLowerCase())
                )
                .map((crypto) => {
                  return (
                    <div className="list-item" onClick={()=>{cryptoSelected(crypto)}}>
                      <li>
                        <img className="top-crypto-image" src={crypto.image} />
                        <p>
                          {crypto.name}
                          <span>{crypto.symbol.toUpperCase()}</span>
                        </p>
                      </li>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        height="20"
                        width="20"
                        viewBox="0 0 24 24"
                        class="sc-aef7b723-0 gTkjCc cmc-rtl-flip"
                        color="text2"
                      >
                        <path
                          d="M9 6L15 12L9 18"
                          stroke="currentColor"
                          stroke-width="2"
                          stroke-miterlimit="10"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        ></path>
                      </svg>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      )}
      <div className="transaction-model">
        <Transaction
          visible={transactionVisible}
          closeModel={setTransactionVisible}
          selectedCrypto={selectedCrypto}
        />
      </div>
    </>
  );
}

export default CreateTransactionModel;
