const activo = require("../controllers/activo");
const express = require("express");
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

/**
 * @swagger
 * /activos:
 *   post:
 *     description: Crea un activo.
 *     tags:
 *      - Activos
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             codigo_articulo:
 *               description: Código del artículo, viene de SIV_ARTICULO.codart.
 *               type: string
 *             n_activo:
 *               description: Número del activo.
 *               type: string
 *             modelo:
 *               description: Modelo del activo.
 *               type: string
 *             numero_factura:
 *               description: Número de la factura a la que pertenece el activo, viene de CXP_RD.numrecdoc.
 *               type: string
 *             serial:
 *               description: Serial del activo.
 *               type: string
 *             descripcion_activo:
 *               description: Descripción del activo.
 *               type: string
 *             numero_orden_compra:
 *               description: Número de orden de compra a la que pertenece el activp, viene de SOC_ORDENCOMPRA.numordcom.
 *               type: string
 *             vida_util_meses:
 *               description: Vida útil en meses del activo.
 *               type: integer
 *             clasificacion:
 *               description: Clasificación o rubro a la que pertenece el activo.
 *               type: string
 *             marca:
 *               description: Marca del activo.
 *               type: string
 *             codigo_tipo_factura:
 *               description: Código del tipo de factura, viene de CXP_RD.codtipdoc.
 *               type: string
 *             codigo_proveedor:
 *               description: Código del proveedor, viene de SOC_ORDENCOMPRA.cod_pro.
 *               type: string
 *             cedula_beneficiario:
 *               description: Viene de CXP_RD.ced_bene.
 *               type: string
 *     responses:
 *       200:
 *         description: El activo fue creado exitosamente.
 *         schema:
 *           $ref: '#/definitions/Activo'
 *       400:
 *         description: Hubo algún problema en los parámetros ingresados.
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: No autorizado.
 *         type: string
 */
secureRouter.post(
    "/",
    handler(activo.create, (req, res, next) => [
        req.body,
        !req.files ? null : req.files.image
    ])
);

/**
 * @swagger
 * /activos/{id}:
 *   put:
 *     description: Actualizar cualquier atributo de un activo.
 *     tags:
 *      - Activos
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: id
 *         description: Número de activo que se ve a actualizar.
 *         in: path
 *         required: true
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               id:
 *                 description: Nombre del atributo que se quiere actualizar.
 *                 type: string.
 *               value:
 *                 description: Valor con el que se quiere actualizar el atributo.
 *                 type: string.
 *     responses:
 *       200:
 *         description: El activo fue actualizado exitosamente.
 *         schema:
 *           $ref: '#/definitions/Activo'
 *       400:
 *         description: Hubo algún problema en los parámetros ingresados.
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: No autorizado.
 *         type: string
 * 
 */
secureRouter.put(
    "/:id",
    handler(activo.update, (req, res, next) => [
        req.body,
        req.params.id
    ])
);

/**
 * @swagger
 * /activos/clasificaciones:
 *   get:
 *     description: Retorna las clasificaciones disponibles de los activos.
 *     tags:
 *      - Activos
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Las clasificaciones fueron retornadas exitosamente.
 *         type: array
 *         items:
 *           type: string
 *       401:
 *         description: No autorizado.
 *         type: string
 */
secureRouter.get(
    "/clasificaciones",
    handler(activo.getClasificaciones, (req, res, next) => [])
);

/**
 * @swagger
 * /activos/marcas:
 *   get:
 *     description: Retorna las marcas disponibles de los activos.
 *     tags:
 *      - Activos
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Las marcas fueron enviadas exitosamente.
 *         type: array
 *         items:
 *           type: string
 *       401:
 *         description: No autorizado.
 *         type: string
 */
secureRouter.get(
    "/marcas",
    handler(activo.getMarcas, (req, res, next) => [])
);

/**
 * @swagger
 * /activos/movimiento:
 *   get:
 *     description: Retorna los activos disponible para el tipo de movimiento que se pase.
 *     tags:
 *      - Activos
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: query
 *         description: Tipo de movimiento.
 *         in: query
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Los activos fueron retornados exitosamente.
 *         type: array
 *         items:
 *             $ref: '#/definitions/ActivoConMovimiento'
 *       401:
 *         description: No autorizado.
 *         type: string
 */
secureRouter.get(
    "/movimiento",
    handler(activo.getListByMovement, (req, res, next) => [req.query])
);

/**
 * @swagger
 * /activos:
 *   get:
 *     description: Retorna todos los activos registrados en el sistema con sus respectivos movimientos.
 *     tags:
 *      - Activos
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Los activos fueron retornados exitosamente.
 *       401:
 *         description: No autorizado.
 *         type: string
 */
secureRouter.get("/", handler(activo.getList, (req, res, next) => [req.query]));

secureRouter.get(
    "/:id",
    handler(activo.show, (req, res, next) => [req.params.id])
);

secureRouter.delete(
    "/:id",
    handler(activo.deleteActivo, (req, res, next) => [req.params.id])
);

module.exports = secureRouter;