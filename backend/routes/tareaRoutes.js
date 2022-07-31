const express = require("express");
const router = express.Router();
const {
  getTarea,
  setTarea,
  deleteTarea,
  updateTarea,
} = require("../controllers/tareaControlador");
const { protect } = require("../middlewares/authMiddleware");

router.route("/").get(protect, getTarea).post(protect, setTarea);
router.route("/:id").put(protect, updateTarea).delete(protect, deleteTarea);

module.exports = router;
