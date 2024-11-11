import React, { useState, useEffect } from "react";
import axios from "axios";
import FormattedDate from "./FormattedDate";
import "./Weather.css";
import WeatherTemperature from "./WeatherTemperature";

export default function Weather(props) {
  const [weatherData, setWeatherData] = useState({ ready: false });
  const [city, setCity] = useState(props.defaultCity || "London"); // default to London
  const [inputCity, setInputCity] = useState(props.defaultCity || "London"); // local input state

  useEffect(() => {
    if (city) {
      search();
    }
  }, [city]); // Trigger search when `city` changes

  function handleResponse(response) {
    setWeatherData({
      ready: true,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      date: new Date(response.data.dt * 1000),
      humidity: response.data.main.humidity,
      city: response.data.name,
      description: response.data.weather[0].description,
      iconUrl: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
  }

  function handleError(error) {
    console.error("Error fetching weather data:", error);
    alert("Sorry, there was an error fetching the weather data.");
  }

  function search() {
    const apiKey = "6643c7326a4c2a38838264a28531d97e";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then(handleResponse)
      .catch(handleError);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setCity(inputCity); // Update the city state with the value from input
  }

  function handleInputChange(event) {
    setInputCity(event.target.value); // Update local input state
  }

  if (weatherData.ready) {
    return (
      <div className="Weather">
        <div className="Weather-header">
          <h1>{weatherData.city}</h1>
          <div className="search-container">
            <form onSubmit={handleSubmit}>
              <input
                type="search"
                placeholder="Enter a city.."
                className="form-control"
                value={inputCity}
                onChange={handleInputChange}
              />
              <input
                type="submit"
                value="Search"
                className="btn btn-primary w-100"
              />
            </form>
          </div>
        </div>
       
        <ul>
          <li>
            <FormattedDate date={weatherData.date} />
            </li>
          <li className="text-capitalize">{weatherData.description}</li>
        </ul>
        
        <div className="row">
          <div className="col-6">
            <img src={weatherData.iconUrl} alt={weatherData.description} />
            <WeatherTemperature celsius={weatherData.temperature} />
          </div>
          <div className="col-6">
            <ul>
              <li>Humidity: {weatherData.humidity}%</li>
              <li>Wind: {weatherData.wind} km/h</li>
            </ul>
          </div>
        </div>
      </div>
    );
  } else {
    return "Loading...";
  }
}
