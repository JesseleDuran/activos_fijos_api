const ubicacionFisica = require("../controllers/ubicacionFisica");
const express = require("express");
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

/**
 * @swagger
 * /ubicacionfisica:
 *   get:
 *     description: Retorna las ubicaciones geográficas o físicas disponibles.
 *     tags:
 *      - Ubicación física
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Las ubicaciones geográficas o físicas fueron retornadas exitosamente.
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
secureRouter.get("/", handler(ubicacionFisica.getList, (req, res, next) => []));

module.exports = secureRouter;