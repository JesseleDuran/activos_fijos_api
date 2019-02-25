const personal = require("../controllers/personal");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

/**
 * @swagger
 * /ordenescomprafactura:
 *   get:
 *     description: Retorna los valores necesarios de las órdenes de compra y las facturas para crear un activo.
 *     tags:
 *      - Personal
 *     produces:
 *      - application/json
 *     security: []
 *     responses:
 *       200:
 *         description: Las órdenes de compra con su factura fueron retornados exitosamente.
 */
router.get("/", handler(personal.getList, (req, res, next) => [req.query]));

module.exports = router;