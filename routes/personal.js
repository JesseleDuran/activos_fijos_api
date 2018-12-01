const personal = require("../controllers/personal");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

router.get("/", handler(personal.getList, (req, res, next) => []));

module.exports = router;