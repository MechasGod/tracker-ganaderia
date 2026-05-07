const { Router } = require("express");
const {
  createRegistroProduccion,
  listAnimalesMasProductivos,
  analizarRentabilidad,
} = require("../controllers/produccion.controller");

const router = Router();

router.post("/", createRegistroProduccion);
router.get("/mas-productivos", listAnimalesMasProductivos);
router.post("/rentabilidad", analizarRentabilidad);

module.exports = router;