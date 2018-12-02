const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/activo");

async function create(activoInfo, image) {
    try {
        const pool = new Pool();
        await pool.connect();
        let activoObj = {};
        activoObj.n_activo = activoInfo.n_activo;
        activoObj.modelo = activoInfo.n_activo;
        activoObj.is_depreciable = activoInfo.is_depreciable;
        activoObj.serial = activoInfo.serial;
        activoObj.descripcion = activoInfo.descripcion;
        activoObj.numero_orden_compra = activoInfo.numero_orden_compra;
        activoObj.vida_util_meses = activoInfo.vida_util_meses;
        activoObj.clasificacion = activoInfo.clasificacion;
        activoObj.marca = activoInfo.marca;
        activoObj.cod_empresa = activoInfo.cod_empresa;
        activoObj.cod_ubicacion_geografica = activoInfo.cod_ubicacion_geografica;
        activoObj.costo = activoInfo.costo;
        
        const newActivo = await pool.query(Queries.CREATE_ACTIVO, Object.values(activoObj));
        pool.end();
        const [activo] = newActivo.rows;
        return activo;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function getList(params) {
    try {
        console.log(Queries.listActivos(params))
        const pool = new Pool();
        await pool.connect();
        const allActivos = await pool.query(Queries.listActivos(params));
        pool.end();
        return allActivos.rows;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function getListByMovement(params) {
    try {
        let query = '';
        switch (params.tipo) {
            case 'asignacion':
                query = Queries.update([{'id': 'estado_actual', 'value': 'Asignado'}, {'id': 'cod_personal', 'value': movimientoInfo.cod_personal_involucrado}], numActivo);
            break;
            case 'reasignacion':
                query =  Queries.update([{'id':'estado_actual', 'value': 'Reasignado'}, {'id': 'cod_personal', 'value': movimientoInfo.cod_personal_involucrado}], numActivo);
            break;
            case 'prestacion':
                query = Queries.update([{'id': 'estado_actual', 'value': 'En préstamo'}], numActivo);
            break; 
            case 'desincorporacion':
                query = Queries.update([{'id': 'estado_actual', 'value': 'En proceso de desincorporación'}], numActivo);
            break;
            case 'reparacion':
                query = Queries.update([{'id': 'estado_actual', 'value': 'En reparación'}], numActivo);
            break;
            default:
                break;
        }
        /*const pool = new Pool();
        await pool.connect();
        const allActivos = await pool.query(Queries.listActivos(params));
        pool.end();
        return allActivos.rows;*/
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function show(activoId) {
    try {
        const pool = new Pool();
        await pool.connect();
        const activoInfo = await pool.query(Queries.GET_ACTIVO, [activoId]);
        pool.end();
        const [activo] = activoInfo.rows;
        return activo;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function deleteActivo(activoId) {
    try {
        const pool = new Pool();
        await pool.connect();
        await pool.query(Queries.DELETE_ACTIVO, [activoId]);
        pool.end();
        return { success: true };
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function getClasificaciones() {
    try {
        const pool = new Pool();
        await pool.connect();
        const clasificacionesInfo = await pool.query(Queries.GET_CLASIFICACIONES);
        pool.end();
        const clasificaciones = clasificacionesInfo.rows.map(a => a.clasificacion);
        return clasificaciones;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function getMarcas() {
    try {
        const pool = new Pool();
        await pool.connect();
        const marcasInfo = await pool.query(Queries.GET_MARCAS);
        pool.end();
        const marcas = marcasInfo.rows.map(a => a.marca);
        return marcas;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

module.exports = {
    create,
    getList,
    show,
    deleteActivo,
    getClasificaciones,
    getMarcas,
    getListByMovement
};