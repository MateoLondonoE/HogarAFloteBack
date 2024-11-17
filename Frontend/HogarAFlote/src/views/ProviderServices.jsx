
// import React from 'react';
import ServiceCard from './ServiceCard';

const ProviderServices = () => {
  return (
    <section>
      <h2>Servicios de Proveedores</h2>
      <ServiceCard title="Proveedor 1" />
      <ServiceCard title="Proveedor 2" />
      {/* Puedes añadir más proveedores según sea necesario */}
    </section>
  );
};

export default ProviderServices;
