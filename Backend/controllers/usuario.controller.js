import { pool } from "../db.js";
import bcrypt from 'bcrypt';

export const registrarUsuario = async (req, res) => {
  try {
    const {
      identificacion,password,nombres,tipo_documento,apellidos,year,month,day,genero,direccion,telefono,email,usuario,rol,portafolio
    } = req.body;

    // Declaración de variables para respectivas validaciones
    let passwordBD="";
    let tipo_usuario = 0;
    let estado = false;

    // Validación con género
    const generoIngreso = genero === "mujer" ? 1 : 2;

    //Validacion con cliente
    if (rol === "cliente") {
      tipo_usuario = 1;
      estado=true;
    } else {
      tipo_usuario = 2;
      estado=false;
    }

    // Verificar si la identificación ya existe
    const idExists = await pool.query('SELECT * FROM public."Usuario" WHERE identificacion = $1', [identificacion]);
     if (idExists.rows.length > 0) {
        console.log('Identificación ya registrada con otra cuenta, intente realizar el registro con otra')
        return res.status(400).json({ message: 'Identificación ya registrada con otra cuenta' });
     }

     // Verificar si el correo ya existe
     const emailExists = await pool.query('SELECT * FROM public."Usuario" WHERE email = $1', [email]);
     if (emailExists.rows.length > 0) {
        console.log('Correo ya esta registrado con otra cuenta, intente realizar el registro con otra')
        return res.status(400).json({ message: 'Correo ya esta registrado con otra cuenta' });
     }
     // Verificar si el usuario ya existe
     const userExists = await pool.query('SELECT * FROM public."Usuario" WHERE usuario = $1', [usuario]);
     if (userExists.rows.length > 0) {
        console.log('Nombre de usuario ya registrado con otra cuenta, intente realizar el registro con otra')
        return res.status(400).json({ message: 'Nombre de usuario ya registrado con otra cuenta' });
     }
    console.log(password)
    passwordBD = await bcrypt.hash(password, 10);
    console.log(passwordBD)

    const result = await pool.query(
      `
            INSERT INTO public."Usuario" (
              usuario, "contraseña", tipo_usuario, nombres, apellidos, tipo_documento,
              direccion, telefono, email, identificacion, fecha_nacimiento, genero, estado, imagen
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TO_DATE($11 || '-' || $12 || '-' || $13, 'YYYY-MM-DD'), $14, $15, $16)`,
      [
        usuario,
        passwordBD,
        tipo_usuario,
        nombres,
        apellidos,
        tipo_documento,
        direccion,
        telefono,
        email,
        identificacion,
        year,
        month,
        day,
        generoIngreso,
        estado,
        portafolio,
      ]
    );
    res.status(201).json({ message: 'Usuario registrado exitosamente.', user: result.rows[0] });
    console.log('Usuario registrado exitosamente.');
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Error al registrar usuario. Inténtelo nuevamente más tarde.' });
  }
};

export const getAllUsuarios = async (req, res) => {
  try {
    const result = await pool.query(`SELECT nombres || ' ' || apellidos as "Nombres",email,imagen FROM public."Usuario" where tipo_usuario=2 and estado='false'`);

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await fetchUsuarioById(id);

    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const fetchUsuarioById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public."Usuario" WHERE id = $1`,
      [id]
    );

    if (result.rows.length > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteUsuarioById = async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await fetchUsuarioById(id);
    let nuevoEstado;
    if (usuario.estado === true) {
      nuevoEstado = "false";
    } else {
      nuevoEstado = "true";
    }

    const result = await pool.query(
      `UPDATE public."Usuario" SET estado = $2 WHERE id = $1`,
      [id, nuevoEstado]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Usuario cambió de estado con éxito" });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    let {
      primer_nombre: primerNombre,
      segundo_nombre: segundoNombre,
      apellido: apellidos,
      genero,
      direccion,
      telefono,
      contraseña: password,
    } = req.body;

    const usuarioEncontrado = await fetchUsuarioById(id);

    if (!usuarioEncontrado) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    if (!primerNombre) primerNombre = usuarioEncontrado.primer_nombre;
    if (!segundoNombre) segundoNombre = usuarioEncontrado.segundo_nombre;
    if (!apellidos) apellidos = usuarioEncontrado.apellido;
    if (!genero) genero = usuarioEncontrado.genero;
    if (!direccion) direccion = usuarioEncontrado.direccion;
    if (!telefono) telefono = usuarioEncontrado.telefono;
    if (!password) password = usuarioEncontrado.contraseña;

    console.log(primerNombre);

    const result = await pool.query(
      `UPDATE public."Usuario"
          SET primer_nombre = $1,
              segundo_nombre = $2,
              apellido = $3,
              genero = $4,
              direccion = $5,
              telefono = $6,
              "contraseña" = $7
          WHERE id = $8`,
      [
        primerNombre,
        segundoNombre,
        apellidos,
        genero,
        direccion,
        telefono,
        password,
        id,
      ]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Usuario actualizado con éxito" });
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};


export const loginUsuario = async (req, res) => {
  try {
    const { usuario, contraseña } = req.body;

    // Verifica si el usuario existe en la base de datos
    const result = await pool.query(
      `SELECT "contraseña" FROM public."Usuario" WHERE usuario = $1 AND estado = 'true'`,
      [usuario]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ message: 'Usuario no existe' });
    }

    const contraseñaDB = result.rows[0].contraseña;

    console.log(contraseña)
    console.log(contraseñaDB)

    // Compara la contraseña ingresada con la encriptada
    const esValida = await bcrypt.compare(contraseña, contraseñaDB);
    console.log(esValida)

    if (esValida) {
      // Generar un token (opcional, por ejemplo con JWT)
      const token = "falso-token"; // Cambia esto por JWT si necesitas autenticación basada en token

      return res.status(200).json({ message: 'Inicio de sesión exitoso', token });
    } else {
      return res.status(401).json({ message: 'Contraseña incorrecta' });
    }
  } catch (error) {
    console.error('Error en loginUsuario:', error.message);
    return res.status(500).json({ message: 'Error interno del servidor' });
  }
};

