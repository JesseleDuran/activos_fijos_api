const { Pool } = require('pg')
const LocalStrategy = require("passport-local");
const Queries = require("../constants/queries/user");
const utils = require("./utils")

module.exports = new LocalStrategy(
	{
    	usernameField: "username",
    	passwordField: "password",
    	session: false
  	},
  	authenticate
);

async function authenticate(username, password, done) {
	const pool = new Pool();
    await pool.connect();
	const foundUser = await pool.query(Queries.GET_USER, [username]);
    pool.end();
    const [user] = foundUser.rows;
  	if (!user || !user.pwdusu || !utils.validPassword(password, user.pwdusu))
    	return done(null, false);
  	return done(null, user);
}
