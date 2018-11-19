const { Pool } = require('pg')
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/activo");

async function create(activoInfo, image) {
    try {
        const pool = new Pool();
        await pool.connect();
        const newActivo = await pool.query(Queries.CREATE_ACTIVO, Object.values(activoInfo));
        pool.end();
        const [activo] = newActivo.rows;
        return activo;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function getList() {
    try {
        const pool = new Pool();
        await pool.connect();
        const allActivos = await pool.query(Queries.LIST_ACTIVOS);
        pool.end();
        return allActivos.rows;
    } catch (e) {
        console.log(e);
        throw new ApiError("Error en los parametros ingresados", 400);
    }
}

async function show(activoId) {
    try {
        const pool = new Pool();
        await pool.connect();
        const getActivo = await pool.query(Queries.GET_ACTIVO, [activoId]);
        pool.end();
        const [activo] = getActivo.rows;
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
        const getClasificacion = await pool.query(Queries.GET_CLASIFICACIONES);
        pool.end();
        const clasificaciones = getClasificacion.rows.map(a => a.clasificacion);
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
        const getMarcas = await pool.query(Queries.GET_MARCAS);
        pool.end();
        const marcas = getMarcas.rows.map(a => a.marca);
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
    getMarcas
};