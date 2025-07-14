import React, { useState } from "react";
import "./navbar.scss";
import Logo from "../../assets/navImages/Logo.png";
import { NavLink } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import { Button } from "primereact/button";
import ham from "../../assets/navImages/ham.png";
const navbar = () => {
  const [visibleRight, setVisibleRight] = useState(false);

  return (
    <nav>
      <div className="navInside">
        <div className="logo">
          <img src={Logo} alt="some photo" />
        </div>

        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "btn1 active" : "btn1")}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? "btn1 active" : "btn1")}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/Out Products"
              className={({ isActive }) => (isActive ? "btn1 active" : "btn1")}
            >
              Contact
            </NavLink>
          </li>
          <li>
            <button className="btn2">Get In Touch</button>
          </li>
        </ul>

        <div className="card">
          <div className="hamburger">
            <Button
              icon={<img src={ham} alt="hamburger" />}
              onClick={() => setVisibleRight(true)}
            />
          </div>

          <Sidebar
            className="sidebar"
            visible={visibleRight}
            position="right"
            onHide={() => setVisibleRight(false)}
          >
            <ul>
              <li>
                <NavLink
                  to="/home"
                  className={({ isActive }) =>
                    isActive ? "btn1 active" : "btn1"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "btn1 active" : "btn1"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Out Products"
                  className={({ isActive }) =>
                    isActive ? "btn1 active" : "btn1"
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <button className="btn2">Get In Touch</button>
              </li>
            </ul>
          </Sidebar>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
