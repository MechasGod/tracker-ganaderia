const mongoose = require("mongoose");
const { PRODUCCION_LECHE_L_DIA } = require("../constants/validationRanges");

const produccionLecheSchema = new mongoose.Schema(
  {
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    litrosLeche: {
      type: Number,
      required: true,
      min: [
        PRODUCCION_LECHE_L_DIA.min,
        `La producción de leche debe ser mayor o igual a ${PRODUCCION_LECHE_L_DIA.min} L/día`,
      ],
      max: [
        PRODUCCION_LECHE_L_DIA.max,
        `La producción de leche debe ser menor o igual a ${PRODUCCION_LECHE_L_DIA.max} L/día`,
      ],
    },
    observaciones: {
      type: String,
      trim: true,
      default: null,
    },
    fechaRegistro: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

produccionLecheSchema.index({ animalId: 1, fechaRegistro: -1 });

module.exports = mongoose.model("ProduccionLeche", produccionLecheSchema);