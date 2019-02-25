const notificaciones = require("../controllers/notificaciones");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

/**
 * @swagger
 * /notificaciones:
 *   get:
 *     description: Retorna todas las notificaciones del momento.
 *     tags:
 *      - Notificaciones
 *     produces:
 *      - application/json
 *     security: []
 *     responses:
 *       200:
 *         description: Las notificaciones fueron retornadas exitosamente.
 */
router.get("/", handler(notificaciones.getList, (req, res, next) => []));

module.exports = router;