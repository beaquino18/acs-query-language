import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const movieList = [
  { title: 'Dune: Part Three', genre: 'SciFi', director: 'Denis Villeneuve' },
  { title: 'Avengers: Doomsday', genre: 'Action', director: 'Anthony and Joe Russo' },
  { title: 'The Hunger Games: Sunrise on the Reaping', genre: 'SciFi', director: 'Francis Lawrence' },
  { title: 'Project Hail Mary', genre: 'SciFi', director: 'Phil Lord and Christopher Miller' },
  { title: '28 Years Later: The Bone Temple', genre: 'Horror', director: 'Nia DaCosta' },
  { title: 'The Odyssey', genre: 'Adventure', director: 'Christopher Nolan' }
]

const tvShowList = [
  { title: 'The Last of Us', genre: 'Horror', seasons: 2 },
  { title: 'Severance', genre: 'SciFi', seasons: 2 },
  { title: 'The Pitt', genre: 'Drama', seasons: 2 },
  { title: 'Abbott Elementary', genre: 'Comedy', seasons: 5}
]

const typeDefs = `#graphql
  enum Genre {
    SciFi
    Action
    Horror
    Adventure
    Drama
    Comedy
  }
  
  interface Media {
    title: String!
    genre: Genre!
  }

  type Movie implements Media {
    title: String!
    genre: Genre!
    director: String!
  }

  type TVShow implements Media {
    title: String!
    genre: Genre!
    seasons: Int!
  }

  type Time {
    hour: Int!
    second: Int!
    minute: Int!
  }
  
  type Query {
    allMovies: [Movie!]!
    allTVShows: [TVShow!]!
    search: [Media!]!
    getMovieIndex(id: Int!): Movie
    firstMovie: Movie
    lastMovie: Movie
    getTime: Time
    getRandom(range: Int!): Int!
  }
`

// Responsible for returning results of a query
const resolvers = {
  Media: {
    __resolveType(obj) {
      if (obj.director) return 'Movie'
      if (obj.seasons) return 'TVShow'
      return null
    }
  },
  Query: {
    allMovies: () => movieList,
    allTVShows: () => tvShowList,
    search: () => [...movieList, ...tvShowList],
    getMovieIndex: (_, { id }) => {
      return movieList[id]
    },
    firstMovie: () => movieList[0],
    lastMovie: () => {
      const indexLastMovie = movieList.length - 1
      return movieList[indexLastMovie]
    },
    getTime: () => {
      const now = new Date()
      return {
        hour: now.getHours(),
        minute: now.getMinutes(),
        second: now.getSeconds()
      }
    },
    getRandom: (_, { range} ) => {
      return Math.floor(Math.random() * range)
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await startStandaloneServer(server, {
  listen: { port:4000 }
})

console.log(`Server ready at: ${url}`)
