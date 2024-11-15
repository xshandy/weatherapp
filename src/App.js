import React, { useState } from 'react';
import './App.css';
import Weather from "./Weather";

function App() {
  // Set the default city to "London"
  const [city, setCity] = useState("London");

  // Function to handle search form submission
  function handleSearch(event) {
    event.preventDefault();
    const newCity = event.target.city.value; // Get the city name from the input
    setCity(newCity); // Update the city state
  }

  return (
    <div className="App">
      <div className="container">
        {/* Search bar to change city */}
        <div className="search-bar">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              name="city"
              placeholder="Enter city"
              className="form-control"
            />
            <button type="submit" className="btn btn-primary">Search</button>
          </form>
        </div>

        {/* Weather component will receive the city as a prop */}
        <Weather city={city} />

        <footer>
          This project was coded by Shandy Shek and is <a href="https://github.com/xshandy/weatherapp" target="_blank" rel="noopener noreferrer">open-sourced on Github.</a>
        </footer>
      </div>
    </div>
  );
}

export default App;
