import React from "react";

import "./Main.css";

import Sidebar from "./Sidebar";
import DetailsTop from "./DetailsTop";
import Stats from "./Stats";
import Assets from "./Assets";

import { selectUser } from "./features/userSlice";
import { useSelector } from "react-redux";
import NoPortfolio from "./NoPortfolio";

function Main() {
  const user = useSelector(selectUser);
  console.log(user.portfolio);
  return (
    <div className="main">
      {user.portfolio == undefined ? (
        <NoPortfolio />
      ) : (
        <>
          <Sidebar />
          <section className="middle">
            <DetailsTop />
            <Stats />
            <Assets />
          </section>
        </>
      )}
    </div>
  );
}

export default Main;
