const AppError = require("../utils/AppError");

const errorMiddleware = (err, req, res, next) => {
  if (err.name === "CastError") {
    return res.status(400).json({
      success: false,
      error: {
        message: "Identificador inválido",
        code: "VALIDATION_ERROR",
        details: [{ field: err.path, message: "Formato de id inválido" }],
      },
    });
  }

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern || {})[0] || "campo";
    return res.status(400).json({
      success: false,
      error: {
        message: "Error de validación",
        code: "VALIDATION_ERROR",
        details: [{ field, message: `El valor de ${field} ya existe` }],
      },
    });
  }

  if (err.name === "ValidationError") {
    const details = Object.values(err.errors).map((e) => ({
      field: e.path,
      message: e.message,
    }));

    return res.status(400).json({
      success: false,
      error: {
        message: "Error de validación",
        code: "VALIDATION_ERROR",
        details,
      },
    });
  }

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      success: false,
      error: {
        message: err.message,
        code: err.code,
        details: err.details,
      },
    });
  }

  return res.status(500).json({
    success: false,
    error: {
      message: "Error interno del servidor",
      code: "INTERNAL_ERROR",
      details: [],
    },
  });
};

module.exports = errorMiddleware;
