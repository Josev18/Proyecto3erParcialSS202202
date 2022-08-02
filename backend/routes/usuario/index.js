const express = require("express");
const router = express.Router();
const {
  registrarUsuario,
  loginUsuario,
  getDashboard,
} = require("../../libs/usuario/index");
const { protect } = require("../../middlewares/authMiddleware");

router.post("/", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/dashboard", protect, getDashboard);

module.exports = router;
