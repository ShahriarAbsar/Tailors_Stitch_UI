import React from 'react'
import Navbar from './components/navbar/navbar.jsx';
import Home from './components/home/home.jsx';
import { Routes , Route } from 'react-router-dom';
import { PrimeReactProvider } from 'primereact/api';

const App = () => {
  return (
    <div>
     <PrimeReactProvider>
      <Navbar/>
      <Home/>
    </PrimeReactProvider> 
    

    <Routes>

      <Route path="/" element={<Home />} />
      
      {/* <Route path="/about" element={<About />} />
      <Route path="/products" element={<Products />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/testimonials" element={<Testimonials />} />
      <Route path="/programme" element={<Programme />} /> */}
    </Routes>
    

       </div>
  )
}

export default App
