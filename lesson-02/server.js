import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'


const typeDefs = `#graphql
  type About {
    message: String!
  }

  enum MealTime{
    breakfast
    lunch
    dinner
  }

  type Meal {
    description: String!
  }
    
  type Query {
    getAbout: About
    getMeal(time: MealTime!): Meal
  }
`

// Responsible for returning results of a query
const resolvers = {
  Query: {
    getAbout: () => {
      return { message: 'Hello World' }
    },
    getMeal: (_, { time }) => {
      const allMeals = { breakfast: 'toast', lunch: 'noodles', dinner: 'pizza'}
      return { description: allMeals[time] }
    },
  }
}

const server = new ApolloServer({ typeDefs, resolvers })
const { url } = await startStandaloneServer(server, {
  listen: { port:4000 }
})

console.log(`Server ready at: ${url}`)
