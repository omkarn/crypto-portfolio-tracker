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

import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {
  const user = useSelector(selectUser);
  const cryptoData = useSelector(selectCryptoData);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      if (userAuth) {
        const docRef = doc(db, "users", userAuth.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        dispatch(
          login({
            // email: userAuth.email,
            // displayName: userAuth.name,
            // uid: userAuth.uid,
            email: userData.email,
            displayName: userData.displayName,
            uid: userData.id,
            portfolios: userData.portfolios
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
