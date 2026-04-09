const mongoose = require("mongoose");
const { RAZAS, SEXOS, ESTADOS_ANIMAL } = require("../constants/enums");

const animalSchema = new mongoose.Schema(
  {
    identificacion: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nombre: {
      type: String,
      trim: true,
      default: null,
    },
    raza: {
      type: String,
      required: true,
      enum: RAZAS,
    },
    sexo: {
      type: String,
      required: true,
      enum: SEXOS,
    },
    fechaNacimiento: {
      type: Date,
      required: true,
    },
    peso: {
      type: Number,
      required: true,
      min: 0,
    },
    color: {
      type: String,
      trim: true,
      default: null,
    },
    procedencia: {
      type: String,
      trim: true,
      default: null,
    },
    observaciones: {
      type: String,
      trim: true,
      default: null,
    },
    estado: {
      type: String,
      enum: ESTADOS_ANIMAL,
      default: "activo",
    },
  },
  { timestamps: true }
);

animalSchema.index({ nombre: 1 });

module.exports = mongoose.model("Animal", animalSchema);
