const ubicacionAdministrativa = require("../controllers/ubicacionAdministrativa");
const express = require("express");
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

/**
 * @swagger
 * /ubicacionadministrativa:
 *   get:
 *     description: Retorna las ubicaciones administrativas disponibles.
 *     tags:
 *      - Ubicación administrativa
 *     produces:
 *      - application/json
 *     responses:
 *       200:
 *         description: Las ubicaciones administrativas fueron retornadas exitosamente.
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
secureRouter.get("/", handler(ubicacionAdministrativa.getList, (req, res, next) => []));

module.exports = secureRouter;