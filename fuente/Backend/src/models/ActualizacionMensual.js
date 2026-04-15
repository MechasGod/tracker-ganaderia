const mongoose = require("mongoose");
const { ESTADOS_REPRODUCTIVOS } = require("../constants/enums");
const { PESO_KG, ALTURA_CM, CONDICION_CORPORAL, PRODUCCION_LECHE_L_DIA } = require("../constants/validationRanges");

const actualizacionMensualSchema = new mongoose.Schema(
  {
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    peso: {
      type: Number,
      required: true,
      min: [PESO_KG.min, `El peso debe ser mayor o igual a ${PESO_KG.min} kg`],
      max: [PESO_KG.max, `El peso debe ser menor o igual a ${PESO_KG.max} kg`],
    },
    altura: {
      type: Number,
      min: [ALTURA_CM.min, `La altura debe ser mayor o igual a ${ALTURA_CM.min} cm`],
      max: [ALTURA_CM.max, `La altura debe ser menor o igual a ${ALTURA_CM.max} cm`],
      default: null,
    },
    condicionCorporal: {
      type: Number,
      min: [
        CONDICION_CORPORAL.min,
        `La condición corporal debe ser mayor o igual a ${CONDICION_CORPORAL.min}`,
      ],
      max: [
        CONDICION_CORPORAL.max,
        `La condición corporal debe ser menor o igual a ${CONDICION_CORPORAL.max}`,
      ],
      default: null,
    },
    produccionLeche: {
      type: Number,
      min: [
        PRODUCCION_LECHE_L_DIA.min,
        `La producción de leche debe ser mayor o igual a ${PRODUCCION_LECHE_L_DIA.min} L/día`,
      ],
      max: [
        PRODUCCION_LECHE_L_DIA.max,
        `La producción de leche debe ser menor o igual a ${PRODUCCION_LECHE_L_DIA.max} L/día`,
      ],
      default: null,
    },
    estadoReproductivo: {
      type: String,
      enum: ESTADOS_REPRODUCTIVOS,
      default: null,
    },
    observaciones: {
      type: String,
      trim: true,
      default: null,
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

actualizacionMensualSchema.index({ animalId: 1, fechaRegistro: -1 });

module.exports = mongoose.model("ActualizacionMensual", actualizacionMensualSchema);
