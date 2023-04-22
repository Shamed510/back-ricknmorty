/* Para hacer una definicion haremos uso de 'gql' */
const { gql } = require('apollo-server-express')

/* Aqui se definen los tipos de consulta, con sus nombres
ademas de que campos llevan dentro y que devuelven dichos
campos (PARA GRAPHQL)*/

/* Se pueden crear nuestros propios tipos de datos*/

/*Para obtener datos se realiza un Query */
const characterTypeDefs = gql`

    type Character{
        _id: String!,
        name: String,
        status: String,
        species: String,
        type: String,
        gender: String,
        origin: Location,
        location: Location,
        image: String,
        episode: [Episode],
        created: String
    }

    type Query{
        getAllCharacters: [Character]
        getCharacterById(_id: String!): Character
        getCharactersByPage(page: Int!): CharacterPageResult
    }

    type CharacterPageResult {
        info: PageInfo!
        characters: [Character!]!
    }

    type PageInfo {
        count: Int!
        page: Int!
        totalPages: Int
        next: Int
        prev: Int
    }

`

module.exports = { characterTypeDefs }