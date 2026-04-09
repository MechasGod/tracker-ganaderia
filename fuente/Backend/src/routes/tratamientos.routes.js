const { Router } = require("express");
const {
  createTratamiento,
  updateTratamiento,
  listTratamientos,
} = require("../controllers/tratamientos.controller");

const router = Router();

router.post("/", createTratamiento);
router.put("/:id", updateTratamiento);
router.get("/", listTratamientos);

module.exports = router;
