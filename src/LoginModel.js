import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";

import "./LoginModel.css";
import { auth } from "./firebase";
import { useDispatch } from "react-redux";
import { login } from "./features/userSlice";

import { collection, setDoc, doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

function LoginModel(props) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    name: "",
  });

  const close = () => {
    props.closeModel({
      method: "",
      visible: false,
    });
  };

  const dispatch = useDispatch();

  const handleSignIn = () => {
    const emailRegex = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!emailRegex.test(formState.email))
      alert("Please enter valid email address..");
    if (!passwordRegex.test(formState.password))
      alert("Please enter more complex password..");

    if (
      emailRegex.test(formState.email) &&
      passwordRegex.test(formState.password)
    ) {
      auth
        .createUserWithEmailAndPassword(formState.email, formState.password)
        .then((userAuth) => {
          userAuth.user
            .updateProfile({
              displayName: formState.name,
            })
            .then(() => {
              dispatch(
                login({
                  email: userAuth.user.email,
                  displayName: formState.name,
                  uid: userAuth.user.uid,
                  portfolios: [],
                })
              );
            })
            .then(() => {
              const docData = {
                id: userAuth.user.uid,
                email: userAuth.user.email,
                displayName: formState.name,
                portfolios: [],
              };
              db.collection("users").doc(userAuth.user.uid).set(docData);
            });
        })
        .catch((error) => alert(error.message));
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(formState.email, formState.password)
      .then(async (userAuth) => {
        
        const docRef = doc(db, "users", userAuth.user.uid);
        const docSnap = await getDoc(docRef);
        const userData = docSnap.data();
        dispatch(
          login({
            // email: userAuth.user.email,
            // displayName: userAuth.user.name,
            // uid: userAuth.user.uid,
            email: userData.email,
            displayName: userData.name,
            uid: userData.uid,
            portfolios: userData.portfolios
          })
        );
      })
      .catch((error) => alert(error.message));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  return props.visible ? (
    <div className="login-model-background">
      <div className="login-model-container">
        <div className="icon-div">
          <CloseIcon className="close-icon" onClick={close} />
        </div>
        <div className="h1-div">
          <h1 className="login-model-h1">{props.method}</h1>
        </div>
        {props.method === "Sign Up" && (
          <div>
            <p className="input-discription">Profile Name</p>
            <input
              type="text"
              required
              className="login-model-input"
              placeholder="Enter your profile name..."
              value={formState.name}
              name="name"
              onChange={handleChange}
            />
          </div>
        )}
        <div>
          <p className="input-discription">Email Address</p>
          <input
            type="email"
            required
            className="login-model-input"
            placeholder="Enter your email address..."
            value={formState.email}
            name="email"
            onChange={handleChange}
          />
        </div>
        <div>
          <p className="input-discription">Password</p>
          <input
            type="password"
            required
            className="login-model-input"
            placeholder="Enter your password..."
            name="password"
            value={formState.password}
            onChange={handleChange}
          />
        </div>
        <div className="button-div">
          {props.method === "Sign Up" && (
            <button onClick={handleSignIn}>Create a new account</button>
          )}
          {props.method === "Log In" && (
            <button onClick={handleLogin}>Log In</button>
          )}
        </div>
      </div>
    </div>
  ) : (
    ""
  );
}

export default LoginModel;
