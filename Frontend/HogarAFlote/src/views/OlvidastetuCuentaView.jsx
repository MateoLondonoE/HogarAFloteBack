import React from 'react';
import HeaderPP from './headerView';
import FooterPP from './footerView';
import { Link } from 'react-router-dom';

function OlvidastetuCuenta(){
    return(
        <>
        <HeaderPP/>
        <main>
            <div className="contraseña-container">
                <h2>Recupera tu contraseña</h2>
                <div className="raya"></div>
                <form className="login-form">
                    <label>Introduce tu correo electrónico para recuperar tu contraseña.</label>
                    <div className="form-group full-width">
                        <input type="email" id="email" placeholder="Correo Electrónico"/>
                    </div>
                    <div className="raya"></div>

                    <div className="recuperar-cancelar">
                        <Link to="/login" className="cancelar-btn" type="submit">Cancelar</Link>
                        <a href="#" className="recuperar-btn" type="submit">Recuperar</a>
                    </div>                
                </form>
            </div>        
        </main>
        <FooterPP/>
        </>
    )
}

export default OlvidastetuCuenta;