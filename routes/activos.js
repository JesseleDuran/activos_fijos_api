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

router.get(
    "/clasificaciones",
    handler(activo.getClasificaciones, (req, res, next) => [])
);

router.get(
    "/marcas",
    handler(activo.getMarcas, (req, res, next) => [])
);

router.get(
    "/movimiento",
    handler(activo.getListByMovement, (req, res, next) => [req.query])
);

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