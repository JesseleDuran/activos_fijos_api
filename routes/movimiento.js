const movimiento = require("../controllers/movimiento");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

router.post(
    "/",
    handler(movimiento.create, (req, res, next) => [
        req.body
    ])
);

module.exports = router;