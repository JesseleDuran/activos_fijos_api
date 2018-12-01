const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const QueriesMovimiento = require("../constants/queries/movimiento");
const QueriesActivo = require("../constants/queries/activo");

async function create(movimientoInfo) {
    try {
        const pool = new Pool();
        await pool.connect();
        let movimientoObj = {};
        movimientoObj.tipo = movimientoInfo.tipo;
        movimientoObj.motivo = movimientoInfo.motivo;
        movimientoObj.tiempo_limite = movimientoInfo.tiempo_limite;
        movimientoObj.ubicacion = movimientoInfo.ubicacion;
        movimientoObj.cod_empresa = movimientoInfo.cod_empresa;
        movimientoObj.n_activo = movimientoInfo.n_activo;
        const newMovimiento = await pool.query(QueriesMovimiento.CREATE_MOVIMIENTO, Object.values(movimientoObj));
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
            return QueriesActivo.update([{'id': 'estado_actual', 'value': 'Asignado'}, {'id': 'cod_personal', 'value': movimientoInfo.cod_personal}], movimientoInfo.n_activo);
            break;
        case 'reasignacion':
            return QueriesActivo.update([{'id':'estado_actual', 'value': 'Reasignado'}, {'id': 'cod_personal', 'value': movimientoInfo.cod_personal}], movimientoInfo.n_activo);
            break;
        case 'prestacion':
            return QueriesActivo.update([{'id': 'estado_actual', 'value': 'En préstamo'}], movimientoInfo.n_activo);
            break; 
        case 'desincorporacion':
            return QueriesActivo.update([{'id': 'estado_actual', 'value': 'Desincorporado'}], movimientoInfo.n_activo);
            break;
        case 'reparacion':
            return QueriesActivo.update([{'id': 'estado_actual', 'value': 'En reparación'}], movimientoInfo.n_activo);
            break;   
    }
}

module.exports = {
    create
};