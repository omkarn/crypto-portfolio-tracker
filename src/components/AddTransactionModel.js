import React from "react";

import "../styles/AddTransactionModel.css";

import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../features/userSlice";
import { arrayUnion, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";

import AddTransactionModel from "./AddTransactionModel";

function AddTransaction(props) {
  const close = () => {
    props.closeModel(false);
  };

  const [input, setInput] = useState("");

  const handleChange = (e) => {
    const { value } = e.target;
    setInput(value);
  };

  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  //console.log(user);

  const createPortfolio = async () => {
    

    const docRef = doc(db, "users", user.uid);
    const docSnap = await getDoc(docRef);
    const userData = docSnap.data();
    let newPortfolios = [...userData.portfolios];
    newPortfolios.push({
      portfolioName: input,
      transactions: [],
    });
   console.log(newPortfolios)

    await updateDoc(docRef, {
      portfolios: newPortfolios
    });

    dispatch(
      login({
        ...user,
        portfolios: newPortfolios,
        viewingPortfolio: newPortfolios[newPortfolios.length-1]
      })
    );

    close();
  };

  return (
    props.visible && (
      <div className="add-transaction-model-background">
        <div className="add-transaction-model-container">
          <div className="heading">
            <h1>Create Portfolio</h1>
            {/* <CloseIcon className="close-icon" onClick={close} /> */}
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
          <div>
            <p>Portfolio name</p>
            <input
              placeholder="Enter your portfolio name"
              required
              name="input"
              value={input}
              onChange={handleChange}
            />
          </div>
          <div className="button-div">
            <button onClick={createPortfolio}>Create Portfolio</button>
          </div>
        </div>
      </div>
    )
  );
}

export default AddTransaction;
