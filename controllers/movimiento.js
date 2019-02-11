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
            if(movimientoInfo.tipo === 'asignacion' || movimientoInfo.tipo === 'reasignacion') {
                if(movimientoInfo.hasOwnProperty('codigo_unidad_administrativa')) {
                    await QueriesActivo.update([{'id': 'codigo_unidad_administrativa', 'value': movimientoInfo.codigo_unidad_administrativa}], numActivo);
                }

                if(movimientoInfo.hasOwnProperty('ubicacion_geografica')) {
                    await QueriesActivo.update([{'id': 'ubicacion_geografica', 'value': movimientoInfo.ubicacion_geografica}], numActivo);
                }

                if(movimientoInfo.hasOwnProperty('cod_personal_involucrado')) {
                    await QueriesActivo.update([{'id': 'codigo_personal', 'value': movimientoInfo.cod_personal_involucrado}], numActivo);
                }
            }
            movimientos.push(newMovimiento.rows[0]);
        }
        pool.end();
        return movimientos;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function show(movimientoId) {
    try {
        const pool = new Pool();
        await pool.connect();
        const movimientoInfo = await pool.query(QueriesMovimiento.GET_MOVIMIENTO, [movimientoId]);
        pool.end();
        const [movimiento] = movimientoInfo.rows;
        return movimiento;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

function handleMovimientoType(movimientoInfo, numActivo) {
    switch(movimientoInfo.tipo) {
        case 'asignacion':
            return QueriesActivo.update([{'id': 'estatus', 'value': 'Asignado'}], numActivo);
            break;
        case 'reasignacion':
            return QueriesActivo.update([{'id':'estatus', 'value': 'Reasignado'}], numActivo);
            break;
        case 'prestamo':
            return QueriesActivo.update([{'id': 'estatus', 'value': 'En préstamo'}], numActivo);
            break; 
        case 'desincorporacion':
            return QueriesActivo.update([{'id': 'estatus', 'value': 'En proceso de desincorporación'}], numActivo);
            break;
        case 'reparacion':
            return QueriesActivo.update([{'id': 'estatus', 'value': 'En reparación'}], numActivo);
            break;   
    }
}

module.exports = {
    create,
    show
};