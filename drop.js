const mongoose = require('mongoose');

async function drop() {
  const uri = 'mongodb://127.0.0.1:27017/ricknmorty'; // cadena de conexión a la base de datos
  try {
    await mongoose.connect(uri); // intenta conectarse a la base de datos
    console.log("DB Connected");
    await mongoose.connection.dropCollection('characters'); // elimina la colección 1
    await mongoose.connection.dropCollection('locations'); // elimina la colección 2
    await mongoose.connection.dropCollection('episodes');// elimina la colección
    console.log("Collection dropped successfully");
  } catch (err) {
    console.error("Error al eliminar la colección:", err);
  } finally {
    await mongoose.connection.close(); // cierra la conexión a la base de datos
  }
  process.exit(0);
}

drop();
