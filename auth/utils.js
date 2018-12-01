const jwt = require("jwt-simple");
const md5Utils = require("./md5");

const { User } = require("../models");
function generateAuthToken(user) {
  const payload = {
    codusu: user.codusu
  };
  return jwt.encode(payload, "Mota Rules");
}

function generateAuthenticateBy(network, generateUser, getExtraData, redirect) {
  return async function(accessToken, refreshToken, profile, next) {
    let user;
    try {
      const criteria = { token: profile.id, network: network };
      user = await User.findOne({
        $or: [{ social: criteria }, { email: profile.emails[0].value }]
      });

      if (user && user.social.indexOf(criteria) == -1) {
        user = getExtraData(user, profile);
        user.social.push(criteria);
        await user.save();
      }

      if (!user) user = await generateUser(profile);
      if (redirect)
        user.redirect =
          typeof redirect == "function" ? redirect(user) : redirect;
      next(null, user);
    } catch (e) {
      next(e, null);
    }
  };
}

function validPassword(inputPassword, userFoundPassword) {
  var hash = md5Utils.calcMD5(inputPassword);
  return hash.localeCompare(userFoundPassword) === 0;
}

module.exports = { generateAuthToken, generateAuthenticateBy, validPassword };
