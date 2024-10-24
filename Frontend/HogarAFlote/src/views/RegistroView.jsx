import React, { useState, useEffect } from 'react';
import HeaderPP from './headerView';
import FooterPP from './footerView';
import { generatePath, Link } from 'react-router-dom';
import axios from 'axios';

function Registro() {
  // Estado para almacenar los valores del formulario
  const [formData, setFormData] = useState({
    cedula: '',
    primerNombre: '',
    segundoNombre: '',
    apellidos: '',
    day: '1',
    month: '1',
    year: '',
    genero: '',
    direccion: '',
    telefono: '',
    email: '',
    usuario: '',
    password: '',
    rol: '',
  });

  const [years, setYears] = useState([]); // Para los años de nacimiento

  // Para actualizar los valores de los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevenir el envío del formulario
    axios.post("http://localhost:3000/api/v1/cliente", {
      identificacion: formData.identificacion,
      primerNombre: formData.primerNombre,
      segundoNombre: formData.segundoNombre,
      apellidos: formData.apellidos,
      year: formData.year,
      month: formData.month,
      day: formData.day,
      genero: formData.genero,
      direccion: formData.direccion,
      telefono: formData.telefono,
      email: formData.email,
      usuario: formData.usuario,
      password: formData.password,
      rol: formData.rol
    })
    console.log(formData); // Aquí puedes enviar los datos a tu backend
  };

  useEffect(() => {
    const startYear = 1905;
    const currentYear = new Date().getFullYear();
    const yearList = [];

    for (let year = currentYear; year >= startYear; year--) {
      yearList.push(year);
    }

    setYears(yearList);
  }, []);

  return (
    <>
      <HeaderPP />
      <main>
        <div className="registro-container">
          <h1>Crea una cuenta</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                name="cedula"
                placeholder="# Cédula"
                value={formData.cedula}
                onChange={handleChange}
              />
              <input
                type="text"
                name="primerNombre"
                placeholder="Primer Nombre"
                value={formData.primerNombre}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="segundoNombre"
                placeholder="Segundo Nombre"
                value={formData.segundoNombre}
                onChange={handleChange}
              />
              <input
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                value={formData.apellidos}
                onChange={handleChange}
              />
            </div>

            <label id="campo">Fecha de nacimiento</label>
            <div className="form-group">
              <div className="form-row">
                <select
                  id="day"
                  name="day"
                  value={formData.day}
                  onChange={handleChange}
                >
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <select
                  id="month"
                  name="month"
                  value={formData.month}
                  onChange={handleChange}
                >
                  <option value="1">Enero</option>
                  <option value="2">Febrero</option>
                  <option value="3">Marzo</option>
                  <option value="4">Abril</option>
                  <option value="5">Mayo</option>
                  <option value="6">Junio</option>
                  <option value="7">Julio</option>
                  <option value="8">Agosto</option>
                  <option value="9">Septiembre</option>
                  <option value="10">Octubre</option>
                  <option value="11">Noviembre</option>
                  <option value="12">Diciembre</option>
                </select>

                <select
                  id="year"
                  name="year"
                  value={formData.year}
                  onChange={handleChange}
                >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <label id="campo">Género</label>
            <div className="radio-group-genero">
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="hombre"
                  checked={formData.genero === 'hombre'}
                  onChange={handleChange}
                />{' '}
                Hombre
              </label>
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="mujer"
                  checked={formData.genero === 'mujer'}
                  onChange={handleChange}
                />{' '}
                Mujer
              </label>
              <label>
                <input
                  type="radio"
                  name="genero"
                  value="otro"
                  checked={formData.genero === 'otro'}
                  onChange={handleChange}
                />{' '}
                Otro
              </label>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="direccion"
                placeholder="Dirección"
                value={formData.direccion}
                onChange={handleChange}
              />
              <input
                type="text"
                name="telefono"
                placeholder="Teléfono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </div>

            <div className="form-group full-width">
              <input
                type="email"
                name="email"
                placeholder="Correo Electrónico"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <input
                type="text"
                name="usuario"
                placeholder="Usuario"
                value={formData.usuario}
                onChange={handleChange}
              />
              <input
                type="password"
                name="password"
                placeholder="Contraseña"
                value={formData.password}
                onChange={handleChange}
              />
            </div>

            <div className="radio-group">
              <label id="campo">Rol</label>
              <label>
                <input
                  type="radio"
                  name="rol"
                  value="cliente"
                  checked={formData.rol === 'cliente'}
                  onChange={handleChange}
                />{' '}
                Cliente
              </label>
              <label>
                <input
                  type="radio"
                  name="rol"
                  value="proveedor"
                  checked={formData.rol === 'proveedor'}
                  onChange={handleChange}
                />{' '}
                Proveedor
              </label>
            </div>

            <div className="btn-container">
              <button type="submit">Registrarse</button>
            </div>
            <div>
              <Link to="/login" className="ya-tiene-cuenta">
                ¿Ya tienes una cuenta?
              </Link>
            </div>
          </form>
        </div>
      </main>
      <FooterPP />
    </>
  );
}

export default Registro;
