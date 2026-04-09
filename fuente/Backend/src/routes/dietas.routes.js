const { Router } = require("express");
const { createDieta, listDietas } = require("../controllers/dietas.controller");

const router = Router();

router.post("/", createDieta);
router.get("/", listDietas);

module.exports = router;
