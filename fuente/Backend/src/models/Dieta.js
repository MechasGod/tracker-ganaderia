const mongoose = require("mongoose");
const { TIPOS_DIETA, FRECUENCIAS_ALIMENTACION, OBJETIVOS_DIETA } = require("../constants/enums");
const { CANTIDAD_ALIMENTO_KG_DIA } = require("../constants/validationRanges");

const dietaSchema = new mongoose.Schema(
  {
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    fechaRegistro: {
      type: Date,
      required: true,
    },
    tipoDieta: {
      type: String,
      required: true,
      enum: TIPOS_DIETA,
    },
    alimentoBase: {
      type: String,
      required: true,
      trim: true,
    },
    cantidad: {
      type: Number,
      required: true,
      min: [
        CANTIDAD_ALIMENTO_KG_DIA.min,
        `La cantidad debe ser mayor o igual a ${CANTIDAD_ALIMENTO_KG_DIA.min} kg/día`,
      ],
      max: [
        CANTIDAD_ALIMENTO_KG_DIA.max,
        `La cantidad debe ser menor o igual a ${CANTIDAD_ALIMENTO_KG_DIA.max} kg/día`,
      ],
    },
    suplementos: {
      type: String,
      trim: true,
      default: null,
    },
    frecuenciaAlimentacion: {
      type: String,
      required: true,
      enum: FRECUENCIAS_ALIMENTACION,
    },
    objetivoDieta: {
      type: String,
      enum: OBJETIVOS_DIETA,
      default: null,
    },
    observaciones: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

dietaSchema.index({ animalId: 1, fechaRegistro: -1 });

module.exports = mongoose.model("Dieta", dietaSchema);
