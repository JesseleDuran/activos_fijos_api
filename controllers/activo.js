const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/activo");
const QueriesMovimiento = require("../constants/queries/movimiento");

async function create(activoInfo, image) {
    try {
        const pool = new Pool();
        await pool.connect();
        let activoObj = {};
        activoObj.modelo = activoInfo.modelo;
        activoObj.codigo_articulo = activoInfo.codigo_articulo;
        activoObj.serial = activoInfo.serial;
        activoObj.descripcion = activoInfo.descripcion_activo;
        activoObj.vida_util_meses = activoInfo.vida_util_meses;
        activoObj.clasificacion = activoInfo.clasificacion;
        activoObj.marca = activoInfo.marca;
        activoObj.codigo_empresa = activoInfo.cod_empresa;
        activoObj.n_activo = activoInfo.n_activo;
        activoObj.numero_orden_compra = activoInfo.numero_orden_compra;
        activoObj.codigo_proveedor = activoInfo.codigo_proveedor;
        activoObj.numero_factura = activoInfo.numero_factura;
        activoObj.codigo_tipo_factura = activoInfo.codigo_tipo_factura;
        activoObj.cedula_beneficiario = activoInfo.cedula_beneficiario;
        
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
                query = Queries.LIST_ACTIVOS_NO_ASIGNADOS;
                break;
            case 'reasignacion':
                query =  Queries.LIST_ACTIVOS_NO_DESINCORPORADOS;
                break;
            case 'prestamo':
                query = Queries.LIST_ACTIVOS_NO_PRESTAMO_NO_DESINCORPORADOS;
                break; 
            case 'desincorporacion':
                query = Queries.LIST_ACTIVOS_NO_DESINCORPORADOS;
                break;
            case 'reparacion':
                query = Queries.LIST_ACTIVOS_NO_REPARACION_NO_DESINCORPORADOS;
                break;
            default:
                query = Queries.listActivos(params);
                break;
        }
        const pool = new Pool();
        await pool.connect();
        const activos = await pool.query(query);
        pool.end();
        return activos.rows;
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
        const [activo] = activoInfo.rows;
        const movimientos = await pool.query(QueriesMovimiento.GET_MOVIMIENTO_BY_ACTIVO, [activoId]);
        pool.end();
        activo.movimientos = movimientos.rows;
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