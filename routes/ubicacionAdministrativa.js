const ubicacionAdministrativa = require("../controllers/ubicacionAdministrativa");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

router.get("/", handler(ubicacionAdministrativa.getList, (req, res, next) => []));

module.exports = router;