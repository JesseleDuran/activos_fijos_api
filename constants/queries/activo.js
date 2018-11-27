const CREATE_ACTIVO = `INSERT INTO saf_activos 
(n_activo, modelo, is_depreciable, serial, descripcion, id_soc_ordencompra, vida_util_meses, clasificacion, marca, cod_empresa, cod_ubicacion_fisica)
VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`;

const LIST_ACTIVOS = `SELECT n_activo, modelo, is_depreciable, serial, descripcion, id_soc_ordencompra, vida_util_meses, estado_actual, clasificacion, marca,
desubifis, dirubifis, cedper, nomper, apeper, dirper, telhabper, telmovper
FROM saf_activos 
JOIN sno_ubicacionfisica ON (saf_activos.cod_ubicacion_fisica = sno_ubicacionfisica.codubifis)
LEFT JOIN sno_personal ON (saf_activos.cod_personal = sno_personal.codper);`;

const GET_ACTIVO = 'SELECT * FROM saf_activos JOIN sno_ubicacionfisica ON (saf_activos.cod_ubicacion_fisica = sno_ubicacionfisica.codubifis) WHERE n_activo = $1;';

const DELETE_ACTIVO = 'DELETE FROM saf_activos WHERE n_activo = $1';

const GET_CLASIFICACIONES = 'SELECT DISTINCT clasificacion FROM saf_activos';

const GET_MARCAS = 'SELECT DISTINCT marca FROM saf_activos';

function update(params, id) {
    let UPDATE = 'UPDATE saf_activos SET';
    let paramsUpdate = '';
    let i = 0;
    for (var key in params) {
        if (params.hasOwnProperty(key)) {
            if(i == (Object.keys(params).length - 1)) {
                paramsUpdate += handleKey(key, params)
            } else {
                paramsUpdate += handleKey(key, params) + ', ';
            }
            i++;
        }
    }
    return `${UPDATE} ${paramsUpdate} WHERE n_activo = ${id} RETURNING *`
}

function handleKey(key, params) {
    switch(typeof(key)) {
        case 'number':
            return key + "=" + params[key]
            break;
        case 'string':
            return key + "= '" + params[key] + "'"
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
    update
};