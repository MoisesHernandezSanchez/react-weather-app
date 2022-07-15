import { useState } from 'react'
import { WEATHER_API_KEY, WEATHER_API_URL } from './api'
import './App.css'
import CurrentWeather from './components/CurrentWeather/CurrentWeather'
import Forecast from './components/Forecast/Forecast'
import Search from './components/Search/Search'

export default function App() {
  // Create variables for weather and forecast
  const [currentWeather, setCurrentWeather] = useState(null)
  const [forecast, setForecast] = useState(null)

  function handleOnSearchChange(searchData) {
    const [lat, lon] = searchData.value.split(' ')

    // Retrieve weather and forecast of searched location
    const currentWeatherFetch = fetch(
      `${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )

    const forecastFetch = fetch(
      `${WEATHER_API_URL}forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
    )

    // Set weather and forecast to appropriate variables
    Promise.all([currentWeatherFetch, forecastFetch])
      .then(async (response) => {
        const weatherResponse = await response[0].json()
        const forecastResponse = await response[1].json()

        setCurrentWeather({ city: searchData.label, ...weatherResponse })
        setForecast({ city: searchData.label, ...forecastResponse })
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className='container'>
      <Search onSearchChange={handleOnSearchChange} />
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  )
}
