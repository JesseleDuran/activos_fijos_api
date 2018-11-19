const activos = require("../controllers/activos");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

router.post(
    "/",
    handler(activos.create, (req, res, next) => [
        req.body,
        !req.files ? null : req.files.image
    ])
);

router.get(
    "/clasificaciones",
    handler(activos.getClasificacion, (req, res, next) => [])
);

router.get("/", handler(activos.getList, (req, res, next) => []));

router.get(
    "/:id",
    handler(activos.show, (req, res, next) => [req.params.id])
);

router.delete(
    "/:id",
    handler(activos.deleteActivo, (req, res, next) => [req.params.id])
);

module.exports = router;