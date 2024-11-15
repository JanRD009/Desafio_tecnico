const mysql = require('mysql2');  // Asegúrate de importar el paquete mysql2

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,  // Opcionalmente, usa el puerto desde las variables de entorno
});

db.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err);
    console.error(err.stack);
    process.exit(1);  // Detiene el proceso si no puede conectar
  }
  console.log('Conexión a la base de datos exitosa');
});

module.exports = db;
