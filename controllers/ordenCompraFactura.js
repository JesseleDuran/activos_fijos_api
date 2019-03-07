const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/ordenCompraFactura");

async function getList() {
    try {
        const pool = new Pool();    
        const allOrdenCompra = await pool.query(Queries.LIST_ORDEN_COMPRA_FACTURA);
        await pool.end();
        return allOrdenCompra.rows;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    getList
};