import React, { useState, useEffect } from "react";
// src/index.js or src/App.js
import 'primereact/resources/themes/saga-blue/theme.css'; // Or any other theme
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Navbar from "./components/navbar/navbar.jsx";
import Home from "./components/home/home.jsx";
import About from "./components/aboutUs/aboutUs.jsx";
import Services from "./components/ourServices/ourServices.jsx";

// Import the new CategoryPage component
import CategoryPage from "./components/categoryPage.jsx";// Assuming CategoryPage.jsx is in components/

import ContactUs from "./components/contactUs/contactUs.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";

import Dashboard from "./components/adminPanel/dashboard.jsx";
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
        
        {/*
          // REMOVED: Individual category routes are now replaced by a single dynamic route
          <Route path="/mensFormalwear" element={<MensFormalwear />} />
          <Route path="/menscasualwear" element={<Menscasualwear />} />
          <Route path="/womensFormalwear" element={<WomensFormalwear />} />
          <Route path="/womensCasualwear" element={<Womenscasualwear />} />
          <Route path="/womensKnitwear" element={<WomensKnitwear />} />
          <Route path="/kidswear" element={<Kids />} />
        */}

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
    </div>
  );
};

export default App;