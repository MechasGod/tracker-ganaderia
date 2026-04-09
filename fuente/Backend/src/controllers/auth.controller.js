const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const env = require("../config/env");
const Usuario = require("../models/User");
const asyncHandler = require("../utils/asyncHandler");
const AppError = require("../utils/AppError");
const { sendSuccess } = require("../utils/http");

const login = asyncHandler(async (req, res) => {
  const email = (req.body.email || "").trim().toLowerCase();
  const password = req.body.password || "";

  if (!email || !password) {
    throw new AppError("Email y password son obligatorios", 400, "VALIDATION_ERROR");
  }

  const user = await Usuario.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Credenciales inválidas", 401, "INVALID_CREDENTIALS");
  }

  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new AppError("Credenciales inválidas", 401, "INVALID_CREDENTIALS");
  }

  const token = jwt.sign(
    {
      userId: user._id,
      email: user.email,
      rol: user.rol,
    },
    env.jwtSecret,
    { expiresIn: env.jwtExpiration }
  );

  return sendSuccess(res, 200, {
    data: {
      token,
      user: {
        id: user._id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
      },
    },
  });
});

module.exports = {
  login,
};
