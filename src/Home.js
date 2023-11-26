import React, { useState } from "react";
import "./Home.css";

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
        <img
          className="screenshot"
          alt="screenshot"
          src="./assets/screenshot.png"
        />
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
