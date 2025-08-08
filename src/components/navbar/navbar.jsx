import React, { useState, useEffect } from "react";
import "./navbar.scss";
const Logo = "https://ik.imagekit.io/k3nqtn6ih/assets/navImages/Logo.png?updatedAt=1753525562972";
const logo2 = "https://ik.imagekit.io/k3nqtn6ih/assets/navImages/DarkLogo.png?updatedAt=1753525559567";
import { NavLink, useLocation } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
const ham = "https://ik.imagekit.io/k3nqtn6ih/assets/navImages/ham.png?updatedAt=1753525559613";
const ham2 = "https://ik.imagekit.io/k3nqtn6ih/assets/navImages/hamburger2.png?updatedAt=1753525563043";

const Navbar = ({ homeDark = true }) => {
  const location = useLocation();
  const [isDark, setIsDark] = useState(false);
  const [visibleRight, setVisibleRight] = useState(false);

  useEffect(() => {
    const isHome = location.pathname === "/";
    if (isHome && homeDark) {
      setIsDark(true);
    } else {
      setIsDark(false);
    }
  }, [location.pathname, homeDark]);

  const isHome = location.pathname === "/home";

  return (
    <nav className={`navigation ${isDark ? "nav-light" : "nav-dark"}`}>
      <div className="navInside">
        <div className="logo">
          <NavLink to="/home">
            <img src={isDark ? Logo : logo2} alt="Logo" />
          </NavLink>
        </div>

        <ul>
          <li>
            <NavLink
              to="/home"
              className={({ isActive }) => (isActive ? "btn1 active" : "btn1" )}
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
              to="/services"
              className={({ isActive }) => (isActive ? "btn1 active" : "btn1")}
            >
              Our Service
            </NavLink>
          </li>
          {/* <li>
            <NavLink
              to="/contact"
              className={({ isActive }) => (isActive ? "btn1 active" : "btn1")}
            >
              Contact
            </NavLink>
          </li> */}
          <li>
            <NavLink to="/contact">
                <button className="btn2" >Contact Us</button>
            </NavLink>
            
          </li>
        </ul>

        <div className="card">
          <div className={`hamburger ${isDark ? "nav-light" : "nav-dark"}`}>
            <Button className="button"
              icon={<img src={isDark ? ham : ham2} alt="menu" />}
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
                <NavLink to="/contact">
                  <button
                    onClick={() => setVisibleRight(false)}
                    className="btn2"
                  >
                    Get In Touch
                  </button>
                </NavLink>
              </li>
            </ul>
          </Sidebar>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
