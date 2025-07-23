import React from "react";
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


import ContactUs from './components/contactUs/contactUs.jsx'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { PrimeReactProvider } from "primereact/api";
import { BreadCrumb } from "primereact/breadcrumb";

import ScrollToTop from './components/ScrollToTop.jsx'
const App = () => {
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
        </Routes>
      
    </div>
  );
};

export default App;
