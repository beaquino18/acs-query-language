export default function WeatherInfo(props) {

  return (
    <div className="WeatherInfo">
      <h1>{props.temp}°</h1>
      <p>Description: {props.description}</p>
      <p>Feels like: {props.feels_like}°</p>
      <p>Low: {props.temp_min}° / High: {props.temp_max}°</p>
      <p>Pressure: {props.pressure} hPa</p>
      <p>Humidity: {props.humidity}%</p>
    </div>
  )
}
