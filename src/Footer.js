import React from "react";

import './Footer.css'

function Footer() {
  return (
    <>
      <div className="footer">
        <div className="img-div">
          <img className="footer-logo" alt="logo" src="./assets/header-logo.svg" />
        </div>
        <div className="info-div">
          <div>
            <h2>Products</h2>
            <ul>
              <li>ChatGPT Plugin</li>
              <li>Blockchain Explorer</li>
              <li>Crypto API</li>
              <li>Crypto Indices</li>
              <li>Doodles</li>
              <li>Sitemap</li>
            </ul>
          </div>
          <div>
            <h2>Company</h2>
            <ul>
              <li>About us</li>
              <li>Terms of use</li>
              <li>Privacy Policy</li>
              <li>Cookie preferences</li>
              <li>Community Rules</li>
              <li>Disclaimer</li>
              <li>Methodology</li>
              <li>Careers</li>
            </ul>
          </div>
          <div>
            <h2>Support</h2>
            <ul>
              <li>Request Form</li>
              <li>Contact Support</li>
              <li>FAQ</li>
              <li>Glossary</li>
            </ul>
          </div>
          <div>
            <h2>Socials</h2>
            <ul>
              <li>X (Twitter)</li>
              <li>Community</li>
              <li>Telegram</li>
              <li>Instagram</li>
              <li>Facebook</li>
              <li>Reddit</li>
              <li>LinkedIn</li>
            </ul>
          </div>
        </div>
      </div>
      <p className="copyright">© 2023 CoinMarketCap. All rights reserved</p>
    </>
  );
}

export default Footer;
