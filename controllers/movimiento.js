const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const QueriesMovimiento = require("../constants/queries/movimiento");
const QueriesActivo = require("../constants/queries/activo");

async function create(movimientoInfo) {
    try {
        const pool = new Pool();
        await pool.connect();
        const newMovimiento = await pool.query(QueriesMovimiento.CREATE_MOVIMIENTO, Object.values(movimientoInfo));
        const updatedActivo = await pool.query(handleMovimientoType(movimientoInfo));
        pool.end();
        const [movimiento] = newMovimiento.rows;
        [movimiento.activo] = updatedActivo.rows;
        return movimiento;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

function handleMovimientoType(movimientoInfo) {
    switch(movimientoInfo.tipo) {
        case 'asignacion':
            return QueriesActivo.update({'estado_actual': 'Asignado'}, movimientoInfo.n_activo)
            break;
    }
}

module.exports = {
    create
};