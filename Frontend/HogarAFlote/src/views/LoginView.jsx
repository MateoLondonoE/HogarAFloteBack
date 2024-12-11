//import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import HeaderPP from './headerView';
import FooterPP from './footerView';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [usuario, setUsuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [errores, setErrores] = useState({});
    const [colorMensaje, setColorMensaje] = useState("red");
    const navigate = useNavigate();
  
    // Validar formulario
    const validarFormulario = () => {
      const nuevosErrores = {};
  
      if (!usuario.trim()) {
        nuevosErrores.usuario = "Debe llenar el usuario";
      }
      if (!contraseña.trim()) {
        nuevosErrores.contraseña = "Debe llenar la contraseña";
      }
  
      setErrores(nuevosErrores);
      return Object.keys(nuevosErrores).length === 0;
    };
  
    const handleLogin = async (e) => {
        e.preventDefault();
      
        if (!validarFormulario()) return;
      
        try {
          const response = await axios.post('http://localhost:3000/api/v1/usuario/login/', { usuario, contraseña });
            console.log(usuario)
            console.log(contraseña)
          if (response.data.token) {
            localStorage.setItem('token', response.data.token);
            navigate('/adm');
          } else if (response.data.message) {
            // Muestra el mensaje del backend en caso de que no haya token pero sí un mensaje
            setErrores({ global: response.data.message });
            setColorMensaje("red");
          } else {
            setErrores({ global: "Error desconocido. Intente de nuevo." });
          }
        } catch (error) {
          // Verifica si hay un mensaje desde el backend
          if (error.response && error.response.data && error.response.data.message) {
            setErrores({ global: error.response.data.message });
          } else {
            setErrores({ global: "Error en el ingreso. Inténtelo de nuevo." });
          }
          setColorMensaje("red");
        }
      };
      
  
    // Manejar cambios en los campos y limpiar errores
    const handleChangeUsuario = (e) => {
      setUsuario(e.target.value);
      setErrores((prev) => ({ ...prev, usuario: '' })); // Limpia el error del campo usuario
    };
  
    const handleChangeContraseña = (e) => {
      setContraseña(e.target.value);
      setErrores((prev) => ({ ...prev, contraseña: '' })); // Limpia el error del campo contraseña
    };
  
    return (
      <>
        <main>
          <div className="login-container">
            <h1>Inicio Sesión</h1>
            <form className="login-form" onSubmit={handleLogin}>
            <div className="form-group full-width">
                {errores.usuario && (
                  <div className="mensaje-error">{errores.usuario}</div>
                )}
              </div>
              <div className="form-group full-width">
                <input
                  className={errores.usuario ? "input-error" : ""}
                  type="text"
                  placeholder="Usuario"
                  value={usuario}
                  onChange={handleChangeUsuario}
                />
              </div>
              <div className="form-group full-width">
                {errores.contraseña && (
                  <div className="mensaje-error">{errores.contraseña}</div>
                )}
              </div>
              <div className="form-group full-width">
                <input
                  className={errores.contraseña ? "input-error" : ""}
                  type="password"
                  placeholder="Contraseña"
                  value={contraseña}
                  onChange={handleChangeContraseña}
                />
              </div>
              <div className="extra-options">
                <button className="login-btn" type="submit">
                  Iniciar sesión
                </button>
              </div>
              {errores.global && (
                <div className="mensaje-error-global" style={{ color: colorMensaje }}>
                  {errores.global}
                </div>
              )}
              <div>
                <Link to="/ot" className="forgot-password">
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <div className="raya"></div>
              <div className="extra-options">
                <Link to="/reg" className="crear-btn">
                  Crear cuenta nueva
                </Link>
              </div>
            </form>
          </div>
        </main>
      </>
    );
  }
  
  export default Login;
  