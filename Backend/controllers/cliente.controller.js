import { pool } from "../db.js";

export const newCita = async (req, res) => {
  try {
    const {
      descripcion,
      precio,
      year,
      month,
      day,
      ubicacion,
      id_servicio,
      id_usuario,
    } = req.body;

    const result = await pool.query(
      `INSERT INTO public."Cita"(
	descripcion, precio, fecha, ubicacion, id_servicio, id_usuario)
	VALUES ($1, $2, TO_DATE($3 || '-' || $4 || '-' || $5, 'YYYY-MM-DD'), $6, $7, $8)`,
      [
        descripcion,
        precio,
        year,
        month,
        day,
        ubicacion,
        id_servicio,
        id_usuario,
      ]
    );

    res.status(200).json({ message: "Cita agendada con éxito" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getAllCitas = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(
      `SELECT * FROM public."Cita" WHERE id_usuario = $1`,
      [id]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
      `SELECT * FROM public."Cita" WHERE id_usuario = $1`,
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
    if (nuevoEstado === true) {
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

    console.log(year)
    console.log(month)
    console.log(day)

    // Asigna valores por defecto si no se proporcionaron en el cuerpo de la solicitud
    if (!descripcion) descripcion = cita.descripcion;
    if (!precio) precio = cita.precio;
    if (!year) year = cita.year;
    if (!month) month = cita.month;
    if (!day) day = cita.day;
    if (!ubicacion) ubicacion = cita.ubicacion;

    // // Verificar que year, month, y day tengan valores válidos
    // if (!year || !month || !day) {
    //   return res
    //     .status(400)
    //     .json({ message: "La fecha es inválida o incompleta." });
    // }

    console.log(year)
    console.log(month)
    console.log(day)

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
