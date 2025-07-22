import React from 'react'
import Navbar from './components/navbar/navbar.jsx';
import Home from './components/home/home.jsx';
import About from './components/aboutUs/aboutUs.jsx'
import Services from './components/ourServices/ourServices.jsx'
import MensFormalwear from './components/mensFormal/mensFormalwear.jsx'
import { Routes , Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';
import { BreadCrumb } from 'primereact/breadcrumb';
const App = () => {
  return (
    <div>
     <PrimeReactProvider>
      <Navbar/>
      
    </PrimeReactProvider> 
    

    <Routes>

      <Route path="/" element={<Home />} />
      <Route path="home" element={<Home />} />
       <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/mensFormalwear" element={<MensFormalwear />} />
     {/* <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/programme" element={<Programme />} /> */}
    </Routes>
    

       </div>
  )
}

export default App
