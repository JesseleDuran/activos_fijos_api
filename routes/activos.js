const activo = require("../controllers/activo");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

router.post(
    "/",
    handler(activo.create, (req, res, next) => [
        req.body,
        !req.files ? null : req.files.image
    ])
);

router.put(
    "/:id",
    handler(activo.update, (req, res, next) => [
        req.body,
        req.params.id
    ])
);

/**
 * @swagger
 * /activos/clasificaciones:
 *   get:
 *     description: Retorna las clasificaciones disponibles de los activos.
 *     tags:
 *      - Activos
 *     produces:
 *      - application/json
 *     security: []
 *     responses:
 *       200:
 *         description: Las clasificaciones fueron retornadas exitosamente.
 */
router.get(
    "/clasificaciones",
    handler(activo.getClasificaciones, (req, res, next) => [])
);

/**
 * @swagger
 * /activos/marcas:
 *   get:
 *     description: Retorna las marcas disponibles de los activos.
 *     tags:
 *      - Activos
 *     produces:
 *      - application/json
 *     security: []
 *     responses:
 *       200:
 *         description: Las marcas fueron enviadas exitosamente.
 */
router.get(
    "/marcas",
    handler(activo.getMarcas, (req, res, next) => [])
);

router.get(
    "/movimiento",
    handler(activo.getListByMovement, (req, res, next) => [req.query])
);

/**
 * @swagger
 * /activos:
 *   get:
 *     description: Retorna todos los activos registrados en el sistema con sus respectivos movimientos.
 *     tags:
 *      - Activos
 *     produces:
 *      - application/json
 *     security: []
 *     responses:
 *       200:
 *         description: Los activos fueron retornados exitosamente.
 */
router.get("/", handler(activo.getList, (req, res, next) => [req.query]));

router.get(
    "/:id",
    handler(activo.show, (req, res, next) => [req.params.id])
);

router.delete(
    "/:id",
    handler(activo.deleteActivo, (req, res, next) => [req.params.id])
);

module.exports = router;