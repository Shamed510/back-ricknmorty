const { gql } = require('apollo-server-express')

const locationTypeDefs = gql`

    type Location{
        _id: String!,
        name: String,
        type: String,
        dimension: String,
        residents: [Character],
        created: String
    }

    type Query{
        getAllLocations: [Location]
        getLocationById(_id: String!): Location
        getLocationsByPage(page: Int!): LocationPageResult
    }

    type LocationPageResult {
        info: PageInfo!
        locations: [Location!]!
    }

    type PageInfo {
        count: Int!
        page: Int!
        totalPages: Int
        next: Int
        prev: Int
    }

`

module.exports = { locationTypeDefs }