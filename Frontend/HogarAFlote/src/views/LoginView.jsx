//import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import HeaderPP from './headerView';
import FooterPP from './footerView';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login(){
  const [usuario, setUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/api/v1/login/', { usuario, contraseña });
      if (response.data.token) {
        localStorage.setItem('token', response.data.token); // Guarda el token
        navigate('/adm'); // Redirige a la página principal
      }
    } catch (error) {
      console.error('Error de inicio de sesión:', error);
    }
  };


    return(
        <>
        <main>
            <div className="login-container">
                <h1>Inicio Sesión</h1>
                <form className="login-form" onSubmit={handleLogin}>
                    <div className="form-group full-width">
                        <input type="text" placeholder="Usuario" value={usuario} onChange={(e) => setUsuario(e.target.value)} />
                    </div>
                    <div className="form-group full-width">
                        <input type="password" placeholder="Contraseña" value={contraseña} onChange={(e) => setContraseña(e.target.value)} />
                    </div>
                    {/* <div className="radio-group-genero">
                        <label><input type="radio" name="genero" value="hombre" /> Cliente</label>
                        <label><input type="radio" name="genero" value="mujer" /> Proveedor</label>
                        <label><input type="radio" name="genero" value="otro" /> Administrador</label>
                    </div> */}
                    
                    <div className="extra-options">
                        <button className="login-btn" type="submit">Iniciar sesión</button>
                    </div>
                    <div>
                        <Link to="/ot" className="forgot-password">¿Olvidaste tu contraseña?</Link>
                    </div>
                    <div className="raya"></div>
                    <div className="extra-options">
                        <Link to="/reg" className="crear-btn" type="submit">Crear cuenta nueva</Link>
                    </div>
                </form>
            </div>        
        </main>
        </>
    )
}

export default Login;