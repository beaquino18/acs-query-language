import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './apolloClient'
import WeatherInfo from './WeatherInfo'

function Weather() {
  const [ zip, setZip ] = useState('')
  const [ units, setUnits ] = useState('')
  const [ weather, setWeather ] = useState(null)

  async function getWeather() {
    try {
      const json = await client.query({
        query: gql`
          query GetWeather($zip: Int!, $units: Units!) {
            getWeather(zip: $zip, units: $units) {
              temperature
              description
              feels_like
              temp_min
              temp_max
              pressure
              humidity
              cod
              message
            }
          }
        `,
        variables: { zip: parseInt(zip, 10), units: 'metric'}
      })
      setWeather(json)
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div className="Weather">

      <div>{renderWeatherContent(weather)}</div>

      <form onSubmit={(e) => {
        e.preventDefault()
        getWeather()
      }}>
        <input
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function renderWeatherContent(weather) {
  if (!weather) return null

  const w = weather.data.getWeather
  if (w.cod !== "200") {
    return w.message
  }

  return (
    <WeatherInfo
      temp={w.temperature}
      description={w.description}
      feels_like={w.feels_like}
      temp_min={w.temp_min}
      temp_max={w.temp_max}
      pressure={w.pressure}
      humidity={w.humidity}
    />
  )
}



export default Weather
