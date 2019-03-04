const personal = require("../controllers/personal");
const express = require("express");
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

/**
 * @swagger
 * /personal:
 *   get:
 *     description: Retorna los datos del personal.
 *     tags:
 *      - Personal
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: query
 *         description: Nombre, apellido o cédula del personal que se quiere encontrar.
 *         in: query
 *         type: string
 *     responses:
 *       200:
 *         description: Las datos del personal fueron retornados exitosamente.
 *         type: array
 *       400:
 *         description: Hubo algún problema en los parámetros ingresados.
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: No autorizado.
 *         type: string
 */
secureRouter.get("/", handler(personal.getList, (req, res, next) => [req.query]));

module.exports = secureRouter;