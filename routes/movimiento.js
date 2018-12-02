const movimiento = require("../controllers/movimiento");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

secureRouter.use(auth.jwt());

secureRouter.post(
    "/",
    handler(movimiento.create, (req, res, next) => [
        req.body,
        req.user
    ])
);

secureRouter.get(
    "/:id",
    handler(movimiento.show, (req, res, next) => [req.params.id])
);

module.exports = secureRouter;