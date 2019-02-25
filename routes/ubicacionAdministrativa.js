const ubicacionAdministrativa = require("../controllers/ubicacionAdministrativa");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

/**
 * @swagger
 * /ubicacionadministrativa:
 *   get:
 *     description: Retorna las ubicaciones administrativas disponibles.
 *     tags:
 *      - Ubicación administrativa
 *     produces:
 *      - application/json
 *     security: []
 *     responses:
 *       200:
 *         description: Las ubicaciones administrativas fueron retornadas exitosamente.
 */
router.get("/", handler(ubicacionAdministrativa.getList, (req, res, next) => []));

module.exports = router;