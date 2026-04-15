const AppError = require("./AppError");

const isMissing = (value) => value === undefined || value === null || value === "";

const ensureNumberInRange = ({
  value,
  field,
  label,
  min,
  max,
  required = false,
  allowNull = false,
  integer = false,
}) => {
  if (isMissing(value)) {
    if (required) {
      throw new AppError(`${label} es obligatorio`, 400, "VALIDATION_ERROR", [
        { field, message: `${label} es obligatorio` },
      ]);
    }

    return allowNull ? null : undefined;
  }

  const numericValue = Number(value);
  if (!Number.isFinite(numericValue)) {
    throw new AppError(`${label} debe ser un número válido`, 400, "VALIDATION_ERROR", [
      { field, message: `${label} debe ser un número válido` },
    ]);
  }

  if (integer && !Number.isInteger(numericValue)) {
    throw new AppError(`${label} debe ser un número entero`, 400, "VALIDATION_ERROR", [
      { field, message: `${label} debe ser un número entero` },
    ]);
  }

  if (min !== undefined && numericValue < min) {
    throw new AppError(`${label} debe ser mayor o igual a ${min}`, 400, "VALIDATION_ERROR", [
      { field, message: `${label} debe ser mayor o igual a ${min}` },
    ]);
  }

  if (max !== undefined && numericValue > max) {
    throw new AppError(`${label} debe ser menor o igual a ${max}`, 400, "VALIDATION_ERROR", [
      { field, message: `${label} debe ser menor o igual a ${max}` },
    ]);
  }

  return numericValue;
};

module.exports = {
  ensureNumberInRange,
};