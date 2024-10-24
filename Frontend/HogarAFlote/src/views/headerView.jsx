import React from 'react';
import logo from '../assets/logo.png'
import PaginaPrincipal from './PaginaPrincipalView';
import { Link } from 'react-router-dom';

function HeaderPP(){
    return(
        <header>
            <div className="logo">
                <img src={logo} alt="Hogar a Flote" />
            </div>
            <nav>
                <ul>
                    
                    <li><Link to="/pp">Inicio</Link></li>
                    <li><Link to="/serv">Servicios</Link></li>
                    <li><Link to="/reg">Registro</Link></li>
                    <li><Link to="/login">Login</Link></li>
                </ul>
            </nav>
        </header>
    )

}

export default HeaderPP;