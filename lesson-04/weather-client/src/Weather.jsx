import { useState } from 'react'
import { gql } from '@apollo/client'
import { client } from './apolloClient'

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

      {weather ? <h1>{weather.data.getWeather.temperature}</h1>: null}

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

export default Weather
