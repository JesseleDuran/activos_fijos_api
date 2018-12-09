const queriesUtils = require("./activo");

const CREATE_MOVIMIENTO = `INSERT INTO saf_movimientos (tipo, motivo, tiempo_limite, ubicacion, cod_empresa, 
n_activo, cod_personal_involucrado, cod_usuario_aprobador) 
VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

const GET_MOVIMIENTO = `SELECT nomper, apeper, cedper, sexper, denasicar AS cargo_personal,
saf_movimientos.n_activo, descripcion, marca, modelo, serial, desubifis,
tipo, saf_movimientos.created_at,
nomusu, apeusu, cedusu, codusu, nota AS cargo_user
FROM saf_movimientos 
JOIN saf_activos ON (saf_activos.n_activo = saf_movimientos.n_activo) 
JOIN sno_ubicacionfisica ON (sno_ubicacionfisica.codubifis = saf_activos.cod_ubicacion_fisica) 
JOIN sss_usuarios ON (sss_usuarios.codusu = saf_movimientos.cod_usuario_aprobador) 
JOIN sno_personal ON (sno_personal.codper = saf_movimientos.cod_personal_involucrado) 
LEFT JOIN sno_personalnomina ON (sno_personalnomina.codper = sno_personal.codper) 
LEFT JOIN sno_asignacioncargo ON (sno_asignacioncargo.codnom = sno_personalnomina.codnom AND sno_asignacioncargo.codasicar = sno_personalnomina.codasicar)
WHERE saf_movimientos.id = $1;`;

const LIST_MOVIMIENTOS = `SELECT * FROM saf_movimientos 
JOIN saf_activos ON (saf_activos.n_activo = saf_movimientos.n_activo) `

function listMovimientos(params) {
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
    
    return `${LIST_MOVIMIENTOS} ${paramsFiltered} ${paramsSorted} ${paramsSize} ${paramsPage}`;
}

function buildParamsForWhere(params) {
    let paramsUpdate = `WHERE `;
    let i = 0;
    for (let str of params) {
        //const obj = JSON.parse(str);
        if(i == (params.length - 1)) {
            paramsUpdate += handleTypeObj(str)
        } else {
            paramsUpdate += `${handleTypeObj(str)} AND `;
        }
        i++;
    }
    return paramsUpdate;
}

function handleTypeObj(obj) {
    switch(typeof(obj.value)) {
        case 'number':
            return `${obj.id} = ${obj.value}`
            break;
        case 'string':
            return `${obj.id} = '${obj.value}'`
            break;
    }
}

module.exports = {
    CREATE_MOVIMIENTO,
    GET_MOVIMIENTO,
    listMovimientos
};