const mongoose = require("mongoose");

const usuarioSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Porfavor añade un nombre"],
    },
    email: {
      type: String,
      required: [true, "Porfavor añade un correo electronico"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Porfavor añade una contraseña"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", usuarioSchema);
