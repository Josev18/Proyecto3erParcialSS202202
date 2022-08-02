const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../../models/usuarioModelo");

// --Registrar nuevo usuario// ---------------------------------
const registrarUsuario = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ message: "Porfavor llena los campos" });
    throw new Error("Porfavor llena los campos");
  }

  // verificar si el usuario ya esta registrado
  const userRegistered = await User.findOne({ email });

  if (userRegistered) {
    res.status(400).json({ message: "El usuario ya esta registrado" });
    throw new Error("El usuario ya esta registrado");
  }

  // Password hashing
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Crear usuario
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generarToken(user._id),
    });
  } else {
    res.status(400).json({ message: "datos incorrectos" });
    throw new Error("datos incorrectos");
  }
});

// --Autenticar usuario// ---------------------------------
const loginUsuario = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // verificar email
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      name: user.name,
      email: user.email,
      token: generarToken(user._id),
    });
  } else {
    res.status(400).json({ message: "correo o contraseña invalidos" });
    throw new Error("correo o contraseña invalidos");
  }
});

// --Obtener data usuario// ---------------------------------
const getDashboard = asyncHandler(async (req, res) => {
  res.status(200).json(req.user);
});

// Generar Json Web Token
const generarToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = {
  registrarUsuario,
  loginUsuario,
  getDashboard,
};
