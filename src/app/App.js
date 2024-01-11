import "./App.css";
import Header from "../components/Header";
import Main from "../components/Main";
import Home from "../components/Home";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "../features/userSlice";
import { useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { fetchCryptoData, selectCryptoData } from "../features/cryptoSlice";

import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Cryptocurrencies from "../components/Cryptocurrencies";
import Watchlist from "../components/Watchlist";

function App() {
  const user = useSelector(selectUser);
  const cryptoData = useSelector(selectCryptoData);
  const dispatch = useDispatch();
  const [show, setShow] = useState("Main");

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const docRef = doc(db, "users", userAuth.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        setTimeout(() => {
          dispatch(
            login({
              // email: userAuth.email,
              // displayName: userAuth.name,
              // uid: userAuth.uid,
              displayName: userData.displayName,
              uid: userData.id,
              portfolios: userData.portfolios,
              email: userData.email,
              viewingPortfolio: userData.portfolios[0],
              watchlist: userData.watchlist
            })
          );
        }, "100");
      } else {
        dispatch(logout());
      }
    });
  }, []);

  useEffect(() => {
    dispatch(fetchCryptoData());
  }, []);

  console.log(show);

  return (
    <div className="App">
      <Header show={show} setShow={setShow} />
      {user == null ? <Home /> : show==='Main' ? <Main /> : show==='Cryptocurrencies' ? <Cryptocurrencies /> : <Watchlist />}
      {/* {user == null ? <Home /> : <Main/>} */}
      <Footer />
    </div>
  );
}

export default App;
