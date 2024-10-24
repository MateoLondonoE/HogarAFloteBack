import { pool } from '../db.js'

export const registrarCliente = async (req, res) => {
    console.log("hoasdfasdfas1")
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
        
        let tipo_usuario = 0
        if(rol === 'cliente'){
            tipo_usuario = 1
        }
        else{
            tipo_usuario = 2
        }


        console.log("asdfasfekl2")
        console.log(req.body);
        
        console.log(rol + "holaaaaaaaaa")

        const result = await pool.query(`
            INSERT INTO public."Cliente"(
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

export const getClienteById = async(req, res)=>{
    try {
        const {id} = req.params
        const result = await pool.query(`SELECT * FROM public."Cliente" WHERE id = $1`, [id])
        
        if(result.length > 0){
            res.status(200).json(result.rows)
        }
        else{
            res.status(404).json({message: "Cliente no encontrado"})
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export const deleteClienteById = async(req, res)=>{
    try {
        const {id} = req.params
        const result = await pool.query(`UPDATE public."Cliente" SET estado = False WHERE id = $1`, [id])

        if(result.length > 0){
            res.status(200).send({ message: "Cliente eliminado con éxito" });
        }
        else{
            res.status(404).json({message: "Cliente no encontrado"})
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}
