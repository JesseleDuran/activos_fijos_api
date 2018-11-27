
const user = require("../controllers/user");
const express = require("express");
const router = express.Router();
const secureRouter = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

router.post(
    "/auth",
    auth.user,
    handler(user.auth, (req, res, next) => [req.user])
);


module.exports = router;