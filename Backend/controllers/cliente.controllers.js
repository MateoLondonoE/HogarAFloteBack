import { pool } from '../db.js'

export const registrarCliente = async (req, res) => {
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

        console.log(req.body);

        const result = await pool.query(`
            INSERT INTO public."Cliente"(
                usuario, "contraseña", tipo_usuario, primer_nombre, segundo_nombre, apellido, direccion, telefono, email, identificacion, fecha_nacimiento, genero)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, TO_DATE($11 || '-' || $12 || '-' || $13, 'YYYY-MM-DD'), $14)`, 
            [
                usuario,
                password,
                rol,
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
                genero
            ]
        );

        console.log(result);
        res.json(result.rowCount);

        

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Error en el servidor');
    }
}

export const getAllClientes = async (req, res) => {
    try {
        const result = await pool.query(`SELECT * FROM public."Cliente"`)

        res.status(200).json(result.rows)

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}


