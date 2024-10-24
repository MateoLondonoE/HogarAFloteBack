import React from 'react';
import PaginaPrincipalView from './views/PaginaPrincipalView';
import LoginView from './views/LoginView';
import OlvidastetuCuenta from './views/OlvidastetuCuentaView';
import Registro from './views/RegistroView';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<PaginaPrincipalView />} />
        <Route path="/pp" element={<PaginaPrincipalView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/ot" element={<OlvidastetuCuenta />} />
        <Route path="/reg" element={<Registro />} />
      </Routes>
    </Router>
        
      
  );
}

export default App;
