const queriesUtils = require("./activo");

const CREATE_MOVIMIENTO = `INSERT INTO saf_movimientos (tipo, motivo, tiempo_limite, ubicacion, cod_empresa, 
n_activo, cod_personal_involucrado, cod_usuario_aprobador) 
VALUES($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;

const LIST_MOVIMIENTOS = `SELECT id, tipo, motivo, tiempo_limite, ubicacion, cod_empresa, n_activo,
cod_personal_involucrado, cod_usuario_aprobador, saf_movimientos.created_at AS fecha_movimiento,
cedusu AS cedula_usuario, nomusu AS nombre_usuario, apeusu AS apellido_usuario, nota AS cargo_user,
cedper AS cedula_personal, nomper AS nombre_personal, apeper AS apellido_personal,
telhabper AS telefono_habitacion_personal, telmovper AS telefono_movil_personal
FROM saf_movimientos
JOIN sss_usuarios ON (sss_usuarios.codusu = saf_movimientos.cod_usuario_aprobador) 
LEFT JOIN sno_personal ON (sno_personal.codper = saf_movimientos.cod_personal_involucrado)`

const GET_MOVIMIENTO = `${LIST_MOVIMIENTOS} WHERE saf_movimientos.id = $1;`;

const GET_MOVIMIENTO_BY_ACTIVO = `${LIST_MOVIMIENTOS} WHERE n_activo = $1;`;

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
    listMovimientos,
    GET_MOVIMIENTO_BY_ACTIVO
};