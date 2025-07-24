import React, { useState } from "react";
import "./navbar.scss";
import Logo from "../../assets/navImages/Logo.png";
import logo2 from '../../assets/navImages/DarkLogo.png';
import { NavLink , useLocation } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";

import { Button } from "primereact/button";
import ham from "../../assets/navImages/ham.png";
import ham2 from "../../assets/navImages/hamburger2.png"
const navbar = ({ homeDark = true }) => {
  const [visibleRight, setVisibleRight] = useState(false);
  
const location = useLocation();

  const isHome = location.pathname === "/home";
  return (
    <nav className={`navigation ${isHome ? (homeDark ? "nav-light" : "nav-dark") : "nav-dark"}`}>
      <div className="navInside">
        <div className="logo">
          <NavLink to="/home">
            <img src={isHome && homeDark ? Logo : logo2} alt="Logo" />
          </NavLink>
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
              to={"/services"}
              className={({ isActive }) => (isActive ? "btn1 active" : "btn1")}
            >
              Our Service
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/contact"}
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
          <div className={`hamburger ${isHome ? (homeDark ? "nav-light" : "nav-dark") : "nav-dark"}`}  >
            <Button
              icon={<img src={isHome && homeDark ? ham : ham2} alt="Logo" />}
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
                  onClick={() => setVisibleRight(false)}
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
                  onClick={() => setVisibleRight(false)}
                  className={({ isActive }) =>
                    isActive ? "btn1 active" : "btn1"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  onClick={() => setVisibleRight(false)}
                  className={({ isActive }) =>
                    isActive ? "btn1 active" : "btn1"
                  }
                >
                  Contact
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/services"
                  onClick={() => setVisibleRight(false)}
                  className={({ isActive }) =>
                    isActive ? "btn1 active" : "btn1"
                  }
                >
                  Our Service
                </NavLink>
              </li>
              <li>
                
                <button onClick={() => setVisibleRight(false)} className="btn2">Get In Touch</button>
              </li>
            </ul>
          </Sidebar>
        </div>
      </div>
    </nav>
  );
};

export default navbar;
