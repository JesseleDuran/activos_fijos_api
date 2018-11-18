const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");

const createActivo = 'INSERT INTO saf_activos'
+ '(modelo, ubicacion_geografica, is_depreciable, serial, descripcion, id_soc_ordencompra, vida_util, estado_actual, clasificacion, marca)' 
+ 'VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *'

async function create(activoInfo, image) {
    try {
        const pool = new Pool();
        await pool.connect();
        
        newActivo = await pool.query(createActivo, Object.values(activoInfo))
        pool.end();
        const [activo] = newActivo.rows;
        return { activo: activo };
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    create,
};