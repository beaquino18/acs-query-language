import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'

const typeDefs = `#graphql
  type About {
    message: String!
  }

  type Meal {
    description: String!
  }
    
  type Query {
    getAbout: About
    getMeal: Meal
  }
`

// Responsible for returning results of a query
const resolvers = {
  Query: {
    getAbout: () => {
      return { message: 'Hello World' }
    },
    getMeal: () => {
      return { description: 'Noodles' }
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await startStandaloneServer(server, {
  listen: { port:4000 }
})

console.log(`Server ready at: ${url}`)
