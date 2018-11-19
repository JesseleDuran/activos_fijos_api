const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/ordenCompra");

async function getList() {
    try {
        const pool = new Pool();
        await pool.connect();
        
        const findAllOrdenCompra = await pool.query(Queries.LIST_ORDEN_COMPRA);
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