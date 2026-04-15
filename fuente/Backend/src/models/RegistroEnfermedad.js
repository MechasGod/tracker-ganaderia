const mongoose = require("mongoose");
const { ENFERMEDADES, ESTADOS_GENERALES, ESTADOS_ENFERMEDAD } = require("../constants/enums");
const { TEMPERATURA_C } = require("../constants/validationRanges");

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
      min: [TEMPERATURA_C.min, `La temperatura debe ser mayor o igual a ${TEMPERATURA_C.min} °C`],
      max: [TEMPERATURA_C.max, `La temperatura debe ser menor o igual a ${TEMPERATURA_C.max} °C`],
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
