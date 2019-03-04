/**
 * @swagger
 * definitions:
 *   Activo:
 *     type: object
 *     required:
 *       - codigo_articulo
 *       - n_activo
 *       - modelo
 *       - numero_factura
 *       - serial
 *       - descripcion
 *       - numero_orden_compra
 *       - vida_util_meses
 *       - clasificacion
 *       - marca
 *       - cod_empresa
 *       - codigo_tipo_factura
 *       - codigo_proveedor
 *       - cedula_beneficiario
 *     properties:
 *       modelo:
 *         description: Modelo del activo.
 *         type: string
 *       codigo_articulo:
 *         description: Código del artículo, viene de SIV_ARTICULO.codart.
 *         type: string
 *       serial:
 *         description: Serial del activo.
 *         type: string
 *       descripcion:
 *         description: Descripción del activo.
 *         type: string
 *       vida_util_meses:
 *         description: Vida útil en meses del activo.
 *         type: integer
 *       estatus:
 *         description: Vida útil en meses del activo.
 *         type: string
 *         enum: ['No asignado', 'Asignado', 'Reasignado', 'En préstamo', 'En proceso de desincorporación', 'En reparación', 'Fuera de la empresa']
 *       clasificacion:
 *         description: Clasificación o rubro a la que pertenece el activo.
 *         type: string
 *       marca:
 *         description: Marca del activo.
 *         type: string
 *       codigo_personal:
 *         description: Código del personal al que le pertenece el activo.
 *         type: string
 *       codigo_empresa:
 *         description: Código de la empresa a la que pertenece el activo.
 *         type: string
 *       ubicacion_geografica:
 *         description: Ubicación geográfica a la que fue asignada este activo.
 *         type: string
 *       n_activo:
 *         description: Número del activo.
 *         type: string
 *       numero_orden_compra:
 *         description: Número de orden de compra a la que pertenece el activp, viene de SOC_ORDENCOMPRA.numordcom.
 *         type: string
 *       created_at:
 *         description: Fecha a la que el activo fue ingresado al sistema.
 *         type: string
 *         format: date-time
 *       ubicacion_administrativa:
 *         description: Ubicación administrativa a la que fue asignada este activo.
 *         type: string
 *       tipo_orden_compra:
 *         description: Tipo de orden de compra, viene de SOC_ORDENCOMPRA.estcondat.
 *         type: string
 *       codigo_proveedor:
 *         description: Código del proveedor, viene de SOC_ORDENCOMPRA.cod_pro.
 *         type: string
 *       condicion:
 *         description: Estado de uso en el que se encuentra el activo.
 *         type: string
 *       numero_factura:
 *         description: Número de la factura a la que pertenece el activo, viene de CXP_RD.numrecdoc.
 *         type: string
 *       codigo_tipo_factura:
 *         description: Código del tipo de factura, viene de CXP_RD.codtipdoc.
 *         type: string
 *       cedula_beneficiario:
 *         description: Viene de CXP_RD.ced_bene.
 *         type: string
 *       observaciones:
 *         description: Observaciones al hacer inspección del activo.
 *         type: string
 *       departamento:
 *         description: Departamento al que pertenece el activo.
 *         type: number
 */


 /**
 * @swagger
 * definitions:
 *   ActivoConMovimiento:
 *     type: object
 *     required:
 *       - codigo_articulo
 *       - n_activo
 *       - modelo
 *       - numero_factura
 *       - serial
 *       - descripcion
 *       - numero_orden_compra
 *       - vida_util_meses
 *       - clasificacion
 *       - marca
 *       - cod_empresa
 *       - codigo_tipo_factura
 *       - codigo_proveedor
 *       - cedula_beneficiario
 *     properties:
 *       modelo:
 *         description: Modelo del activo.
 *         type: string
 *       codigo_articulo:
 *         description: Código del artículo, viene de SIV_ARTICULO.codart.
 *         type: string
 *       serial:
 *         description: Serial del activo.
 *         type: string
 *       descripcion:
 *         description: Descripción del activo.
 *         type: string
 *       vida_util_meses:
 *         description: Vida útil en meses del activo.
 *         type: integer
 *       estatus:
 *         description: Vida útil en meses del activo.
 *         type: string
 *         enum: ['No asignado', 'Asignado', 'Reasignado', 'En préstamo', 'En proceso de desincorporación', 'En reparación', 'Fuera de la empresa']
 *       clasificacion:
 *         description: Clasificación o rubro a la que pertenece el activo.
 *         type: string
 *       marca:
 *         description: Marca del activo.
 *         type: string
 *       codigo_personal:
 *         description: Código del personal al que le pertenece el activo.
 *         type: string
 *       codigo_empresa:
 *         description: Código de la empresa a la que pertenece el activo.
 *         type: string
 *       ubicacion_geografica:
 *         description: Ubicación geográfica a la que fue asignada este activo.
 *         type: string
 *       n_activo:
 *         description: Número del activo.
 *         type: string
 *       numero_orden_compra:
 *         description: Número de orden de compra a la que pertenece el activp, viene de SOC_ORDENCOMPRA.numordcom.
 *         type: string
 *       created_at:
 *         description: Fecha a la que el activo fue ingresado al sistema.
 *         type: string
 *         format: date-time
 *       ubicacion_administrativa:
 *         description: Ubicación administrativa a la que fue asignada este activo.
 *         type: string
 *       tipo_orden_compra:
 *         description: Tipo de orden de compra, viene de SOC_ORDENCOMPRA.estcondat.
 *         type: string
 *       codigo_proveedor:
 *         description: Código del proveedor, viene de SOC_ORDENCOMPRA.cod_pro.
 *         type: string
 *       condicion:
 *         description: Estado de uso en el que se encuentra el activo.
 *         type: string
 *       numero_factura:
 *         description: Número de la factura a la que pertenece el activo, viene de CXP_RD.numrecdoc.
 *         type: string
 *       codigo_tipo_factura:
 *         description: Código del tipo de factura, viene de CXP_RD.codtipdoc.
 *         type: string
 *       cedula_beneficiario:
 *         description: Viene de CXP_RD.ced_bene.
 *         type: string
 *       observaciones:
 *         description: Observaciones al hacer inspección del activo.
 *         type: string
 *       departamento:
 *         description: Departamento al que pertenece el activo.
 *         type: number
 *       movimientos:
 *         description: Departamento al que pertenece el activo.
 *         type: array
 *         items:
 *             $ref: '#/definitions/MovimientoConUser'
 */



