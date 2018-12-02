const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/personal");

async function getList(params) {
    try {
        const pool = new Pool();
        await pool.connect();
        const allPersonal = await pool.query(Queries.listPersonal(params));
        pool.end();
        return allPersonal.rows;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    getList
};