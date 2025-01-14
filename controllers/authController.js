const jwt = require("jsonwebtoken");
const User = require("../models/userModels");
const db = require("../db"); // Asegúrate de que esta es la ruta correcta

// Función de registro de usuario

// Función de registro
// authController.js

const register = async (req, res) => {
    const { email, password, nombre, rol } = req.body;
  
    try {
      // Verificar si el usuario ya existe y crear uno nuevo
      const user = await User.createUser(nombre, email, password, rol);
  
      // Generar un token JWT
      const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "1h" } // Ajusta el tiempo según tus necesidades
      );
  
      // Responder con el usuario creado y el token
      return res.status(201).json({
        message: "Usuario registrado exitosamente",
        user,
        token,
      });
    } catch (error) {
      console.error(error.message);
      return res.status(500).json({
        message: error.message || "Hubo un error al registrar el usuario.",
      });
    }
  };

// Función de inicio de sesión (login)
// authController.js
const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.verifyUser(email, password);

    // Si el usuario no existe o las credenciales son incorrectas, se lanza un error
    if (!user) {
        return res.status(401).json({ message: "Correo electrónico o contraseña incorrectos." });
      }

    // Generar el token JWT
    const jwtToken = jwt.sign(
      { userId: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Respuesta al iniciar sesión
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        id: user.id,
        email: user.email,
        nombre: user.nombre,
        rol: user.rol,
      },
      token: jwtToken, // El token JWT generado para este usuario
    });
  } catch (error) {
    console.error("Error en login: ", error);
    res.status(401).json({ message: "Correo electrónico o contraseña incorrectos."});
  }
};

// Función de obtener Perfil
const getProfile = (req, res) => {
  const { id } = req.user; // Extrae el ID del usuario desde el token

  // Consulta para obtener información del usuario
  const query = "SELECT id, nombre, email, rol FROM usuarios WHERE id = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      console.error("Error al obtener perfil del usuario:", err);
      return res.status(500).json({ message: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }

    res
      .status(200)
      .json({ message: "Perfil obtenido con éxito.", user: results[0] });
  });
};

module.exports = { register, login, getProfile };
