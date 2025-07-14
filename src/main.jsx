import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { PrimeReactProvider, PrimeReactContext } from "primereact/api";
import 'primeicons/primeicons.css';

import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';       
import './index.scss'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <PrimeReactProvider>
      <App />
    </PrimeReactProvider>
    
    </BrowserRouter>
    

  </StrictMode>,
)
