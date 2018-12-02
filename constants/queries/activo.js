const CREATE_ACTIVO = `INSERT INTO saf_activos 
(n_activo, modelo, is_depreciable, serial, descripcion, numero_orden_compra, vida_util_meses, clasificacion, marca, cod_empresa, cod_ubicacion_fisica, costo)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`;

const LIST_ACTIVOS = `SELECT n_activo, modelo, is_depreciable, serial, descripcion, numero_orden_compra, vida_util_meses, estado_actual, clasificacion, marca,
desubifis, dirubifis, cedper, nomper, apeper, dirper, telhabper, telmovper
FROM saf_activos 
JOIN sno_ubicacionfisica ON (saf_activos.cod_ubicacion_fisica = sno_ubicacionfisica.codubifis)
LEFT JOIN sno_personal ON (saf_activos.cod_personal = sno_personal.codper);`;

const GET_ACTIVO = `SELECT * FROM saf_activos 
JOIN sno_ubicacionfisica ON (saf_activos.cod_ubicacion_fisica = sno_ubicacionfisica.codubifis) 
WHERE n_activo = $1;`;

const DELETE_ACTIVO = `DELETE FROM saf_activos WHERE n_activo = '$1'`;

const GET_CLASIFICACIONES = `SELECT DISTINCT clasificacion FROM saf_activos`;

const GET_MARCAS = `SELECT DISTINCT marca FROM saf_activos`;

function listActivos(params) {

    let SELECT = `SELECT n_activo, modelo, is_depreciable, serial, descripcion, numero_orden_compra, vida_util_meses, estado_actual, clasificacion, marca,
    desubifis, dirubifis, cedper, nomper, apeper, dirper, telhabper, telmovper FROM saf_activos 
    JOIN sno_ubicacionfisica ON (saf_activos.cod_ubicacion_fisica = sno_ubicacionfisica.codubifis)
    LEFT JOIN sno_personal ON (saf_activos.cod_personal = sno_personal.codper)`;
    let paramsFiltered = '';
    let paramsSorted = '';
    let paramsSize = '';
    let paramsPage = '';
    if(params.filtered) {
        paramsFiltered = buildParamsForWhere(params.filtered);
    }
    if(params.sorted) {
        paramsSorted = buildParamsForSorted(params.sorted);
    }
    if(params.size) {
        paramsSize = ` LIMIT ${params.size}`
    }
    if(params.page) {
        paramsPage = ` OFFSET ${params.page * params.size}`
    }
    
    return `${SELECT} ${paramsFiltered} ${paramsSorted} ${paramsSize} ${paramsPage}`;
}

function update(params, id) {
    let UPDATE = `UPDATE saf_activos SET`;
    let paramsUpdate = buildParamsForSet(params);
    return `${UPDATE} ${paramsUpdate} WHERE n_activo = '${id}' RETURNING *`;
}

function buildParamsForSet(params) {
    let paramsUpdate = '';
    let i = 0;
    for (let obj of params) {
        if(i == (params.length - 1)) {
            paramsUpdate += handleKey(obj)
        } else {
            paramsUpdate += `${handleKey(obj)}, `;
        }
        i++;
    }
    return paramsUpdate;
}

function buildParamsForWhere(params) {
    let paramsUpdate = ` WHERE `;
    let i = 0;
    for (let str of params) {
        const obj = JSON.parse(str);
        if(i == (params.length - 1)) {
            paramsUpdate += handleTypeObj(obj)
        } else {
            paramsUpdate += `${handleTypeObj(obj)} AND `;
        }
        i++;
    }
    return paramsUpdate;
}

function buildParamsForSorted(params) {
    let paramsSorted = ` ORDER BY `;
    let i = 0;
    for (let str of params) {
        const obj = JSON.parse(str);
        if(i == (params.length - 1)) {
            paramsSorted += handleOrder(obj)
        } else {
            paramsSorted += `${handleOrder(obj)}, `;
        }
        i++;
    }
    return paramsSorted;
}

function handleOrder(obj) {
    return obj.desc ? `${obj.id} DESC` : `${obj.id} ASC`;
}

function handleTypeObj(obj) {
    switch(typeof(obj.value)) {
        case 'number':
            return `${obj.id} ILIKE %${obj.value}%`
            break;
        case 'string':
            return `${obj.id} ILIKE '%${obj.value}%'`
            break;
    }
}

function handleKey(obj) {
    switch(typeof(obj.value)) {
        case 'number':
            return `${obj.id}=${obj.value}`
            break;
        case 'string':
            return `${obj.id}='${obj.value}'`
            break;
    }
}

module.exports = {
    CREATE_ACTIVO,
    LIST_ACTIVOS,
    GET_ACTIVO,
    DELETE_ACTIVO,
    GET_CLASIFICACIONES,
    GET_MARCAS,
    update,
    listActivos
};