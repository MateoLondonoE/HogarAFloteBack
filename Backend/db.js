import pkg from 'pg';
const { Pool } = pkg;

// Configuración de conexión a PostgreSQL
export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'HogarDB',
    password: '123456789',
    port: 5432,
});

