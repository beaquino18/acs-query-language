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
    temperature: Float
    description: String
    feels_like: Float
    temp_min: Float
    temp_max: Float
    pressure: Int
    humidity: Int
    cod: String
    message: String
  }

  type Query {
    getWeather(zip: Int!, units: Units!): Weather!
  }
`
const resolvers = {
  Query: {
    getWeather: async (_, { zip, units = 'imperial' }) => {
      const apikey = process.env.OPENWEATHERMAP_API_KEY
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&units=${units}&appid=${apikey}`
      const res = await fetch(url)
      const json = await res.json()
      console.log(json)

      // cod: 200 (number) on success, and
      // cod: "404" (string) + a message when something went wrong.
      if (Number(json.cod) !== 200) {
        return { cod: String(json.cod), message: json.message }
      }

      return {
        temperature: json.main.temp,
        description: json.weather[0].description,
        feels_like: json.main.feels_like,
        temp_min: json.main.temp_min,
        temp_max: json.main.temp_max,
        pressure: json.main.pressure,
        humidity: json.main.humidity,
        cod: String(json.cod),
        message: null
      }
    }
  }
}

const server = new ApolloServer({ typeDefs, resolvers })

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 }
})

console.log(`Server ready at: ${url}`)
