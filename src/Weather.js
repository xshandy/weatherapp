import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import WeatherTemperature from "./WeatherTemperature";  
import "./Weather.css";

function Weather({ city }) {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const apiKey = "04ate034e9ce8febe66dc16ff8de2o76";  

  
  const searchCity = useCallback((city) => {
    setLoading(true);
    const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Current weather data:", response.data);
        setWeatherData(response.data);
        getForecast(city); 
      })
      .catch((error) => {
        console.error("Error fetching current weather:", error);
        setLoading(false);
        setError("Error fetching current weather.");
      });
  }, []);


  function getForecast(city) {
    const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
    axios
      .get(apiUrl)
      .then((response) => {
        console.log("Forecast data:", response.data);
        setForecastData(response.data.daily.slice(1, 6));
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching forecast:", error);
        setLoading(false);
        setError("Error fetching forecast.");
      });
  }

  
  function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const day = dayNames[date.getDay()];
    const hours = date.getHours().toString().padStart(2, "0"); 
    const minutes = date.getMinutes().toString().padStart(2, "0"); 
    return `${day} ${hours}:${minutes}`; 
  }

 
  function formatDay(timestamp) {
    const date = new Date(timestamp * 1000);
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return dayNames[date.getDay()];
  }

  
  useEffect(() => {
    if (city) {
      searchCity(city);
    }
  }, [city, searchCity]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!weatherData) return <div>No data available.</div>;

  return (
    <div className="weather-app-container">
    <div className="weather-app-data">
      <div className="weather-app-left">
      <div className="weather-app-city">{weatherData.city}</div>
      <div className="weather-app-date">{formatDate(weatherData.time)}</div> 
      </div>
      <div className="weather-app-right">
      <div className="weather-app-temperature-container">
        <img
          src={weatherData.condition.icon_url}
          alt="Weather Icon"
          className="weather-app-icon"
        />
        <div>
          <WeatherTemperature celsius={weatherData.temperature.current} />
        </div>
      </div>
        <div className="weather-app-details">
          {weatherData.condition.description}
          <br />
          Humidity: {weatherData.temperature.humidity}%  Wind: {weatherData.wind.speed} km/h
        </div>
      </div>
      </div>

      
      <div className="weather-forecast">
        {forecastData.map((day, index) => (
          <div key={index} className="weather-forecast-day">
            <div className="weather-forecast-date">
              {formatDay(day.time)}
            </div>
            <img
              src={day.condition.icon_url}
              alt="Forecast Icon"
              className="weather-forecast-icon"
            />
            <div className="weather-forecast-temperatures">
              <span className="weather-forecast-temperature">
                {Math.round(day.temperature.maximum)}º
              </span>
              <span className="weather-forecast-temperature-low">{Math.round(day.temperature.minimum)}º</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Weather;
