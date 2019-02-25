const ubicacionFisica = require("../controllers/ubicacionFisica");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

/**
 * @swagger
 * /ubicacionfisica:
 *   get:
 *     description: Retorna las ubicaciones geográficas o físicas disponibles.
 *     tags:
 *      - Ubicación física
 *     produces:
 *      - application/json
 *     security: []
 *     responses:
 *       200:
 *         description: Las ubicaciones geográficas o físicas fueron retornadas exitosamente.
 */
router.get("/", handler(ubicacionFisica.getList, (req, res, next) => []));

module.exports = router;