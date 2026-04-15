const VALIDATION_RANGES = {
  PESO_KG: {
    min: 30,
    max: 1500,
  },
  ALTURA_CM: {
    min: 50,
    max: 250,
  },
  CONDICION_CORPORAL: {
    min: 1,
    max: 5,
  },
  PRODUCCION_LECHE_L_DIA: {
    min: 0,
    max: 100,
  },
  CANTIDAD_ALIMENTO_KG_DIA: {
    min: 0.1,
    max: 100,
  },
  TEMPERATURA_C: {
    min: 35,
    max: 43,
  },
  DURACION_TRATAMIENTO_DIAS: {
    min: 1,
    max: 365,
  },
};

module.exports = VALIDATION_RANGES;