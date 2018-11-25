const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/movimiento");

async function create(movimientoInfo) {
    try {
        const pool = new Pool();
        await pool.connect();
        const newMovimiento = await pool.query(Queries.CREATE_MOVIMIENTO, Object.values(movimientoInfo));
        pool.end();
        const [movimiento] = newMovimiento.rows;
        return movimiento;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    create
};