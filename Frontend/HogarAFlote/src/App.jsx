//import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeaderPP from './views/headerView';
import FooterPP from './views/footerView';
import PaginaPrincipalView from './views/PaginaPrincipalView';
import LoginView from './views/LoginView';
import OlvidastetuCuenta from './views/OlvidastetuCuentaView';
import Registro from './views/RegistroView';
import Admin from './views/Admin';

function App() {
  return (
    <Router>
      <HeaderPP />
      <div style={{ minHeight: '80vh' }}> {/* Asegura que el contenido tenga espacio y el footer esté al final */}
        <Routes>
          <Route path="/" element={<PaginaPrincipalView />} />
          <Route path="/pp" element={<PaginaPrincipalView />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/ot" element={<OlvidastetuCuenta />} />
          <Route path="/reg" element={<Registro />} />
          <Route path="/adm" element={<Admin />} />
        </Routes>
      </div>
      <FooterPP />
    </Router>
  );
}

export default App;
