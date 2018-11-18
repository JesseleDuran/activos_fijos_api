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

router.get("/", handler(activos.getList, (req, res, next) => []));

module.exports = router;