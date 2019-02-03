const LIST_ORDEN_COMPRA_FACTURA = `SELECT 
    soc_ordencompra.numordcom AS orden_compra,
    cxp_rd.numrecdoc AS numero_factura,
    soc_ordencompra.cod_pro AS codigo_proveedor,
    rpc_proveedor.nompro AS nombre_proveedor,
    soc_ordencompra.cod_pro AS codigo_proveedor,
    cxp_rd.fecemidoc AS fecha_compra,
    soc_dt_bienes.preuniart AS costo_unitario,
    soc_ordencompra.forpagcom AS condicion_pago,
    soc_dt_bienes.canart AS unidades,
    soc_ordencompra.obscom AS descripcion_compra,
    siv_articulo.spg_cuenta AS cuenta_presupuestaria,
    siv_articulo.denart AS descripcion_activo,
    soc_dt_bienes.codart AS codigo_articulo,
    soc_ordencompra.coduniadm AS centro_costo,
    spg_unidadadministrativa.denuniadm AS unidad_administrativa
FROM 
    soc_ordencompra
    INNER JOIN soc_dt_bienes ON soc_dt_bienes.numordcom = soc_ordencompra.numordcom
    INNER JOIN cxp_rd ON cxp_rd.cod_pro = soc_ordencompra.cod_pro
    INNER JOIN cxp_dt_solicitudes ON cxp_dt_solicitudes.numrecdoc = cxp_rd.numrecdoc
    INNER JOIN siv_articulo ON siv_articulo.codart = soc_dt_bienes.codart
    INNER JOIN spg_unidadadministrativa ON spg_unidadadministrativa.coduniadm = soc_ordencompra.coduniadm
    INNER JOIN rpc_proveedor ON soc_ordencompra.cod_pro = rpc_proveedor.cod_pro
WHERE
    soc_ordencompra.estcondat = 'B'`;

module.exports = {
    LIST_ORDEN_COMPRA_FACTURA
};