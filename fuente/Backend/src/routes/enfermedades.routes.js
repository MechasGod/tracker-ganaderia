const { Router } = require("express");
const { createEnfermedad, listEnfermedades } = require("../controllers/enfermedades.controller");

const router = Router();

router.post("/", createEnfermedad);
router.get("/", listEnfermedades);

module.exports = router;
