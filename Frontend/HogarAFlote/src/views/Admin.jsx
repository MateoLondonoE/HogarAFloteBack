import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Admin() {
  const [proveedores, setProveedores] = useState([]);
  const [mensaje, setMensaje] = useState('');

  // Cargar proveedores pendientes
  useEffect(() => {
    const fetchProveedores = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/usuario/');
        setProveedores(response.data);
      } catch (error) {
        console.error('Error al cargar proveedores:', error);
      }
    };

    fetchProveedores();
  }, []);

  // Cambiar estado del proveedor
  const cambiarEstado = async (id) => {
    try {
      const response = await axios.put(`http://localhost:3000/api/v1/usuario/${id}`);
      setMensaje(response.data.message);

      // Actualizar la lista de proveedores
      setProveedores((prevProveedores) => prevProveedores.filter((p) => p._id !== id));
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      setMensaje('Error al actualizar estado.');
    }
  };

  return (
    <div className="lista-container">
      <h2>Proveedores Pendientes por aprobar</h2>
      {mensaje && <p>{mensaje}</p>}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Email</th>
            <th>Portafolio</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {proveedores.map((proveedor) => (
            <tr key={proveedor.nombre}>
              <td>{proveedor.email}</td>
              <td>{proveedor.portafolio}</td>
              <td>
                <button onClick={() => cambiarEstado(proveedor._id)}>Revisar y Aprobar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Admin;
