import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function Registro() {
  const navigate = useNavigate();
  const [errores, setErrores] = useState({});
  const [years, setYears] = useState([]);
  const [mostrarCampo, setMostrarCampo] = useState(false);
  const [colorMensaje, setColorMensaje] = useState("red"); // Por defecto, rojo

  // Estado para los valores del formulario
  const [formData, setFormData] = useState({
    identificacion: '',
    nombres: '',
    tipo_documento: '',
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
    portafolio: ''
  });
  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "portafolio" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onload = () => {
        setFormData((prevState) => ({
          ...prevState,
          [name]: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });

      if (name === "rol") {
        setMostrarCampo(value === "proveedor");
      }

      // Limpiar errores al escribir
      setErrores((prevErrores) => ({
        ...prevErrores,
        [name]: undefined, // Limpia el error del campo actual
      }));
    }
  };
  // Validar el formulario
  const validarFormulario = () => {
    const nuevosErrores = {};

    // Validaciones campo a campo
    if (!formData.identificacion.trim()) nuevosErrores.identificacion = "Este campo es obligatorio";
    else if (formData.identificacion.length < 5 || formData.identificacion.length > 20) 
        nuevosErrores.identificacion = "Debe tener más de 5 caracteres.";

    if (!formData.email.trim()) nuevosErrores.email = "Este campo es obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) nuevosErrores.email = "El correo electrónico no es válido.";

    if (!formData.direccion.trim()) nuevosErrores.direccion = "Este campo es obligatorio";
    else if (formData.direccion.length < 6 || formData.direccion.length > 20) 
        nuevosErrores.direccion = "Debe tener más de 6 caracteres.";

    if (!formData.usuario.trim()) nuevosErrores.usuario = "Este campo es obligatorio";
    else if (formData.usuario.length < 5 || formData.usuario.length > 20) 
        nuevosErrores.usuario = "Debe tener más de 5 caracteres.";

    if (!formData.password.trim()) nuevosErrores.password = "Este campo es obligatorio";
    else if (formData.password.length < 8 || formData.password.length > 20) 
        nuevosErrores.password = "Debe tener más de 8 caracteres.";

    if (formData.rol === "proveedor" && !formData.portafolio) nuevosErrores.portafolio = "Este campo es obligatorio";

    // Validaciones específicas para nombres y apellidos
    if (!formData.nombres.trim()) {
      nuevosErrores.nombres = "Este campo es obligatorio.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.nombres)) {
      nuevosErrores.nombres = "Debe contener solo letras.";
    } else if (formData.nombres.length < 3 || formData.nombres.length > 50) {
      nuevosErrores.nombres = "Debe tener más de 3 caracteres.";
    }

    if (!formData.tipo_documento.trim()) {
      nuevosErrores.tipo_documento = "Este campo es obligatorio.";
    }

    if (!formData.apellidos.trim()) {
      nuevosErrores.apellidos = "Este campo es obligatorio.";
    } else if (!/^[a-zA-Z\s]+$/.test(formData.apellidos)) {
      nuevosErrores.apellidos = "Debe contener solo letras.";
    } else if (formData.apellidos.length < 3 || formData.apellidos.length > 50) {
      nuevosErrores.apellidos = "Debe tener más de 3 caracteres.";
    }

    // Validación de teléfono
    if (!formData.telefono.trim()) {
      nuevosErrores.telefono = "Este campo es obligatorio.";
    } else if (!/^\d+$/.test(formData.telefono)) {
      nuevosErrores.telefono = "Debe contener solo números.";
    } else if (formData.telefono.length < 7 || formData.telefono.length > 15) {
      nuevosErrores.telefono = "Debe tener más de 7 caracteres.";
    }

     // Validación de la fecha de nacimiento
     const fechaNacimiento = new Date(`${formData.year}-${formData.month}-${formData.day}`);
     const hoy = new Date();
     const edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
     const diferenciaMeses = hoy.getMonth() - fechaNacimiento.getMonth();
     const diferenciaDias = hoy.getDate() - fechaNacimiento.getDate();
 
     if (!formData.day || !formData.month || !formData.year || isNaN(fechaNacimiento.getTime())) {
         nuevosErrores.fechaNacimiento = "Selecciona una fecha valida.";
     } else if (
         edad < 18 ||
         (edad === 18 && diferenciaMeses < 0) ||
         (edad === 18 && diferenciaMeses === 0 && diferenciaDias < 0)
     ) {
         nuevosErrores.fechaNacimiento = "Debes ser mayor de 18 años.";
     }

    if (!formData.genero.trim()) nuevosErrores.genero = "Selecciona un género.";
    if (!formData.rol.trim()) nuevosErrores.rol = "Selecciona un rol.";

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0; // Devuelve true si no hay errores
};

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validarFormulario()) return;

  try {
    
    const response = await axios.post("http://localhost:3000/api/v1/usuario/", formData);

    // Si la respuesta es exitosa, restablecemos errores y redirigimos
    setErrores({ global: "Usuario registrado exitosamente" });
    setColorMensaje("green");
    e.target.reset();
    // Esperar 5 segundos antes de redirigir al login
    setTimeout(() => {
      navigate('/login'); // Redirigir al login
    }, 3000); // 5000 ms = 5 segundos
  } catch (error) {
    // Si hay un error, mostramos el mensaje de error
    if (error.response && error.response.data && error.response.data.message) {
      setErrores({ global: error.response.data.message });
      setColorMensaje("red");
    } else {
      setErrores({ global: "Error en el registro. Inténtelo de nuevo." });
    }
  }
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
      <main>
        <div className="registro-container">
          <h1>Crea una cuenta</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              {errores.tipo_documento && <p className="error-text-msj">{errores.tipo_documento}</p>}
              {errores.identificacion && <p className="error-text-msj">{errores.identificacion}</p>}
            </div> 
            <div className="form-group">
              <select id="tipo_documento" name="tipo_documento" value={formData.tipo_documento} onChange={handleChange}>
                  <option value="">TIPO DE DOCUMENTO</option>
                  <option value="CEDULA DE CIUDADANIA">CEDULA DE CIUDADANIA</option>
                  <option value="CEDULA DE EXTRANJERIA">CEDULA DE EXTRANJERIA</option>
                  <option value="NIT">NIT</option>
                  <option value="NUMERO UNICO DE IDENTIFICACION PERSONAL">NUMERO UNICO DE IDENTIFICACION PERSONAL</option>
                  <option value="PASAPORTE">PASAPORTE</option>
                  <option value="PERMISO ESPECIAL DE PERMANENCIA">PERMISO ESPECIAL DE PERMANENCIA</option>
              </select>
              <input
                type="text"
                name="identificacion"
                placeholder="# Cédula"
                value={formData.identificacion}
                className={errores.identificacion ? "input-error" : ""}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              {errores.nombres && <p className="error-text-msj">{errores.nombres}</p>}
              {errores.apellidos && <p className="error-text-msj">{errores.apellidos}</p>}
            </div> 
            <div className="form-group">
              <input type="text" name="nombres" placeholder="Nombres" value={formData.nombres} 
              className={errores.nombres ? "input-error" : ""} onChange={handleChange}/>
              <input type="text" name="apellidos" placeholder="Apellidos" value={formData.apellidos} 
              className={errores.apellidos ? "input-error" : ""} onChange={handleChange}
              />
            </div>
            
            <label id="campo">{errores.fechaNacimiento && <p className="error-text-msj">{errores.fechaNacimiento}</p>}Fecha de nacimiento</label>
            <div className="form-group">
              <div className="form-row">
                <select id="day" name="day" value={formData.day} className={errores.year ? "input-error" : ""} onChange={handleChange} >
                  {[...Array(31)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>
                <select id="month" name="month" value={formData.month} className={errores.month ? "input-error" : ""} onChange={handleChange}>
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
                <select id="year" name="year" value={formData.year} className={errores.year ? "input-error" : ""} onChange={handleChange} >
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <label id="campo">{errores.genero && <p className="error-text-msj">{errores.genero}</p>}Género</label>
            <div className="radio-group-genero">
              <label className={errores.genero ? "input-error" : ""} >
                <input type="radio" name="genero" value="hombre" className={errores.genero ? "input-error" : ""} checked={formData.genero === 'hombre'} onChange={handleChange}/>{' '}
                Hombre
              </label>
              <label>
                <input
                  type="radio" name="genero" value="mujer" className={errores.genero ? "input-error" : ""} checked={formData.genero === 'mujer'} onChange={handleChange}/>{' '}
                Mujer
              </label>
            </div>
            <div className="form-group">
              {errores.direccion && <p className="error-text-msj">{errores.direccion}</p>}
              {errores.telefono && <p className="error-text-msj">{errores.telefono}</p>}
              </div>      
            <div className="form-group">
              <input type="text" name="direccion" placeholder="Dirección" value={formData.direccion} 
              className={errores.direccion ? "input-error" : ""} onChange={handleChange} />
              <input type="text" name="telefono" placeholder="Teléfono" value={formData.telefono} 
              className={errores.telefono ? "input-error" : ""} onChange={handleChange}
              />
            </div>
            <div className="form-group">
            {errores.email && <p className="error-text-msj">{errores.email}</p>}
            </div>
            <div className="form-group full-width">
              <input type="email" name="email" placeholder="Correo Electrónico" value={formData.email} 
              className={errores.email ? "input-error" : ""} onChange={handleChange} />
            </div>
            <div className="form-group">
              {errores.usuario && <p className="error-text-msj">{errores.usuario}</p>}
              {errores.password && <p className="error-text-msj">{errores.password}</p>}
            </div>
            <div className="form-group">
              <input type="text" name="usuario" placeholder="Usuario" value={formData.usuario} 
              className={errores.usuario ? "input-error" : ""} onChange={handleChange} />
              <input
                type="password" name="password" placeholder="Contraseña" 
                className={errores.password ? "input-error" : ""} value={formData.password} onChange={handleChange}/>
            </div>

            {mostrarCampo && ( // Renderizar el campo solo si mostrarCampo es true
              <label id="campo">Portafolio
                <div className="form-group full-width">
                  <input type="file" name="portafolio" placeholder="Portafolio de trabajo" 
                  className={errores.portafolio ? "input-error" : ""} onChange={handleChange} />
                </div>
              </label>
            )}
            <div className="radio-group">
              <label id="campo">{errores.rol && <p className="error-text-msj">{errores.rol}</p>}Rol</label>
              <label>
                <input type="radio" name="rol" value="cliente" checked={formData.rol === 'cliente'} 
                className={errores.rol ? "input-error" : ""} onChange={handleChange} />{' '}
                Cliente
              </label>
              <label>
                <input type="radio" name="rol" value="proveedor" checked={formData.rol === 'proveedor'} 
                className={errores.rol ? "input-error" : ""} onChange={handleChange} />{' '}
                Proveedor
              </label>
            </div>
            <div className="btn-container">
              <button type="submit">Registrarse</button>
            </div>
            {errores.global && (
              <div className="mensaje-error" style={{ color: colorMensaje }}>
                {errores.global}
              </div>
            )}
            <div>
              <Link to="/login" className="ya-tiene-cuenta">
                ¿Ya tienes una cuenta?
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Registro;
