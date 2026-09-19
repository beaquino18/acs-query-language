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

  type Roll {
    total: Int!
    sides: Int!
    rolls: [Int!]!
  }
  
  type Query {
    allMovies: [Movie!]!
    allTVShows: [TVShow!]!
    search: [Media!]!
    getMovieIndex(id: Int!): Movie
    firstMovie: Movie
    lastMovie: Movie
    movieCount: Int!
    moviesInRange(start: Int!, count: Int!): [Movie!]!
    getMoviesByGenre(genre: Genre!): [Movie!]!
    allGenres: [Genre!]!
    getTime: Time
    getRandom(range: Int!): Int!
    getRoll(sides: Int!, rolls: Int!): Roll
  }

  type Mutation {
    addMovie(title: String!, genre: Genre!, director: String!): Movie!
    addTVShow(title: String!, genre: Genre!, seasons: Int!): TVShow!
    updateMovie(id: Int!, title: String, genre: Genre, director: String): Movie
    updateTVShow(id: Int!, title: String, genre: Genre, seasons: Int): TVShow
    deleteMovie(id: Int!): Movie
    deleteTVShow(id: Int!): TVShow
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
    movieCount: () => movieList.length,
    moviesInRange: (_, { start, count }) => {
      return movieList.slice(start, start + count)
    },
    getMoviesByGenre: (_, { genre }) => {
      return movieList.filter(movie => movie.genre === genre)
    },
    allGenres: () => {
      const genres = movieList.map(movie => movie.genre)
      return [...new Set(genres)]
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
    },
    getRoll: (_, { sides, rolls: numRolls }) => {
      const results = []
      for (let i = 0; i < numRolls; i++) {
        results.push(Math.floor(Math.random() * sides) + 1)
      }
      const total = results.reduce((sum, val) => sum + val, 0)
      return { total, sides, rolls: results }
    }
  },
  Mutation: {
    addMovie: (_, { title, genre, director }) => {
      const movie = { title, genre, director }
      movieList.push(movie)
      return movie
    },
    addTVShow: (_, { title, genre, seasons }) => {
      const tvshow = { title, genre, seasons }
      tvShowList.push(tvshow)
      return tvshow
    },
    updateMovie: (_, { id, title, genre, director }) => {
      const movie = movieList[id]
      if (movie === undefined) {
        return null
      }
      movie.title = title ?? movie.title
      movie.genre = genre ?? movie.genre
      movie.director = director ?? movie.director
      return movie
    },
    updateTVShow: (_, { id, title, genre, seasons }) => {
      const tvshow = tvShowList[id]
      if (tvshow === undefined) {
        return null
      }

      tvshow.title = title ?? tvshow.title
      tvshow.genre = genre ?? tvshow.genre
      tvshow.seasons = seasons ?? tvshow.seasons
      return tvshow
    },
    deleteMovie: (_, { id }) => {
      const movie = movieList[id]
      if (movie === undefined) {
        return null
      }

      movieList.splice(id, 1)
      return movie
    },
    deleteTVShow: (_, { id }) => {
      const tvshow = tvShowList[id]
      if (tvshow === undefined) {
        return null
      }

      tvShowList.splice(id, 1)
      return tvshow
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await startStandaloneServer(server, {
  listen: { port:4000 }
})

console.log(`Server ready at: ${url}`)
