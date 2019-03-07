const ordenCompraFactura = require("../controllers/ordenCompraFactura");
const express = require("express");
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

/**
 * @swagger
 * /ordenescomprafactura:
 *   get:
 *     description: Retorna los valores necesarios de las órdenes de compra y las facturas para crear un activo.
 *     tags:
 *      - Ordenes de Compra y Factura
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Las órdenes de compra con su factura fueron retornados exitosamente.
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             orden_compra:
 *               description: Número de orden de compra.
 *               type: string
 *             numero_factura:
 *               description: Número de factura.
 *               type: string
 *             codigo_tipo_factura:
 *               type: string
 *             cedula_beneficiario:
 *               type: string
 *             codigo_proveedor:
 *               type: string
 *             nombre_proveedor:
 *               type: string
 *             fecha_compra:
 *               type: string
 *               format: date-time
 *             costo_unitario:
 *               description: Costo del artículo sin IVA.
 *               type: number
 *               format: double
 *             condicion_pago:
 *               type: string
 *             unidades:
 *               description: Unidades en total que se compraron.
 *               type: integer
 *             descripcion_compra:
 *               type: string
 *             cuenta_presupuestaria:
 *               type: string
 *             descripcion_activo:
 *               type: string
 *             codigo_articulo:
 *               type: string
 *               format: date-time
 *             centro_costo:
 *               type: string
 *             unidad_administrativa:
 *               type: string
 *       400:
 *         description: Hubo algún problema en los parámetros ingresados.
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: No autorizado.
 *         type: string
 */
secureRouter.get("/", handler(ordenCompraFactura.getList, (req, res, next) => []));

module.exports = secureRouter;