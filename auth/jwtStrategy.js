const { Strategy, ExtractJwt } = require("passport-jwt");
const ApiError = require("../utils/ApiError");
const Queries = require("../constants/queries/user");

async function authenticate(userInfo, next) {
  	try {
    	const pool = new Pool();
    	await pool.connect();
    	const foundUser = await pool.query(Queries.GET_USER, [userInfo.id]);
    	pool.end();
    	const [user] = foundUser.rows;
    	return next(null, user);
  	} catch (e) {
    	return next(new ApiError("Usuario no Encontrado", 401), null);
 	}
}

module.exports = new Strategy(
  	{
		secretOrKey: "Mota Rules",
    	jwtFromRequest: ExtractJwt.fromExtractors([
      		ExtractJwt.fromAuthHeaderAsBearerToken(),
      		ExtractJwt.fromAuthHeaderWithScheme("OAuth")
    	])
  	},
  	authenticate
);
