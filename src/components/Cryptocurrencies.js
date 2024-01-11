import React from "react";

import "../styles/Cryptocurrencies.css";
import { useDispatch, useSelector } from "react-redux";
import { login,selectUser } from "../features/userSlice";
import { selectCryptoData } from "../features/cryptoSlice";

import StarIcon from "@mui/icons-material/Star";
import StarOutlineIcon from "@mui/icons-material/StarOutline";

import { db } from "../firebase/firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";

function Cryptocurrencies() {
  const user = useSelector(selectUser);
  const cryptoData = useSelector(selectCryptoData);

  const dispatch = useDispatch();

  const checkIfWatchListed = (cryptoId) => {
    if (user.watchlist === undefined) return false;
    return user.watchlist.includes(cryptoId) ? true : false;
  };

  const addToWatchlist = async (cryptoId) => {

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    const newWatchlist = userData.watchlist;
    
    newWatchlist.push(cryptoId);

    await updateDoc(docRef, {
      watchlist: newWatchlist,
    });

    dispatch(
      login({
        ...user,
        watchlist: newWatchlist
      })
    );


    
  }

  const removeFromWatchlist = async (cryptoId) => {
    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    const oldWatchlist = userData.watchlist;

    const newWatchlist= oldWatchlist.filter(
      (item) => item !== cryptoId
    );

    await updateDoc(docRef, {
      watchlist: newWatchlist,
    });

    dispatch(
      login({
        ...user,
        watchlist: newWatchlist
      })
    );

  }

  return (
    <div className="crytocurrencies">
      <h1>Today's Cryptocurrency Prices by Market Cap</h1>
      <table>
        <thead>
          <tr className="th">
            <th></th>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>24h %</th>
            <th>24h High</th>
            <th>24h Low</th>
            <th>Market Cap</th>
            <th>Circulating Supply</th>
            <th>All Time High</th>
          </tr>
        </thead>
        <tbody>
          {cryptoData.map((crypto) => {
            return (
              <tr className="tr">
                <td>
                  {checkIfWatchListed(crypto.id) === true ? (
                    <StarIcon onClick={()=>removeFromWatchlist(crypto.id)} />
                  ) : (
                    <StarOutlineIcon onClick={()=>addToWatchlist(crypto.id)} />
                  )}
                </td>
                <td>{crypto.market_cap_rank}</td>
                <td className="name">
                  <img src={crypto.image} />
                  <p style={{ padding: "0 8px" }}>{crypto.name}</p>
                  <p style={{ color: "rgb(128, 138, 157)", fontWeight: 500 }}>
                    {crypto.symbol.toUpperCase()}
                  </p>
                </td>
                <td>${Intl.NumberFormat().format(crypto.current_price)}</td>
                <td
                  style={
                    crypto.price_change_percentage_24h < 0
                      ? { color: "#ea3943" }
                      : { color: "#16c784" }
                  }
                >
                  {crypto.price_change_percentage_24h.toFixed(2)}%
                </td>
                <td>${Intl.NumberFormat().format(crypto.high_24h)}</td>
                <td>${Intl.NumberFormat().format(crypto.low_24h)}</td>
                <td>${Intl.NumberFormat().format(crypto.market_cap)}</td>
                <td>{Intl.NumberFormat().format(crypto.circulating_supply)}</td>
                <td>{Intl.NumberFormat().format(crypto.ath)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Cryptocurrencies;
