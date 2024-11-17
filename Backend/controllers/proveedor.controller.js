import { pool } from "../db.js";

//CRUD SERVICIOS
export const newServicio = async (req, res) => {
  try {
    const { nombre, descripcion, precio_inicial, id_usuario } = req.body;

    const result = await pool.query(
      `INSERT INTO public."Servicio"(
        nombre, descripcion, precio_inicial, id_usuario)
        VALUES ($1, $2, $3, $4)`,
      [nombre, descripcion, precio_inicial, id_usuario]
    );

    res.status(200).json("Servicio añadido con éxito");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllServicios = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM public."Servicio" WHERE id_usuario = $1`,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicio = await fetchServicioById(id);

    if (servicio) {
      res.status(200).json(servicio);
    } else {
      res.status(404).json({ message: "Servicio no encontrado!" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const fetchServicioById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public."Servicio" WHERE id = $1`,
      [id]
    );

    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteServicioById = async (req, res) => {
  try {
    const { id } = req.params;
    const servicio = await fetchServicioById(id);

    let nuevoEstado;
    if (servicio.estado === true) {
      nuevoEstado = "false";
    } else {
      nuevoEstado = "true";
    }

    const result = await pool.query(
      `UPDATE public."Servicio" SET estado = $1 WHERE id = $2`,
      [nuevoEstado, id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Servicio cambió de estado con éxito" });
    } else {
      res.status(404).json({ message: "Servicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateServicio = async (req, res) => {
  try {
    const { id } = await req.params;
    let { nombre, descripcion, precio_inicial } = req.body;

    const servicio = await fetchServicioById(id);

    if (!servicio) {
      res.status(404).json({ message: "Servicio no encontrado" });
    }

    if (!nombre) nombre = servicio.nombre;
    if (!descripcion) descripcion = servicio.descripcion;
    if (!precio_inicial) precio_inicial = servicio.precio_inicial;

    console.log(descripcion);

    const result = await pool.query(
      `UPDATE public."Servicio" SET nombre = $1, descripcion = $2, precio_inicial = $3 WHERE id=$4`,
      [nombre, descripcion, precio_inicial, id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Servicio actualizado con éxito" });
    } else {
      res.status(404).json({ message: "Servicio no encontrado" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//CRUD CITAS
export const getAllCitas = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `SELECT public."Cita".* FROM public."Cita"
      JOIN public."Servicio" ON public."Cita".id_servicio = public."Servicio".id
      JOIN public."Usuario" ON public."Servicio".id_usuario = public."Usuario".id
      WHERE public."Usuario".id = $1`,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ messge: error.message });
  }
};

export const getCitaById = async (req, res) => {
  try {
    const { id } = req.params;

    const cita = await fetchCitaById(id);

    if (cita) {
      res.status(200).json(cita);
    } else {
      res.status(404).json({ message: "Cita no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const fetchCitaById = async (id) => {
  try {
    const result = await pool.query(
      `SELECT * FROM public."Cita" WHERE id = $1`,
      [id]
    );

    if (result.rowCount > 0) {
      return result.rows[0];
    } else {
      return null;
    }
  } catch (error) {
    throw error;
  }
};

export const deleteCita = async (req, res) => {
  try {
    const { id } = req.params;
    const cita = await fetchCitaById(id);

    let nuevoEstado;
    if (cita.estado === true) {
      nuevoEstado = "false";
    } else {
      nuevoEstado = "true";
    }

    const result = await pool.query(
      `UPDATE public."Cita" SET estado = $1 WHERE id = $2`,
      [nuevoEstado, id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Cita cambió de estado con éxito" });
    } else {
      res.status(404).json({ message: "Cita no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCita = async (req, res) => {
  try {
    const { id } = req.params;
    let { descripcion, precio, year, month, day, ubicacion } = req.body;

    const cita = await fetchCitaById(id);

    if (!cita) {
      return res.status(404).json({ message: "Cita no encontrada" });
    }

    // Asigna valores por defecto de la anterior cita si no se proporcionan en la solicitud
    if (!descripcion) descripcion = cita.descripcion;
    if (!precio) precio = cita.precio;
    if (!year || !month || !day) {
      const fecha = new Date(cita.fecha);
      if (!year) year = fecha.getFullYear();
      if (!month) month = fecha.getMonth() + 1; // getMonth() devuelve un índice de 0 a 11, por eso sumamos 1
      if (!day) day = fecha.getDate();
    }
    if (!ubicacion) ubicacion = cita.ubicacion;

    const result = await pool.query(
      `UPDATE public."Cita" 
       SET descripcion = $1, 
           precio = $2, 
           fecha = TO_DATE($3 || '-' || $4 || '-' || $5, 'YYYY-MM-DD'), 
           ubicacion = $6 
       WHERE id = $7`,
      [descripcion, precio, year, month, day, ubicacion, id]
    );

    if (result.rowCount > 0) {
      res.status(200).json({ message: "Cita actualizada con éxito" });
    } else {
      res.status(404).json({ message: "Cita no encontrada" });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
