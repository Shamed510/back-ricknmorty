const { gql } = require('apollo-server-express')

const episodeTypeDefs = gql`

    type Episode{
        _id: String!,
        name: String,
        air_date: String,
        episode: String,
        characters: [Character],
        created: String
    }

    type Query{
        getAllEpisodes: [Episode]
        getEpisodeById(_id: String!): Episode
        getEpisodesByPage(page: Int!): EpisodePageResult
    }

    type EpisodePageResult {
        info: PageInfo!
        episodes: [Episode!]!
    }

    type PageInfo {
        count: Int!
        page: Int!
        totalPages: Int
        next: Int
        prev: Int
    }
`

module.exports = { episodeTypeDefs }