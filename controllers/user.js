const { User } = require("../models");
const { simpleMail } = require("../mailer");
const { generateAuthToken } = require("../auth/utils");
const ApiError = require("../utils/ApiError");
const mkdirp = require("mkdirp");

async function auth(user) {
  if (user) {
    var token = generateAuthToken(user);
    return { token: token, user: user };
  }
  throw new ApiError("Parametros de Ingreso Incorrectos", 404);
}

async function uploadImage(user, image) {
  const URL = process.env.URL || "http://localhost:3000";
  return new Promise((resolve, reject) => {
    image.mv(`storage/${image.name}`, err => {
      if (err) reject(err);
      resolve(`${URL}/storage/${image.name}`);
    });
  });
}

async function profile(id) {
  let user = await User.findOne({ _id: id }).lean();
  return user;
}

async function forgotPassword(email) {
  const user = await User.findOne({ email: email });
  if (!user) throw new ApiError("Usuario no encontrado", 404);

  const code = Math.floor(Math.random() * Math.pow(10, 6));
  user.code = code; // TODO Encrypt this!

  await user.save();
  const success = await simpleMail(
    `Aqui esta tu codigo: ${code}`,
    "Codigo de Cambio de Contraseña",
    user.email
  );
  return { success };
}

async function changePassword(email, code, password) {
  const user = await User.findOne({ email, code });
  if (!user) throw new ApiError("Usuario no encontrado", 404);
  user.set("password", password);
  await user.save();
  return { success: true };
}

module.exports = {
  auth
};
