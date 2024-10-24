import React, { useEffect } from 'react';
import HeaderPP from './headerView';
import FooterPP from './footerView';
import axios from 'axios';

function PaginaPrincipal() {
  useEffect(()=>{getAllClientes()},[])
  async function getAllClientes(){
    const respuesta = await axios.get("http://localhost:5000/clientes")
    console.log(respuesta)
  }
  return (
    <>
    <HeaderPP/>
      <section className="hero">
          <div className="content">
              <h1>Bienvenido a Hogar a Flote</h1>
              <p>Conecta con los mejores proveedores de servicios de mantenimiento del hogar en el Valle de Aburrá</p>
          </div>
      </section>
    <FooterPP/>
    </>
  )
}

export default PaginaPrincipal;
