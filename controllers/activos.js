const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");

const createActivoQuery = 'INSERT INTO saf_activos'
+ '(modelo, ubicacion_geografica, is_depreciable, serial, descripcion, id_soc_ordencompra, vida_util, estado_actual, clasificacion, marca)' 
+ 'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *';

const listActivosQuery = 'SELECT * FROM saf_activos';
const getActivoQuery = 'SELECT * FROM saf_activos WHERE id = $1';
const deleteActivoQuery = 'DELETE FROM saf_activos WHERE id = $1';
const getClasificacionQuery = 'SELECT DISTINCT clasificacion FROM saf_activos';

async function create(activoInfo, image) {
    try {
        const pool = new Pool();
        await pool.connect();
        
        const newActivo = await pool.query(createActivoQuery, Object.values(activoInfo));
        pool.end();
        const [activo] = newActivo.rows;
        return activo;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function getList() {
    try {
        const pool = new Pool();
        await pool.connect();
        
        const findAllActivos = await pool.query(listActivosQuery);
        pool.end();
        return findAllActivos.rows;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function show(activoId) {
    try {
        const pool = new Pool();
        await pool.connect();
        const getActivo = await pool.query(getActivoQuery, [activoId]);
        pool.end();
        const [activo] = getActivo.rows;
        return activo;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function deleteActivo(activoId) {
    try {
        const pool = new Pool();
        await pool.connect();
        const getActivo = await pool.query(deleteActivoQuery, [activoId]);
        pool.end();
        return { success: true };
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function getClasificacion() {
    try {
        const pool = new Pool();
        await pool.connect();
        const getClasificaciones = await pool.query(getClasificacionQuery);
        pool.end();
        const clasificaciones = getClasificaciones.rows.map(a => a.clasificacion);
        return clasificaciones;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    create,
    getList,
    show,
    deleteActivo,
    getClasificacion
};