const CREATE_ACTIVO = `INSERT INTO saf_activos(
        modelo, codigo_articulo, serial, descripcion, vida_util_meses, 
        clasificacion, marca, codigo_empresa, 
        n_activo, numero_orden_compra, codigo_proveedor, 
        numero_factura, codigo_tipo_factura, cedula_beneficiario)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14) RETURNING *`;

const LIST_ACTIVOS = `SELECT DISTINCT modelo, codigo_articulo, serial, descripcion, vida_util_meses, observaciones,
    estatus, clasificacion, marca, codigo_personal, codigo_empresa, 
    ubicacion_geografica, n_activo, numero_orden_compra, created_at, 
    departamento, tipo_orden_compra, codigo_proveedor, 
    condicion, numero_factura, codigo_tipo_factura, cedula_beneficiario,
    ubicacion_administrativa,
    siv_articulo.spg_cuenta AS cuenta_presupuestaria,
    soc_ordencompra.coduniadm AS centro_costo,
    cxp_rd.fecemidoc AS fecha_compra,
    soc_dt_bienes.preuniart AS costo_unitario,
    soc_ordencompra.forpagcom AS condicion_pago,
    rpc_proveedor.nompro AS nombre_proveedor,
    cedper AS cedula_personal, nomper AS nombre_personal, apeper AS apellido_personal
FROM saf_activos
    INNER JOIN siv_articulo ON siv_articulo.codart = saf_activos.codigo_articulo
    INNER JOIN soc_ordencompra ON (soc_ordencompra.numordcom = saf_activos.numero_orden_compra AND soc_ordencompra.estcondat = saf_activos.tipo_orden_compra)
    INNER JOIN cxp_rd ON 
    (cxp_rd.numrecdoc = saf_activos.numero_factura AND 
    cxp_rd.codtipdoc = saf_activos.codigo_tipo_factura AND 
    cxp_rd.ced_bene = saf_activos.cedula_beneficiario AND cxp_rd.cod_pro = saf_activos.codigo_proveedor)
    INNER JOIN soc_dt_bienes ON 
    (soc_dt_bienes.numordcom = saf_activos.numero_orden_compra AND 
    soc_dt_bienes.estcondat = saf_activos.tipo_orden_compra AND soc_dt_bienes.codart = saf_activos.codigo_articulo)
    INNER JOIN rpc_proveedor ON rpc_proveedor.cod_pro = saf_activos.codigo_proveedor
    LEFT JOIN sno_personal ON (sno_personal.codper = saf_activos.codigo_personal)`;

const LIST_ACTIVOS_NO_ASIGNADOS = `${LIST_ACTIVOS} WHERE estatus='No asignado'`;

const LIST_ACTIVOS_NO_DESINCORPORADOS = `${LIST_ACTIVOS} WHERE estatus!='En proceso de desincorporación'`;

const LIST_ACTIVOS_ASIGNADOS_REASIGNADO = `${LIST_ACTIVOS} WHERE estatus='Asignado' OR estatus='Reasignado'`;

const LIST_ACTIVOS_NO_REPARACION_NO_DESINCORPORADOS = `${LIST_ACTIVOS} WHERE estatus!='En proceso de desincorporación' OR estatus!='En reparación'`;

const LIST_ACTIVOS_NO_DESINCORPORADOS_ASIGNADOS = `${LIST_ACTIVOS} WHERE estatus='Asignado' OR estatus='Reasignado' OR estatus!='En proceso de desincorporación'`;

const GET_ACTIVO = `${LIST_ACTIVOS} WHERE n_activo = $1;`;

const DELETE_ACTIVO = `DELETE FROM saf_activos WHERE n_activo = $1`;

const GET_CLASIFICACIONES = `SELECT DISTINCT clasificacion FROM saf_activos`;

const GET_MARCAS = `SELECT DISTINCT marca FROM saf_activos`;

function listActivos(params) {
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
    
    return `${LIST_ACTIVOS} ${paramsFiltered} ${paramsSorted} ${paramsSize} ${paramsPage}`;
}

function listActivosReportes(params) {
    let paramsFiltered = '';
    let paramsSorted = '';
    let paramsSize = '';
    let paramsPage = '';
    if(params.filtered) {
        paramsFiltered = buildParamsForWhereWithOr(params.filtered);
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
    
    return `${LIST_ACTIVOS} ${paramsFiltered} ${paramsSorted} ${paramsSize} ${paramsPage}`;
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

function buildParamsForWhereWithOr(params) {
    let paramsUpdate = ` WHERE `;
    let i = 0;
    for (let str of params) {
        const obj = JSON.parse(str);
        if(i == (params.length - 1)) {
            paramsUpdate += handleKey(obj)
        } else {
            paramsUpdate += `${handleKey(obj)} OR `;
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
    GET_ACTIVO,
    DELETE_ACTIVO,
    GET_CLASIFICACIONES,
    GET_MARCAS,
    update,
    listActivos,
    LIST_ACTIVOS_NO_ASIGNADOS,
    LIST_ACTIVOS_NO_DESINCORPORADOS,
    LIST_ACTIVOS_ASIGNADOS_REASIGNADO,
    LIST_ACTIVOS_NO_REPARACION_NO_DESINCORPORADOS,
    LIST_ACTIVOS_NO_DESINCORPORADOS_ASIGNADOS,
    listActivosReportes
};