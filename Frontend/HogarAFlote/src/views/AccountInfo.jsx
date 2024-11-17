//import React from 'react';

const AccountInfo = ({ userInfo }) => {
  return (
    <div>
      <h3>Información de Usuario</h3>
      {userInfo ? (
        <>
          <p><strong>Nombre:</strong> {userInfo.primer_nombre} {userInfo.apellido}</p>
          <p><strong>Dirección:</strong> {userInfo.direccion}</p>
          <p><strong>Teléfono:</strong> {userInfo.telefono}</p>
          <p><strong>Email:</strong> {userInfo.email}</p>
        </>
      ) : (
        <p>No se encontró la información del usuario.</p>
      )}
    </div>
  );
};

export default AccountInfo;