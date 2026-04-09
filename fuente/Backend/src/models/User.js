const mongoose = require("mongoose");
const { ROLES_USUARIO } = require("../constants/enums");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    nombre: {
      type: String,
      trim: true,
      default: null,
    },
    rol: {
      type: String,
      enum: ROLES_USUARIO,
      default: "usuario",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Usuario", userSchema);
