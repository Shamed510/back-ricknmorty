const mongoose = require('mongoose');
const fs = require('fs');


// Definir los esquemas de las colecciones
const characterSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  status: { type: String },
  species: { type: String },
  gender: { type: String },
  origin: { type: String },
  location: { type: String },
  image: { type: String },
  created: { type: String }
});
const locationSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  type: { type: String },
  dimension: { type: String },
  residents: { type: Array },
  created: { type: String }
});
const episodeSchema = new mongoose.Schema({
  _id: { type: String },
  name: { type: String },
  air_date: { type: String },
  episode: { type: String },
  characters: { type: Array },
  created: { type: String }
});

async function seed() {
  const uri = 'mongodb://127.0.0.1:27017/ricknmorty'; // cadena de conexión a la base de datos
  try {
    // intenta conectarse a la base de datos
    await mongoose.connect(uri);
    console.log("DB Connected");

    // Cargar los datos en la colección "characters"
    const characterData = fs.readFileSync('./data/character.json');
    const characters = JSON.parse(characterData);
    const Character = mongoose.model('Character', characterSchema);
    await Character.insertMany(characters);
    console.log("Characters loaded successfully");

    // Cargar los datos en la colección "locations"
    const locationData = fs.readFileSync('./data/locations.json');
    const locations = JSON.parse(locationData);
    const Location = mongoose.model('Location', locationSchema);
    await Location.insertMany(locations);
    console.log("Locations loaded successfully");

    // Cargar los datos en la colección "episodes"
    const episodeData = fs.readFileSync('./data/episodes.json');
    const episodes = JSON.parse(episodeData);
    const Episode = mongoose.model('Episode', episodeSchema);
    await Episode.insertMany(episodes);
    console.log("Episodes loaded successfully");
  } catch (err) {
    console.error("Error al cargar los datos:", err);
  } finally {
    await mongoose.connection.close(); // cierra la conexión a la base de datos
  }
  process.exit(0);
}

seed();
