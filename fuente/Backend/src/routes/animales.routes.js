const { Router } = require("express");
const {
  createAnimal,
  listAnimales,
  getAnimalById,
  createActualizacionMensual,
  listActualizaciones,
} = require("../controllers/animales.controller");

const router = Router();

router.post("/", createAnimal);
router.get("/", listAnimales);
router.get("/:id", getAnimalById);
router.post("/:id/actualizacion", createActualizacionMensual);
router.get("/:id/actualizaciones", listActualizaciones);

module.exports = router;
