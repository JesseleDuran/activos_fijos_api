const notificaciones = require("../controllers/notificaciones");
const express = require("express");
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

/**
 * @swagger
 * /notificaciones:
 *   get:
 *     description: Retorna todas las notificaciones del momento.
 *     tags:
 *      - Notificaciones
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Las notificaciones fueron retornadas exitosamente.
 *         type: array
 *         items:
 *             $ref: '#/definitions/Notificacion'
 */
secureRouter.get("/", handler(notificaciones.getList, (req, res, next) => []));

module.exports = secureRouter;