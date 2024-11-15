const dbConfig = require('../config/db.config'); // Conexión a la base de datos

// Crear un nuevo usuario
const createUser = (username, email, password, callback) => {
  const query = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
  dbConfig.query(query, [username, email, password], (err, result) => {
    if (err) {
      console.error('Error al insertar usuario en la base de datos:', err); // Agregar log de error
      return callback(err, null);
    }
    console.log('Usuario registrado correctamente:', result); // Ver si el usuario se registra correctamente
    callback(null, result);
  });
};

// Encontrar un usuario por su email
const findOneByEmail = (email, callback) => {
  const query = 'SELECT * FROM users WHERE email = ?';
  dbConfig.query(query, [email], (err, results) => {
    if (err) return callback(err, null);
    if (results.length > 0) {
      return callback(null, results[0]);
    }
    callback(null, null);
  });
};

// Actualizar la contraseña de un usuario
const updatePassword = (email, newPassword, callback) => {
  const query = 'UPDATE users SET password = ? WHERE email = ?';
  dbConfig.query(query, [newPassword, email], callback);
};

module.exports = {
  createUser,
  findOneByEmail,
  updatePassword
};
