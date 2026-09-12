import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './apolloClient'
import WeatherInfo from './WeatherInfo'
import './Weather.css'

function Weather() {
  const [ zip, setZip ] = useState('')
  const [ units, setUnits ] = useState('metric')
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
        variables: { zip: parseInt(zip, 10), units}
      })
      setWeather(json)
    } catch(err) {
      console.log(err.message)
    }
  }

  return (
    <div className="Weather">

      <h1 className="title">What's the weather today?</h1>

      <div>{renderWeatherContent(weather)}</div>

      <form onSubmit={(e) => {
        e.preventDefault()
        getWeather()
      }}>
        <label htmlFor="zip">Type zip code</label>
        <input
          id="zip"
          value={zip}
          onChange={(e) => setZip(e.target.value)}
        />

        <div className="units">
          <label>
            <input
              type="radio"
              name="units"
              value="metric"
              checked={units === 'metric'}
              onChange={() => setUnits('metric')}
            />
            Metric
          </label>

          <label>
            <input
              type="radio"
              name="units"
              value="imperial"
              checked={units === 'imperial'}
              onChange={() => setUnits('imperial')}
            />
            Imperial
          </label>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  )
}

function renderWeatherContent(weather) {
  if (!weather) return null

  const w = weather.data.getWeather
  if (w.cod !== "200") {
    return <p className="error">{w.message}</p>
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
