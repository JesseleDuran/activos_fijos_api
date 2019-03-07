const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/ubicacionAdministrativa.js");

async function getList() {
    try {
        const pool = new Pool();
        const allUbicacionAdministrativa = await pool.query(Queries.LIST_UBICACION_ADMINISTRATIVA);
        await pool.end();
        const ubicacionesAdministrativas = allUbicacionAdministrativa.rows.map(a => a.ubicacion_administrativa).filter(a => a !== null);
        return ubicacionesAdministrativas;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    getList
};