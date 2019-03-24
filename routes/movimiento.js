const movimiento = require("../controllers/movimiento");
const express = require("express");
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

/**
 * @swagger
 * /movimiento:
 *   post:
 *     description: Crea un movimiento.
 *     tags:
 *      - Movimientos
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             tipo:
 *               description: Representa el tipo de movimiento.
 *               type: string
 *               enum: ['asignacion', 'reasignacion', 'prestamo', 'desincorporacion', 'reparacion', 'salida']
 *             motivo:
 *               description: Motivo por el cual se ejecuta el movimiento.
 *               type: string
 *             tiempo_limite:
 *               description: Tiempo limite en el que ese movimiento caducará.
 *               type: string
 *               format: date-time
 *             ubicacion:
 *               description: Ubicación en la que el activo estará una vez ejecutado el movimiento.
 *               type: string
 *             cod_empresa:
 *               description: Código de la empresa la cual pertenece el movimiento.
 *               type: string
 *             n_activos:
 *               description: Números de activos que involucra el movimiento.
 *               type: array
 *               items:
 *                 type: string
 *             cod_personal_involucrado:
 *               description: Código del personal que involucra este movimiento.
 *               type: string
 *             ubicacion_administrativa:
 *               description: Ubicación administrativa a la que fue asignada este activo.
 *               type: string
 *             ubicacion_geografica:
 *               description: Ubicación geográfica a la que fue asignada este activo.
 *               type: string
 *             departamento:
 *               description: Departamento al que pertenece el activo.
 *               type: string
 *     responses:
 *       200:
 *         description: El movimiento fue creado exitosamente.
 *         schema:
 *           $ref: '#/definitions/Movimiento'
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
    handler(movimiento.create, (req, res, next) => [
        req.body,
        req.user
    ])
);

/**
 * @swagger
 * /movimiento/{id}:
 *   get:
 *     description: Obtener un movimiento.
 *     tags:
 *      - Movimientos
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: id
 *         description: Id del movimiento que se quiere obtener.
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: El activo fue retornado exitosamente.
 *         schema:
 *           $ref: '#/definitions/MovimientoConUser'
 *       400:
 *         description: Hubo algún problema en los parámetros ingresados.
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: No autorizado.
 *         type: string
 * 
 */
secureRouter.get(
    "/:id",
    handler(movimiento.show, (req, res, next) => [req.params.id])
);

module.exports = secureRouter;