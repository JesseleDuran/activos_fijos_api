const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const QueriesNotificaciones = require("../constants/queries/notificaciones");
const QueriesActivo = require("../constants/queries/activo");
const moment = require('moment-timezone');
const schedule = require('node-schedule');

async function getList() {
    try {
        const pool = new Pool();
        await pool.connect();
        const allNotificaciones = await pool.query(QueriesNotificaciones.LIST_NOTIFICACIONES);
        pool.end();
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

async function getListActivos() {
    try {
        const pool = new Pool();
        await pool.connect();
        // vaciar tabla de notificaciones
        await pool.query(QueriesNotificaciones.TRUNCATE_NOTIFICACION);

        const allActivos = await pool.query(QueriesActivo.listActivos({}));
        const activos = allActivos.rows;
        for (let activo of activos) {
            activo.vida_util_faltante_semanas = getRemainingLife(activo, moment().tz("America/Caracas"));
            //se agrega la notificacion si le falta 2 semanas o menos
            if(activo.vida_util_faltante_semanas <= 2) {
                let notificacionObj = {};
                notificacionObj.tipo = 'fin_vida_util';
                notificacionObj.data = activo;
                let newNotificacion = await create(notificacionObj, pool);
                console.log(newNotificacion);
            }
        }
        pool.end();
        var myJob = schedule.scheduledJobs['fin_vida_util_job'];
        myJob.cancel();
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

function getRemainingLife(activo, currentDate) {
    let finVidaUtil = moment(activo.created_at).add(activo.vida_util_meses, 'months').format("YYYY-MM-DD");
    return moment(finVidaUtil).diff(moment(currentDate), 'weeks', true);
}

module.exports = {
    getListActivos,
    getList
};