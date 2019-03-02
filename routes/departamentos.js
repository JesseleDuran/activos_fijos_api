const departamento = require("../controllers/departamento");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

/**
 * @swagger
 * /departamentos:
 *   get:
 *     description: Retorna los departamentos disponibles.
 *     tags:
 *      - Departamento
 *     produces:
 *      - application/json
 *     security: []
 *     responses:
 *       200:
 *         description: Los departmanrtos fueron retornados exitosamente.
 */
router.get("/", handler(departamento.getList, (req, res, next) => []));

module.exports = router;