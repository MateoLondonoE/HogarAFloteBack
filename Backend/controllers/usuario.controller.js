import { pool } from "../db.js";

export const registrarUsuario = async (req, res) => {
  try {
    const {
      identificacion,
      primerNombre,
      segundoNombre,
      apellidos,
      year,
      month,
      day,
      genero,
      direccion,
      telefono,
      email,
      usuario,
      password,
      rol,
    } = req.body;

    let tipo_usuario = 0;
    if (rol === "cliente") {
      tipo_usuario = 1;
    } else {
      tipo_usuario = 2;
    }

    const result = await pool.query(
      `
            INSERT INTO public."Usuario"(
                usuario, "contraseña", tipo_usuario, primer_nombre, segundo_nombre, apellido, direccion, telefono, email, identificacion, fecha_nacimiento, genero)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TO_DATE($11 || '-' || $12 || '-' || $13, 'YYYY-MM-DD'), $14)`,
      [
        usuario,
        password,
        tipo_usuario,
        primerNombre,
        segundoNombre,
        apellidos,
        direccion,
        telefono,
        email,
        identificacion,
        year,
        month,
        day,
        genero,
      ]
    );

    console.log(result);
    res.json(result.rows);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

export const getAllUsuarios = async (req, res) => {
  try {
    const result = await pool.query(`SELECT * FROM public."Usuario"`);

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

    const result = await pool.query(
      `SELECT "contraseña" FROM public."Usuario" WHERE usuario = $1`,
      [usuario]
    );

    let contraseñaDB = result.rows[0].contraseña;

    if (contraseña === contraseñaDB) {
      res.status(200).json(true);
    } else {
      res.status(401).json(false);
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
