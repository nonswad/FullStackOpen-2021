import axios from 'axios'
import React, { useEffect, useState } from 'react'
import coutriesServices from './services/countries'

const FindCountires = ({ handleCountryChange, newCountry }) => {
  return(
    <div>
      find countries
      <input 
      value = {newCountry}
      onChange = {handleCountryChange}
      />
    </div>
  )
}

const ShowCountry = ({ country }) => {
  const languages = Object.values(country.languages).filter(language => language) 
  return(
    <div>
      <h2>{country.name.common}</h2>
      <p>population {country.population}</p>
      <p>capital {country.capital}</p>
      <h2>languages</h2>
      <ul> 
        {languages.map(lang => 
          <li key = {lang}>{lang}</li>
        )}
      </ul>
      {country.flag}
      <Weather capital = {country.capital} />
    </div>
  )
}

const CountriesData = ({ countriesToShow, handleClick, showCountry }) => {
  if (countriesToShow.length > 10){
    return(
      <p>Too many matches, specify another filter</p>
    )
  }
  else if (countriesToShow.length > 1){
    const countriesNames = countriesToShow.map(c => c.name.common)
    return(
      <div>
        {countriesToShow.map(country => {
            return(
              <div key = {country.name.common}>
                {country.name.common} {' '}
                <button onClick={() => handleClick(country.name.common)}>
                  {showCountry[country.name.common] ? 'unshow' : 'show'}
                </button>
                {showCountry[country.name.common] ?
                  <ShowCountry country = {country}/> :
                  null
                }
              </div>
            )
          }
        )}
      </div>
    )
  }
  else if (countriesToShow.length === 1){
    return(
      <div>
        <ShowCountry country = {countriesToShow[0]}/>
      </div>
    )
  }
  else{
    return(
      <p></p>
    )
  }
}

const Weather = ({ capital }) => {
  const [ weather, setWeather] = useState({})
  
  const api_key = process.env.REACT_APP_API_KEY

  useEffect(() => {
    axios
    .get(`http://api.openweathermap.org/data/2.5/weather?q=${capital[0]}&APPID=${api_key}`)
    .then(response => {
      setWeather(response.data)
    })
    .catch(error => {
      console.log('Error is', error)
    })
  }, [])

  return (
    <>
      {Object.keys(weather).length === 0 || weather.error ? (
        <h2>'No data for weather'</h2>
      ) : (
        <>
          <h2>Weather in {capital}</h2>
          <p>Temperature: {Math.round(weather.main.temp - 273)}° Celsius</p>
          <p>
          Wind: {weather.wind.speed} Km/hr, degree: {weather.wind.deg}
          </p>
        </>
      )}
    </>
  )
}

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newCountry, setNewCountry ] = useState('')
  const [ showCountry, setShow ] = useState({})

  useEffect(() => {
    coutriesServices
    .getAll()
    .then(country => {
      setCountries(country)
    })
    .catch(error => {
      console.log('Error is', error)
    })
  }, [])

  const handleCountryChange = (event) => {
    setNewCountry(event.target.value)
  }

  const countriesToShow = newCountry 
  ? countries.filter(country => {return country.name.common.toLowerCase().includes(newCountry.toLocaleLowerCase())}) 
  : newCountry

  const handleClick = (name) => {
    setShow(prev => ({
      ...prev, 
      [name]: !prev[name]
    }))
  }

  return(
    <div>
      <FindCountires handleCountryChange = {handleCountryChange} newCountry = {newCountry}/>
      <CountriesData 
        countriesToShow = {countriesToShow} 
        handleClick = {handleClick}
        showCountry = {showCountry}
      />
    </div>
  )
}

export default App
