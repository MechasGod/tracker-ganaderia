const jwt = require("jsonwebtoken");
const env = require("../config/env");
const AppError = require("../utils/AppError");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization || "";
  const [scheme, token] = authHeader.split(" ");

  if (scheme !== "Bearer" || !token) {
    return next(new AppError("No autenticado", 401, "UNAUTHORIZED"));
  }

  try {
    const decoded = jwt.verify(token, env.jwtSecret);
    req.user = decoded;
    return next();
  } catch (error) {
    return next(new AppError("Token inválido o expirado", 401, "UNAUTHORIZED"));
  }
};

module.exports = {
  authenticate,
};
