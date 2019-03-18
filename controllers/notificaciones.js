const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const QueriesNotificaciones = require("../constants/queries/notificaciones");
const QueriesActivo = require("../constants/queries/activo");
const QueriesMovimientos = require("../constants/queries/movimiento");
const moment = require('moment-timezone');
const schedule = require('node-schedule');

async function getList() {
    try {
        const pool = new Pool();
        const allNotificaciones = await pool.query(QueriesNotificaciones.LIST_NOTIFICACIONES);
        await pool.end();
        return allNotificaciones.rows;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function create(notificacionInfo, pool) {
    try {
        let notificacionObj = {};
        notificacionObj.tipo = notificacionInfo.tipo;
        notificacionObj.data = notificacionInfo.data;
        const newNotificacion = await pool.query(QueriesNotificaciones.CREATE_NOTIFICACION, Object.values(notificacionObj));
        const [notificacion] = newNotificacion.rows;
        return notificacion;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function emptyNotificationsTable() {
    try {
        const pool = new Pool();
        // vaciar tabla de notificaciones
        await pool.query(QueriesNotificaciones.TRUNCATE_NOTIFICACION);
        await pool.end();
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function createEndOfLifeNotifications() {
    try {
        const pool = new Pool();
        await emptyNotificationsTable()

        const allActivos = await pool.query(QueriesActivo.listActivos({}));
        const activos = allActivos.rows;
        for (let activo of activos) {
            activo.vida_util_faltante_dias = getRemainingLife(activo, moment().tz("America/Caracas"));
            //se agrega la notificacion si le falta 2 meses o menos
            if(activo.vida_util_faltante_dias <= 65 && activo.vida_util_faltante_dias >= 0) {
                let notificacionObj = {};
                notificacionObj.tipo = 'fin_vida_util';
                notificacionObj.data = activo;
                let newNotificacion = await create(notificacionObj, pool);
            }
        }
        await pool.end();
        var myJob = schedule.scheduledJobs['fin_vida_util_job'];
        myJob.cancel();
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

function getRemainingLife(activo, currentDate) {
    let finVidaUtil = moment(activo.fecha_compra).add(activo.vida_util_meses, 'months').format("YYYY-MM-DD");
    return moment(finVidaUtil).diff(moment(currentDate), 'days');
}

async function createBorrowingReturnNotifications() {
    try {
        const pool = new Pool();
        await emptyNotificationsTable()

        const listMovimientos = await pool.query(QueriesMovimientos.listMovimientos({'filtered': [{'id': 'tipo', 'value': 'prestamo'}]}));
        const movimientos = listMovimientos.rows;
        for (let movimiento of movimientos) {
            movimiento.tiempo_faltante_retorno = getTimeLeftToReturn(movimiento, moment().tz("America/Caracas"));
            //se agrega la notificacion si le falta 2 meses o menos
            if(movimiento.tiempo_faltante_retorno <= 65 && movimiento.tiempo_faltante_retorno >= 0) {
                let notificacionObj = {};
                notificacionObj.tipo = 'fin_prestamo';
                notificacionObj.data = movimiento;
                let newNotificacion = await create(notificacionObj, pool);
            }
        }
        await pool.end();
        var myJob = schedule.scheduledJobs['fin_prestamo'];
        myJob.cancel();
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

function getTimeLeftToReturn(movimiento, currentDate) {
    return moment(movimiento.tiempo_limite).diff(moment(currentDate), 'days');
}

module.exports = {
    createEndOfLifeNotifications,
    createBorrowingReturnNotifications,
    getList
};