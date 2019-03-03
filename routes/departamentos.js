const departamento = require("../controllers/departamento");
const express = require("express");
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

/**
 * @swagger
 * /departamentos:
 *   get:
 *     description: Retorna los departamentos disponibles.
 *     tags:
 *      - Departamentos
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Los departmanrtos fueron retornados exitosamente.
 *         type: array
 *         items:
 *           type: string
 *       400:
 *         description: Hubo algún problema.
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: No autorizado.
 *         type: string
 */
secureRouter.get("/", handler(departamento.getList, (req, res, next) => []));

module.exports = secureRouter;