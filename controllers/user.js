const { generateAuthToken } = require("../auth/utils");
const ApiError = require("../utils/ApiError");

async function auth(user) {
  	if (user) {
    	var token = generateAuthToken(user);
    	return { token: token, user: user };
  	}
  	throw new ApiError("Parametros de Ingreso Incorrectos", 404);
}

module.exports = {
  auth
};
