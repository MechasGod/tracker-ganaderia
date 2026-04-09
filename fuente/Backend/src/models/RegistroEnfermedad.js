const mongoose = require("mongoose");
const { ENFERMEDADES, ESTADOS_GENERALES, ESTADOS_ENFERMEDAD } = require("../constants/enums");

const registroEnfermedadSchema = new mongoose.Schema(
  {
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    fechaDeteccion: {
      type: Date,
      required: true,
    },
    enfermedad: {
      type: String,
      required: true,
      enum: ENFERMEDADES,
    },
    sintomas: {
      type: String,
      required: true,
      trim: true,
    },
    temperatura: {
      type: Number,
      default: null,
    },
    estadoGeneral: {
      type: String,
      enum: ESTADOS_GENERALES,
      default: null,
    },
    observaciones: {
      type: String,
      trim: true,
      default: null,
    },
    estadoActual: {
      type: String,
      enum: ESTADOS_ENFERMEDAD,
      default: "activo",
    },
  },
  { timestamps: true }
);

registroEnfermedadSchema.index({ animalId: 1, estadoActual: 1 });

module.exports = mongoose.model("RegistroEnfermedad", registroEnfermedadSchema);
