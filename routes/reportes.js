const reportes = require("../controllers/reportes");
const express = require("express");
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

/**
 * @swagger
 * /reportes/depreciacion:
 *   get:
 *     description: Retorna el reporte de depreciación de los activos.
 *     tags:
 *      - Reportes
 *     produces:
 *      - application/json
 *     parameters:
 *       - name: report_date
 *         description: Fecha para la que se quiere el reporte.
 *         in: query
 *         type: string
 *       - name: filtered
 *         description: Filtros que se quieren aplicar al query.
 *         in: query
 *         type: array
 *         items:
 *           type: object
 *           properties:
 *             id:
 *               description: Nombre del atributo que por el que se quiere filtrar.
 *               type: string.
 *             value:
 *               description: Valor con el que se quiere filtrar el atributo.
 *               type: string.
 *     responses:
 *       200:
 *         description: El reporte fue generado exitosamente.
 *         type: array
 *         items:
 *             $ref: '#/definitions/ActivoConDepreciacion'
 *       400:
 *         description: Hubo algún problema.
 *         schema:
 *           $ref: '#/definitions/Error'
 *       401:
 *         description: No autorizado.
 *         type: string
 */
secureRouter.get("/depreciacion", handler(reportes.getList, (req, res, next) => [req.query]));

module.exports = secureRouter;