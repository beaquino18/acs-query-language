import { ApolloServer } from '@apollo/server'
import { startStandaloneServer } from '@apollo/server/standalone'
import 'dotenv/config'

const typeDefs = `#graphql
  enum Units {
    standard
    metric
    imperial
  }

  type Weather {
    temperature: Float!
    description: String!
  }

  type Query {
    getWeather(zip: Int!, units: Units!): Weather!
  }
`
const resolvers = {
  Query: {
    getWeather: async (_, { zip, units = 'imperial' }) => {
      const apikey = process.env.OPENWEATHERMAP_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${apikey}`
      const res = await fetch(url)
      const json = await res.json()
      console.log(json)
      const temperature = json.main.temperature
      const description = json.weather[0].description
      return { temperature, description }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`Server ready at: ${url}`)
