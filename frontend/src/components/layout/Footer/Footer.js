import React from "react";
import playStore from "../../../images/playStore.png";
import appStore from "../../../images/appStore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
      </div>

      <div className="midFooter">
        <h1>CheapGrocery.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2023 &copy; CheapGrocery</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a>Instagram</a>
        <a>Youtube</a>
        <a>Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;