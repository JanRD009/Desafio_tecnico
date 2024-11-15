const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
require('dotenv').config();

// Registrar un nuevo usuario
exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    // Crear el usuario en la base de datos
    User.createUser(username, email, hashedPassword, (err, result) => {
      if (err) {
        return res.status(400).json({ error: 'Error al registrar usuario' });
      }
      res.status(201).json({ message: 'Usuario registrado' });
    });
  } catch (error) {
    res.status(400).json({ error: 'Error al registrar usuario' });
  }
};

// Iniciar sesión
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    // Buscar el usuario por email
    User.findOneByEmail(email, async (err, user) => {
      if (err) {
        return res.status(400).json({ error: 'Error al buscar el usuario' });
      }

      if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Credenciales incorrectas' });
      }

      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ message: 'Inicio de sesión exitoso', token });
    });
  } catch (error) {
    res.status(400).json({ error: 'Error en el inicio de sesión' });
  }
};

// Recuperar contraseña
exports.recoverPassword = async (req, res) => {
  const { email, newPassword } = req.body;
  try {
    User.findOneByEmail(email, async (err, user) => {
      if (err) {
        return res.status(400).json({ error: 'Error al buscar el usuario' });
      }

      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      User.updatePassword(email, hashedPassword, (err, result) => {
        if (err) {
          return res.status(400).json({ error: 'Error al actualizar la contraseña' });
        }
        res.json({ message: 'Contraseña actualizada' });
      });
    });
  } catch (error) {
    res.status(400).json({ error: 'Error al recuperar contraseña' });
  }
};
