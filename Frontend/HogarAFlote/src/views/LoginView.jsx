import React from 'react';
import PaginaPrincipalView from "./PaginaPrincipalView"
import HeaderPP from './headerView';
import FooterPP from './footerView';
import { Link } from 'react-router-dom';

function Login(){
    return(
        <>
        <HeaderPP/>
        <main>
            <div className="login-container">
                <h1>Inicio Sesión</h1>
                <form className="login-form">
                    <div className="form-group full-width">
                        <input type="email" id="email" placeholder="Correo Electrónico" />
                    </div>
                    <div className="form-group full-width">
                        <input type="password" id="password" placeholder="Contraseña" />
                    </div>
                    <div className="radio-group-genero">
                        <label><input type="radio" name="genero" value="hombre" /> Cliente</label>
                        <label><input type="radio" name="genero" value="mujer" /> Proveedor</label>
                        <label><input type="radio" name="genero" value="otro" /> Administrador</label>
                    </div>
                    
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
        <FooterPP/>
        </>
    )
}

export default Login;