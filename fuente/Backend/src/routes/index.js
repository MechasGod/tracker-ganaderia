const { Router } = require("express");
const authRoutes = require("./auth.routes");
const animalesRoutes = require("./animales.routes");
const enfermedadesRoutes = require("./enfermedades.routes");
const tratamientosRoutes = require("./tratamientos.routes");
const dietasRoutes = require("./dietas.routes");
const dashboardRoutes = require("./dashboard.routes");
const { authenticate } = require("../middleware/auth.middleware");

const router = Router();

router.use("/auth", authRoutes);
router.use(authenticate);
router.use("/animales", animalesRoutes);
router.use("/enfermedades", enfermedadesRoutes);
router.use("/tratamientos", tratamientosRoutes);
router.use("/dietas", dietasRoutes);
router.use("/dashboard", dashboardRoutes);

module.exports = router;
