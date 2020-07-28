import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Filter = ({ filter, onFilterChange }) => {
  return (
    <div>
      Filter: <input value={filter} onChange={onFilterChange} />
    </div>
  )
}

const CountryInfo = ({ country }) => {
  const api_key = process.env.REACT_APP_API_KEY
  const [weather, setWeather] = useState('')

  useEffect(() => {
    console.log('fetching weather')
    axios
      .get(`http://api.weatherstack.com/current?access_key=${api_key}&query=${country.capital}`)
      .then(response => {
        setWeather(response.data)
      })
  }, [])

  return (
    <div>
      <h1>{country.name}</h1>
      <li>Capital: {country.capital}</li>
      <li>Population: {country.population}</li>
      <h2>Languages</h2>
      <ul>
        {country.languages.map(language => <li key={language.iso639_1}>{language.name}</li>)}
      </ul>
      <img src={country.flag} height='250' alt={`flag of ${country.name}`} />
      <h2>Weather in {country.capital}</h2>
      <Weather weather={weather} />
    </div>
  )
}

const Weather = ({ weather }) => {
  if (weather !== '') {
    return (
      <div>
        <p><strong>Temperature: </strong>{weather.current.temperature} C</p>
        <img src={weather.current.weather_icons} height='50' alt='weather icon' />
        <p><strong>Wind: </strong>{weather.current.wind_speed} kph {weather.current.wind_dir}</p>
      </div>
    )
  }
  else {
    return('Weather data unavailable')
  }
}

const Entry = ({ entry, FilterClick }) => {
  return (
    <li>{entry.name} <button onClick={() => FilterClick(entry)}>show</button></li>
  )
}

function App() {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])

  useEffect(() => {
    console.log('fetching data')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const onFilterChange = (event) => {
    setFilter(event.target.value)
    setFilteredCountries(
      countries.filter(country => country.name.toLowerCase().includes(filter.toLowerCase()))
    )
  }

  const FilterClick = ({ name }) => {
    setFilter(name)
    setFilteredCountries(countries.filter(country => country.name === name))
  }

  if (filteredCountries.length === 1) {
    return (
      <div>
        <Filter filter={filter} onFilterChange={onFilterChange} />
        <CountryInfo country={filteredCountries[0]} />
      </div>
    )
  }
  if (filteredCountries.length <= 10) {
      return (
        <div>
          <Filter filter={filter} onFilterChange={onFilterChange} />
          {filteredCountries.map(country => 
          <Entry key={country.name} entry={country} FilterClick={FilterClick}/> )}
        </div>
      )
    }
  else {
      return (
      <div>
        <Filter filter={filter} onFilterChange={onFilterChange} />
        Too many countries to list, please specify.
      </div>
      ) 
    }
  }

export default App