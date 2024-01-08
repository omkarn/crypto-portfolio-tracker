import React, { useState } from "react";
import "../styles/Home.css";

import LoginModel from "./LoginModel";

function Home() {
  const [loginState, setLoginState] = useState({ method: "", visible: false });

  const signup = () => {
    setLoginState({ method: "Sign Up", visible: true });
  };

  const login = () => {
    setLoginState({ method: "Log In", visible: true });
  };

  return (
    <>
      <div className="home">
        <div className="sign-up">
          <h3>Sign up Today</h3>
          <h1>Crypto Portfolio Tracker</h1>
          <p className="home-p">
            Keep track of your profits, losses and portfolio valuation with our
            easy to use platform.
          </p>
          <div className="buttons">
            <button className="button1" onClick={signup}>
              Create your Portfolio
            </button>
            <button className="button2" onClick={login}>
              Log In
            </button>
          </div>
        </div>
        <div className="screenshot">
          <img
            className="screenshot-pc"
            alt="screenshot"
            src="./assets/pc.jpeg"
          />
          <img
            className="screenshot-mobile"
            alt="screenshot"
            src="./assets/mobile.jpeg"
          />
        </div>
      </div>
      <div className="login-model">
        <LoginModel
          method={loginState.method}
          visible={loginState.visible}
          closeModel={setLoginState}
        />
      </div>
    </>
  );
}

export default Home;
