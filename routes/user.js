
const user = require("../controllers/user");
const express = require("express");
const router = express.Router();
const handler = require("../utils/ControllerHandler");
const auth = require("../auth");

/**
 * @swagger
 * /user/auth:
 *   post:
 *     description: Inicio de sesión.
 *     tags:
 *      - User
 *     produces:
 *      - application/json
 *     security: []
 *     parameters:
 *       - name: user
 *         in:  body
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             password:
 *               description: Contraseña del user, usada para autenticar el user.
 *               type: string
 *     responses:
 *       200:
 *         description: Información del user y token de autorización.
 *         schema:
 *            type: object
 *            properties:
 *              token:
 *                type: string
 *              user:
 *                $ref: '#/definitions/User'
 *			 401:
 *         description: Usuario no autorizado, significa que los credenciales no fueron válidos.
 *         type: string
 */
router.post(
    "/auth",
    auth.user,
    handler(user.auth, (req, res, next) => [req.user])
);

module.exports = router;