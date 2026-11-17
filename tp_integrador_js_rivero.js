const db = require("./database");

// Crear array de visitas
let visitas = [];

// Funcion para registrar estudiantes
function registrarVisita(nombre, curso, motivo) {
    return {
        nombre: nombre,
        curso: curso,
        motivo: motivo
    };
}

// Agregar tres estudiantes
visitas.push(registrarVisita("Martina", "5 A", "Robotica"));
visitas.push(registrarVisita("Juan", "6 B", "Impresion 3D"));
visitas.push(registrarVisita("Sofia", "5 B", "Trabajo escolar"));

// Funcion para mostrar visitas
function mostrarVisitas(lista) {
    lista.forEach((visita) => {
        console.log(visita.nombre, visita.curso, visita.motivo);
    });

    return lista.length;
}

// Funcion flecha para buscar un estudiante
const buscarVisita = (nombre, lista) => {
    return lista.find((visita) => visita.nombre === nombre);
};

// Conectar y guardar en la base de datos
db.serialize(() => {

    db.get("SELECT COUNT(*) AS cantidad FROM visitas", (error, fila) => {

        if (error) {
            console.log(error.message);
            db.close();
            return;
        }

        if (fila.cantidad === 0) {
            visitas.forEach((visita) => {
                db.run(
                    "INSERT INTO visitas (nombre, curso, motivo) VALUES (?, ?, ?)",
                    [visita.nombre, visita.curso, visita.motivo]
                );
            });
        }

        // Mostrar datos guardados
        db.all("SELECT * FROM visitas", (error, registros) => {

            if (error) {
                console.log(error.message);
            } else {
                console.log("\nLISTA DE VISITAS");

                console.log("Cantidad de visitas:", mostrarVisitas(registros));

                if (registros.length > 0) {
                    console.log("Primer estudiante:", registros[0].nombre);

                    let encontrado = buscarVisita("Juan", registros);

                    if (encontrado) {
                        console.log("Estudiante encontrado:", encontrado.nombre);
                    } else {
                        console.log("Estudiante no encontrado");
                    }
                }
            }

            db.close();
        });
    });
});