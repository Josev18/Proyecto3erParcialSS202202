const asyncHandler = require("express-async-handler");

// Models
const Note = require("../../models/tareaModelo");
const User = require("../../models/usuarioModelo");

// --Obtener notas// ---------------------------------
const getTarea = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user.id });

  res.status(200).json(notes);
});

// --set nota// ---------------------------------
const setTarea = asyncHandler(async (req, res) => {
  if (!req.body.text) {
    res.status(400);
    throw new Error("Porfavor añade una nota");
  }

  const note = await Note.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(200).json(note);
});

// --Eliminar nota// ---------------------------------
const deleteTarea = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Nota no encontrada");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("No se encuentra el usuario");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Usuario no autorizado");
  }

  await note.remove();

  res.status(200).json({ id: req.params.id });
});

// --Actualizar nota// ---------------------------------
const updateTarea = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note) {
    res.status(400);
    throw new Error("Tarea no encontrada");
  }

  if (!req.user) {
    res.status(401);
    throw new Error("Usuario no encontrado");
  }

  if (note.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("Usuario no autorizado");
  }

  const notaActualizada = await Note.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(notaActualizada);
});

module.exports = {
  getTarea,
  setTarea,
  deleteTarea,
  updateTarea,
};
