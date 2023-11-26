import "./App.css";
import Header from "./Header";
import Main from "./Main";
import Home from "./Home";
import Footer from "./Footer";
import { useDispatch, useSelector } from "react-redux";
import { login, logout, selectUser } from "./features/userSlice";
import { useEffect } from "react";
import { auth } from "./firebase";
import { display } from "@mui/system";
import { fetchCryptoData, selectCryptoData } from "./features/cryptoSlice";

function App() {
  const user = useSelector(selectUser);
  const cryptoData = useSelector(selectCryptoData);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        dispatch(
          login({
            email: userAuth.email,
            displayName: userAuth.name,
            uid: userAuth.uid,
          })
        );
      } else {
        dispatch(logout());
      }
    });
  }, []);

  useEffect(() => {
    dispatch(fetchCryptoData());
  },[])

  return (
    <div className="App">
      <Header />
      {user == null ? (
        <Home />
      ) : (
        <Main />
      )}
      <Footer />
    </div>
  );
}

export default App;
