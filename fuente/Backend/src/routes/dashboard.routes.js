const { Router } = require("express");
const { getEstadisticas } = require("../controllers/dashboard.controller");

const router = Router();

router.get("/estadisticas", getEstadisticas);

module.exports = router;
