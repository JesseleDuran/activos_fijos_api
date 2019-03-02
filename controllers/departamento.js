const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/departamento.js");

async function getList() {
    try {
        const pool = new Pool();
        const allDepartamento = await pool.query(Queries.LIST_DEPARTAMENTO);
        await pool.end();
        const departamentos = allDepartamento.rows.map(a => a.departamento).filter(a => a !== null);
        return departamentos;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    getList
};