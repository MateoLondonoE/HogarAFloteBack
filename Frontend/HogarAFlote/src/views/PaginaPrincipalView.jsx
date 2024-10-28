import { useEffect } from 'react';
import axios from 'axios';
import FilterSection from './FilterSection';
import UserServices from './UserServices';
import ProviderServices from './ProviderServices';
import AccountInfo from './AccountInfo';

function PaginaPrincipal() {
  useEffect(() => { getAllClientes() }, []);
  
  async function getAllClientes() {
    const respuesta = await axios.get("http://localhost:5000/clientes");
    console.log(respuesta);
  }

  return (
    <div style={{ display: 'flex' }}>
      <FilterSection />
      <main style={{ flexGrow: 1, padding: '1rem' }}>
        <section className="hero">
          <div className="content">
            <h1>Bienvenido a Hogar a Flote</h1>
            <p>Conecta con los mejores proveedores de servicios de mantenimiento del hogar en el Valle de Aburrá</p>
          </div>
        </section>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <UserServices />
          <ProviderServices />
        </div>
      </main>
      <AccountInfo />
    </div>
  );
}

export default PaginaPrincipal;
