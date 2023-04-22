const Character = require('./models/Character');
const Location = require('./models/Location');
const Episode = require('./models/Episode');

/* Los resolvers definen que voy responder cuando se pida un tipo de dato
  o ejecute alguna consulta definida aqui mismo */
const resolvers = {
  Query: {
    getAllCharacters: async () => {
      const characters = (await Character.find()).slice(0, 3)
      return characters
    },
    getCharacterById: async (parent, args) => {
      const character = await Character.findById(args._id).populate('location').populate('episode');
      return {
        _id:character._id,
        name:character.name,
        status:character.status,
        species:character.species,
        type:character.type,
        gender:character.gender,
        origin:character.location,
        location: character.location,
        image: character.image,
        episode: character.episode,
        created: character.created
      };
    },
    getCharactersByPage: async (parent, { page }) => {
      const PAGE_SIZE = 20;
      const skip = (page - 1) * PAGE_SIZE;
      const characters = await Character.find()
        .skip(skip)
        .limit(PAGE_SIZE).populate('location').populate('episode');
      const count = await Character.countDocuments();
      const totalPages = Math.ceil(count / PAGE_SIZE);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevPage = hasPrevPage ? page - 1 : null;
      const pageInfo = {
        count,
        page: page,
        totalPages: totalPages,
        next: nextPage,
        prev: prevPage,
      };
      return { characters, info: pageInfo };
    },
    getAllLocations: async () => {
      const locations = (await Location.find()).slice(0, 3)
      return locations
    },
    getLocationById: async (parent, args) => {
      const location = await Location.findById(args._id).populate('residents');
      return {
        _id:location._id,
        name:location.name,
        type:location.type,
        dimension:location.dimension,
        residents:location.residents,
        created: location.created
      };
    },
    getLocationsByPage: async (parent, { page }) => {
      const PAGE_SIZE = 20;
      const skip = (page - 1) * PAGE_SIZE;
      const locations = await Location.find()
        .skip(skip)
        .limit(PAGE_SIZE).populate('residents');
      const count = await Location.countDocuments();
      const totalPages = Math.ceil(count / PAGE_SIZE);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevPage = hasPrevPage ? page - 1 : null;
      const pageInfo = {
        count,
        page: page,
        totalPages: totalPages,
        next: nextPage,
        prev: prevPage,
      };
      return { locations, info: pageInfo };
    },
    getAllEpisodes: async () => {
      const episodes = (await Episode.find()).slice(0, 3)
      return episodes
    },
    getEpisodeById: async (parent, args) => {
      const episode = await Episode.findById(args._id).populate('characters');
      return {
        _id:episode._id,
        name:episode.name,
        air_date:episode.air_date,
        episode:episode.episode,
        characters:episode.characters,
        created: episode.created
      };
    },
    getEpisodesByPage: async (parent, { page }) => {
      const PAGE_SIZE = 20;
      const skip = (page - 1) * PAGE_SIZE;
      const episodes = await Episode.find()
        .skip(skip)
        .limit(PAGE_SIZE).populate('characters');
      const count = await Episode.countDocuments();
      const totalPages = Math.ceil(count / PAGE_SIZE);
      const hasNextPage = page < totalPages;
      const hasPrevPage = page > 1;
      const nextPage = hasNextPage ? page + 1 : null;
      const prevPage = hasPrevPage ? page - 1 : null;
      const pageInfo = {
        count,
        page: page,
        totalPages: totalPages,
        next: nextPage,
        prev: prevPage,
      };
      return { episodes, info: pageInfo };
    }
  }
}


/* Exportamos los resolvers */
module.exports = { resolvers }