const sqlite3 = require("sqlite3").verbose();
const path = require("path");

// Crear la base de datos en la carpeta del proyecto
const ubicacion = path.join(__dirname, "visitas.db");

const db = new sqlite3.Database(ubicacion, (error) => {
    if (error) {
        console.log("Error al conectar:", error.message);
    } else {
        console.log("Base de datos conectada correctamente");
        console.log("Ubicacion:", ubicacion);
    }
});

// Crear tabla
db.run(`
    CREATE TABLE IF NOT EXISTS visitas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        curso TEXT,
        motivo TEXT
    )
`);

module.exports = db;