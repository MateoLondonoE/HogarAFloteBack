
// import React from 'react';
import ServiceCard from './ServiceCard';

const UserServices = () => {
  return (
    <section>
      <h2>Servicios de Usuario</h2>
      <ServiceCard title="Servicio 1" />
      <ServiceCard title="Servicio 2" />
      {/* Puedes añadir más servicios según sea necesario */}
    </section>
  );
};

export default UserServices;
