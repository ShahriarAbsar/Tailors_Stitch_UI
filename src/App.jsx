import React, { useState, useEffect } from "react"; // Import useEffect
// src/index.js or src/App.js
import 'primereact/resources/themes/saga-blue/theme.css'; // Or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from "./components/navbar/navbar.jsx";
import Home from "./components/home/home.jsx";
import About from "./components/aboutUs/aboutUs.jsx";
import Services from "./components/ourServices/ourServices.jsx";
import MensFormalwear from "./components/mensFormal/mensFormalwear.jsx";
import Menscasualwear from "./components/mensCasual/mensCasual.jsx";

import WomensFormalwear from "./components/womensFormal/womensFormal.jsx";
import Womenscasualwear from "./components/womensCasual/womensCasual.jsx";

import WomensKnitwear from "./components/womensknitwear/womensknitwear.jsx";
import Kids from "./components/kidswear/kidswear.jsx";

import ContactUs from "./components/contactUs/contactUs.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
// import { BreadCrumb } from "primereact/breadcrumb"; // Not used in your snippet

import Dashboard from "./components/adminPanel/dashboard.jsx"; // Use Dashboard if you renamed it
import Login from "./components/adminPanel/login.jsx";
import { Navigate } from 'react-router-dom';
import ScrollToTop from "./components/ScrollToTop.jsx";

const App = () => {
  // *** CRUCIAL CHANGE: Initialize authenticated state from localStorage ***
  const [authenticated, setAuthenticated] = useState(() => {
    const token = localStorage.getItem('accessToken');
    // Returns true if a token exists, false otherwise
    return !!token;
  });

  // Removed handleLogin as it's now handled directly by the Login component
  // and setAuthenticated is passed as a prop.

  return (
    <div>
      <PrimeReactProvider>
        <Navbar />
      </PrimeReactProvider>

      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/mensFormalwear" element={<MensFormalwear />} />
        <Route path="/menscasualwear" element={<Menscasualwear />} />
        <Route path="/womensFormalwear" element={<WomensFormalwear />} />
        <Route path="/womensCasualwear" element={<Womenscasualwear />} />
        <Route path="/womensKnitwear" element={<WomensKnitwear />} />
        <Route path="/kidswear" element={<Kids />} />
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
    </div>
  );
};

export default App;