const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db"); // Aquí debes importar la conexión de tu base de datos (ej. MySQL)

const User = {
  // Función para crear un nuevo usuario
  createUser: async (nombre, email, password, rol) => {
    try {
      // Verificar si el usuario ya existe
      const [existingUser] = await db.execute(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );
      if (existingUser.length > 0) {
        throw new Error("El correo electrónico ya está registrado.");
      }
  
      // Cifrar la contraseña
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Insertar el nuevo usuario en la base de datos
      const [resultUser] = await db.execute(
        "INSERT INTO usuarios (nombre, email, password, rol) VALUES (?, ?, ?, ?)",
        [nombre, email, hashedPassword, rol]
      );
  
      // Retorna los datos del usuario creado (solo lo necesario)
      return { 
        id: resultUser.insertId, 
        email, 
        nombre, 
        rol 
      }; 
    } catch (error) {
      throw new Error(error.message || "Hubo un error al registrar el usuario.");
    }
  },
  

  // Función para verificar las credenciales del usuario
  verifyUser: async (email, password) => {
    try {
      // Obtener el usuario desde la base de datos
      const [user] = await db.execute(
        "SELECT * FROM usuarios WHERE email = ?",
        [email]
      );
  
      if (user.length === 0) {
        throw new Error("Correo electrónico o contraseña incorrectos.");
      }
  
      // Verificar la contraseña cifrada
      const isPasswordCorrect = await bcrypt.compare(
        password,
        user[0].password
      );
      if (!isPasswordCorrect) {
        throw new Error("Correo electrónico o contraseña incorrectos.");
      }
  
      // Retorna los detalles del usuario si las credenciales son correctas
      return { 
        id: user[0].id, 
        email: user[0].email, 
        nombre: user[0].nombre, 
        rol: user[0].rol 
      };
    } catch (error) {
      throw new Error(error.message || "Hubo un error al iniciar sesión.");
    }
  },
  
};

module.exports = User;
