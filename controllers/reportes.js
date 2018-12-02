const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/activo");
const moment = require('moment');

async function getList(params) {
    try {
        console.log(Queries.listActivos(params))
        const pool = new Pool();
        await pool.connect();
        const allActivos = await pool.query(Queries.listActivos(params));
        pool.end();
        const activos = allActivos.rows;
        for (let activo of activos) {
            activo.vida_util_faltante_meses = getRemainingLife(activo, params.current_date);
            activo.depreciacion_acumulada_meses = getDepreciacion(activo, params.current_date, params.report_date, activo.vida_util_meses);
            activo.depreciacion_por_mes = (activo.vida_util_meses !== 0) ? (activo.costo/activo.vida_util_meses) : 0;
        }
        return activos;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

function getDepreciacion(activo, currentDate, reportDate, vidaUtil) {
    return (vidaUtil !== 0) ? ((activo.costo/vidaUtil) * moment(reportDate).diff(moment(currentDate), 'months', true)) : 0;
}

function getRemainingLife(activo, currentDate) {
    let finVidaUtil = moment(activo.created_at).add(activo.vida_util_meses, 'months').format("YYYY-MM-DD");
    return moment(finVidaUtil).diff(moment(currentDate), 'months', true);
}

module.exports = {
    getList
};