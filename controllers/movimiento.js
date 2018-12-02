const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const QueriesMovimiento = require("../constants/queries/movimiento");
const QueriesActivo = require("../constants/queries/activo");

async function create(movimientoInfo, user) {
    try {
        const pool = new Pool();
        await pool.connect();
        let movimientos = [];
        for (let numActivo of movimientoInfo.n_activos) {
            let movimientoObj = {};
            movimientoObj.tipo = movimientoInfo.tipo;
            movimientoObj.motivo = movimientoInfo.motivo;
            movimientoObj.tiempo_limite = movimientoInfo.tiempo_limite;
            movimientoObj.ubicacion = movimientoInfo.ubicacion;
            movimientoObj.cod_empresa = movimientoInfo.cod_empresa;
            movimientoObj.n_activo = numActivo;
            movimientoObj.cod_personal_involucrado = movimientoInfo.cod_personal_involucrado;
            movimientoObj.cod_usuario_aprobador = user.codusu;
            const newMovimiento = await pool.query(QueriesMovimiento.CREATE_MOVIMIENTO, Object.values(movimientoObj));
            const updatedActivo = await pool.query(handleMovimientoType(movimientoInfo, numActivo));
            movimientos.push(newMovimiento.rows[0]);
        }
        pool.end();
        return movimientos;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

function handleMovimientoType(movimientoInfo, numActivo) {
    switch(movimientoInfo.tipo) {
        case 'asignacion':
            return QueriesActivo.update([{'id': 'estado_actual', 'value': 'Asignado'}, {'id': 'cod_personal', 'value': movimientoInfo.cod_personal_involucrado}], numActivo);
            break;
        case 'reasignacion':
            return QueriesActivo.update([{'id':'estado_actual', 'value': 'Reasignado'}, {'id': 'cod_personal', 'value': movimientoInfo.cod_personal_involucrado}], numActivo);
            break;
        case 'prestacion':
            return QueriesActivo.update([{'id': 'estado_actual', 'value': 'En préstamo'}], numActivo);
            break; 
        case 'desincorporacion':
            return QueriesActivo.update([{'id': 'estado_actual', 'value': 'En proceso de desincorporación'}], numActivo);
            break;
        case 'reparacion':
            return QueriesActivo.update([{'id': 'estado_actual', 'value': 'En reparación'}], numActivo);
            break;   
    }
}

module.exports = {
    create
};