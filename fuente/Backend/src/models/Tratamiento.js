const mongoose = require("mongoose");
const {
  FRECUENCIAS_TRATAMIENTO,
  VIAS_ADMINISTRACION,
  ESTADOS_TRATAMIENTO,
} = require("../constants/enums");
const { DURACION_TRATAMIENTO_DIAS } = require("../constants/validationRanges");

const tratamientoSchema = new mongoose.Schema(
  {
    animalId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Animal",
      required: true,
    },
    registroEnfermedadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "RegistroEnfermedad",
      default: null,
    },
    fechaInicio: {
      type: Date,
      required: true,
    },
    medicamento: {
      type: String,
      required: true,
      trim: true,
    },
    dosis: {
      type: String,
      required: true,
      trim: true,
    },
    frecuencia: {
      type: String,
      required: true,
      enum: FRECUENCIAS_TRATAMIENTO,
    },
    duracion: {
      type: Number,
      required: true,
      min: [
        DURACION_TRATAMIENTO_DIAS.min,
        `La duración debe ser mayor o igual a ${DURACION_TRATAMIENTO_DIAS.min} día(s)`,
      ],
      max: [
        DURACION_TRATAMIENTO_DIAS.max,
        `La duración debe ser menor o igual a ${DURACION_TRATAMIENTO_DIAS.max} día(s)`,
      ],
    },
    viaAdministracion: {
      type: String,
      required: true,
      enum: VIAS_ADMINISTRACION,
    },
    veterinario: {
      type: String,
      trim: true,
      default: null,
    },
    estadoTratamiento: {
      type: String,
      enum: ESTADOS_TRATAMIENTO,
      default: "en_curso",
    },
    observaciones: {
      type: String,
      trim: true,
      default: null,
    },
  },
  { timestamps: true }
);

tratamientoSchema.index({ animalId: 1, estadoTratamiento: 1 });

module.exports = mongoose.model("Tratamiento", tratamientoSchema);
