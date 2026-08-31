import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import 'dotenv/config'

const typeDefs = `#graphql
  type Test {
    message: String!
  }

  type Query {
    test: Test
  }
`
const resolvers = {
  Query: {
    // resolvers here
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`Server ready at: ${url}`)
