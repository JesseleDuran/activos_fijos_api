const notificaciones = require("../controllers/notificaciones");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

router.get("/", handler(notificaciones.getList, (req, res, next) => []));

module.exports = router;