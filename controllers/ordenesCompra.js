const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");

const listActivosQuery = 'SELECT * FROM soc_ordencompra'

async function getList() {
    try {
        const pool = new Pool();
        await pool.connect();
        
        const findAllOrdenCompra = await pool.query(listActivosQuery);
        pool.end();
        return findAllOrdenCompra.rows;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    getList
};