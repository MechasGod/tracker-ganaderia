const Animal = require("../models/Animal");
const Tratamiento = require("../models/Tratamiento");
const ActualizacionMensual = require("../models/ActualizacionMensual");
const RegistroEnfermedad = require("../models/RegistroEnfermedad");
const asyncHandler = require("../utils/asyncHandler");
const { sendSuccess } = require("../utils/http");

const getEstadisticas = asyncHandler(async (req, res) => {
  const [totalAnimales, enTratamiento, actualizadosMes] = await Promise.all([
    Animal.countDocuments({ estado: "activo" }),
    Tratamiento.countDocuments({ estadoTratamiento: "en_curso" }),
    (() => {
      const now = new Date();
      const start = new Date(now.getFullYear(), now.getMonth(), 1);
      const end = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59, 999);
      return ActualizacionMensual.countDocuments({ fechaRegistro: { $gte: start, $lte: end } });
    })(),
  ]);

  const activeAnimalIds = await Animal.find({ estado: "activo" }).select("_id").lean();
  const ids = activeAnimalIds.map((x) => x._id);

  const sickAnimalIds = await RegistroEnfermedad.distinct("animalId", {
    animalId: { $in: ids },
    estadoActual: "activo",
  });

  const sanos = Math.max(0, totalAnimales - sickAnimalIds.length);
  const tasaSalud = totalAnimales === 0 ? 100 : Number(((sanos / totalAnimales) * 100).toFixed(2));

  return sendSuccess(res, 200, {
    data: {
      totalAnimales,
      enTratamiento,
      actualizadosMes,
      tasaSalud,
    },
  });
});

module.exports = {
  getEstadisticas,
};
