import React, { useState } from "react";
import "./footer.scss";
import Logo from "../../assets/Footer/Logo.png";
import { NavLink } from "react-router-dom";
import axios from "axios";

const Footer = ({ scrollToSection }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null); // success or error message
  const [error, setError] = useState(false);

  const apiBaseUrl = "https://api.tailors-stitch.com"; // Update this if needed

  const handleSubscribe = async () => {
    if (!email.trim()) {
      setMessage("Please enter a valid email.");
      setError(true);
      return;
    }
    setLoading(true);
    setMessage(null);
    setError(false);

    try {
      const response = await axios.post(`${apiBaseUrl}/subscriber`, { email });
      setMessage("Thank you for subscribing!");
      setError(false);
      setEmail(""); // clear input
    } catch (err) {
      console.error("Subscription failed:", err);
      setMessage(
        err.response?.data?.message || "Failed to subscribe. Please try again."
      );
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="footerContainer">
      <div className="footerBody">
        <div className="footerBodyTop">
          <div className="footerBodyTopLeft">
            <div className="logo">
              <img src={Logo} alt="Logo" />
            </div>

            <div className="subTitle">
              <p>Producing & delivering clothing with care.</p>
            </div>
          </div>
          <div className="footerBodyTopRight">
            <div className="ulLeft">
              <ul>
                <li onClick={() => scrollToSection(3)}> Product</li>
                <li>
                  <NavLink to="/about">About Us</NavLink>
                </li>
              </ul>
            </div>
            <div className="ulRight">
              <ul>
                <li onClick={() => scrollToSection(5)}>Contact Us</li>
                <li>Newsletter</li>
                <li>
                  <NavLink to="/contact">Support</NavLink>
                </li>
              </ul>
            </div>

            <div className="inputField">
              <div className="input">
                <label>Stay Up to date</label>

                <div className="inputfield">
                  <input
                    type="email"
                    placeholder="Enter Your Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                  <button
                    className="btn"
                    onClick={handleSubscribe}
                    disabled={loading}
                  >
                    {loading ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>
                {message && (
                  <p className={error ? "error-message" : "success-message"}>
                    {message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="footerBodyBottom">
          <div className="copyRight">
            <p> &copy; 2025 Tailors stitch. All Rights reserved</p>
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

export default Footer;
