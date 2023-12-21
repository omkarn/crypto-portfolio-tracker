import React, { useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

import { selectUser, logout } from "./features/userSlice";

import { selectCryptoData } from "./features/cryptoSlice";

import "./Header.css";
import { useDispatch, useSelector } from "react-redux";
import { auth } from "./firebase";
import { Tooltip } from "@mui/material";

export default function Header() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
 

  const cryptoData = useSelector(selectCryptoData);
  const topCrypto = cryptoData.slice(0,10);

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout);
    auth.signOut();
  };

  return (
    <header>
      <section className="top">
        <div className="cypto-prices">
          {topCrypto.map((crypto) => {
            return (
              <div className="top-cryto-price-details">
                <img className="top-crypto-image" src={crypto.image} />
                <p>{crypto.name}</p>
                <p>{crypto.current_price}</p>
              </div>
            );
          })}
        </div>
        {user != null && (
          <Tooltip title="Logout">
          <img
            onClick={handleLogout}
            className="user-logo"
            src="https://s3.coinmarketcap.com/static/img/portraits/63351ffc9b613d345489037f.png"
            alt="User Logo"
          />
          </Tooltip>
        )}
      </section>
      <section className="bottom">
        <div className="header-left">
          <img alt="logo" src="./assets/header-logo.svg" />
          <p className="header-p">Cryptocurrencies</p>
        </div>
        <div className="header-right">
          <p className="header-p">Watchlist</p>
          <div className="header-search">
            <SearchIcon />
            <input type="text" placeholder="Search"></input>
          </div>
          <div className="header-search-small">
            <SearchIcon />
          </div>
        </div>
      </section>
    </header>
  );
}
