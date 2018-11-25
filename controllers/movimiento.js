const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/ubicacionFisica");

async function getList() {
    try {
        const pool = new Pool();
        await pool.connect();
        
        const allUbicacionFisica = await pool.query(Queries.LIST_UBICACION_FISICA);
        pool.end();
        return allUbicacionFisica.rows;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    getList
};