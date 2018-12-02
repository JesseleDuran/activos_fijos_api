const reportes = require("../controllers/reportes");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

router.get("/depreciacion", handler(reportes.getList, (req, res, next) => [req.query]));

module.exports = router;