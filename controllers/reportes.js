const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/activo");
const moment = require('moment');

async function getList(params) {
    try {
        console.log(Queries.listActivosReportes(params))
        const pool = new Pool();
        await pool.connect();
        const allActivos = await pool.query(Queries.listActivosReportes(params));
        pool.end();
        const activos = allActivos.rows;
        for (let activo of activos) {
            activo.fin_vida_util = getFinVidaUtil(activo.fecha_compra, activo.vida_util_meses);
            activo.depreciacion_por_mes = getDepreciacionMensual(activo.costo_unitario, activo.vida_util_meses);
            activo.meses_depreciados = getMesesDepreciados(activo.fecha_compra, params.report_date);
            activo.depreciacion_acumulada_meses = getDepreciacionAcumulada(activo.depreciacion_por_mes, activo.meses_depreciados);
            activo.valor_neto = getValorNeto(activo.costo_unitario, activo.depreciacion_acumulada_meses);
            
        }
        return activos;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

function getFinVidaUtil(fechaCompra, vidaUtilMeses) {
    return moment(fechaCompra).add(vidaUtilMeses, 'months')
}

function getDepreciacionMensual(costo, vidaUtilMeses) {
    return safeDivision(costo, vidaUtilMeses);
}

function getDepreciacionAcumulada(depreciacionMensual, mesesDepreciados) {
    return (depreciacionMensual * mesesDepreciados).toFixed(2);
}

function getMesesDepreciados(activoFechaIngreso, reportDate) {
    activoFechaIngreso = moment(activoFechaIngreso);
    reportDate = moment(reportDate);
    return reportDate.diff(activoFechaIngreso, 'months');
}

function getValorNeto(costo, depreciacionAcumulada) {
    return (costo - depreciacionAcumulada).toFixed(2);
}

function safeDivision(numerador, denominador) {
    return denominador !== 0 ? (numerador / denominador).toFixed(2) : 0;
}

module.exports = {
    getList
};