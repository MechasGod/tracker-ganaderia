const mongoose = require("mongoose");
const { ESTADOS_REPRODUCTIVOS } = require("../constants/enums");

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
      min: 0,
    },
    altura: {
      type: Number,
      min: 0,
      default: null,
    },
    condicionCorporal: {
      type: Number,
      min: 1,
      max: 5,
      default: null,
    },
    produccionLeche: {
      type: Number,
      min: 0,
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
