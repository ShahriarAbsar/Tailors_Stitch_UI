import React, { useRef,useState, useEffect } from "react";
// src/index.js or src/App.js
import "primereact/resources/themes/saga-blue/theme.css"; // Or any other theme
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import Navbar from "./components/navbar/navbar.jsx";
import Home from "./components/home/home.jsx";
import About from "./components/aboutUs/aboutUs.jsx";
import Services from "./components/ourServices/ourServices.jsx";
import Casual2 from "./components/mensCasual/mensCasual.jsx"
// Import the new CategoryPage component
import CategoryPage from "./components/categoryPage.jsx"; // Assuming CategoryPage.jsx is in components/

import ContactUs from "./components/contactUs/contactUs.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import Dashboard from "./components/adminPanel/dashboard.jsx";
import Login from "./components/adminPanel/login.jsx";
import { Navigate } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/footer/footer.jsx";
import { useNavigate, useLocation} from "react-router-dom";

const App = () => {
  // *** CRUCIAL CHANGE: Initialize authenticated state from localStorage ***
  const [authenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem("accessToken");
    // Returns true if a token exists, false otherwise
    return !!token;
  });

  const navigate = useNavigate();
  const location = useLocation();
  const [homeLoaded, setHomeLoaded] = React.useState(false);

  // We’ll store section index in here temporarily if navigating from another page
  const sectionToScroll = useRef(null);

  // const scrollToSection = (index) => {
  //   if (location.pathname === "/") {
  //     // Already on Home — just dispatch an event for Home to handle
  //     window.dispatchEvent(new CustomEvent("scrollToSection", { detail: index }));
  //   } else {
  //     // Store the index so we can use it after navigation
  //     sectionToScroll.current = index;
  //     navigate("/");
  //   }
  // };

  // // Listen for when we land on Home
  // useEffect(() => {
  //   if (location.pathname === "/" && sectionToScroll.current !== null) {
  //     window.dispatchEvent(new CustomEvent("scrollToSection", { detail: sectionToScroll.current }));
  //     sectionToScroll.current = null; // reset
  //   }
  // }, [location.pathname]);

  const scrollToSection = (index) => {
    if (location.pathname === "/") {
      window.dispatchEvent(new CustomEvent("scrollToSection", { detail: index }));
    } else {
      sectionToScroll.current = index;
      navigate("/");
    }
  };

  useEffect(() => {
    if (location.pathname === "/" && sectionToScroll.current !== null) {
      window.dispatchEvent(new CustomEvent("scrollToSection", { detail: sectionToScroll.current }));
      sectionToScroll.current = null;
    }
  }, [location.pathname]);

  return (
    <div>
      <PrimeReactProvider>
        <Navbar />
      </PrimeReactProvider>

      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar homeDark={true} />
              <Home onLoaded={() => setHomeLoaded(true)} />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Navbar homeDark={true} />
              <Home />
            </>
          }
        />
        <Route
          path="/about"
          element={
            <>
              <Navbar homeDark={false} />
              <About />
            </>
          }
        />
        <Route path="/services" element={<Services />} />

        {/*
          // REMOVED: Individual category routes are now replaced by a single dynamic route
          <Route path="/mensFormalwear" element={<MensFormalwear />} />
          
          <Route path="/womensFormalwear" element={<WomensFormalwear />} />
          <Route path="/womensCasualwear" element={<Womenscasualwear />} />
          <Route path="/womensKnitwear" element={<WomensKnitwear />} />
          <Route path="/kidswear" element={<Kids />} />
        */}
        <Route path="/casual" element={<Dashboard />} />
        <Route path="/formal" element={<Casual2 />} />

        {/* NEW: Dynamic route for all product categories */}
        {/* The :categoryName parameter will be captured by CategoryPage */}
        <Route path="/category/:categoryId" element={<CategoryPage />} />

        <Route path="/Contact" element={<ContactUs />} />

        {/* Protected Admin Route */}
        <Route
          path="/admin"
          element={
            authenticated ? (
              <Dashboard setAuthenticated={setAuthenticated} /> // Pass setAuthenticated
            ) : (
              <Navigate to="/login" replace /> // Use replace to prevent going back to /admin after login
            )
          }
        />
        {/* Login Route */}
        <Route
          path="/login"
          element={<Login setAuthenticated={setAuthenticated} />} // Pass setAuthenticated
        />
        {/* Optional: Redirect any unknown paths to home or login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {homeLoaded && <Footer scrollToSection={scrollToSection} />}
    </div>
  );
};

export default App;
