import React from "react";
import "./footer.scss";
import Logo from "../../assets/Footer/Logo.png";

const footer = () => {
  return (
    <div className="footerContainer">
      <div className="footerBody">
        <div className="footerBodyTop">
          <div className="footerBodyTopLeft">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>

            <div className="subTitle">
              <p>Producing & delivering clothing with care.</p>
            </div>
          </div>
          <div className="footerBodyTopRight">
            <div className="ulLeft">
              <ul>
                <li>Product</li>
                <li>Overview</li>
                <li>About Us</li>
                <li>For Brands</li>
              </ul>
            </div>
            <div className="ulRight">
              <ul>
                <li>Resources</li>
                <li>Contact Us</li>
                <li>Newsletter</li>
                <li>Help center</li>
                <li>Support</li>
              </ul>
            </div>

            <div className="inputField">
              <div className="input">
                <label>Stay Up to date</label>

                <div className="inputfield">
                  <input type="Email" placeholder="Enter Your Email" />
                  <button className="btn">Subscribe</button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footerBodyBottom">
           <div className="copyRight">
            
            <p> &copy; 2025 Tailors stitch. All Rights reservesd</p>
            </div> 

            <div className="links">
                  <ul>
                        <li>Terms</li>
                        <li>Privacy</li>
                        <li>Cookies</li>
                        
                  </ul>
            </div>
        </div>
      </div>
    </div>
  );
};

export default footer;
