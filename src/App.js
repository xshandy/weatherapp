import React from 'react';
import './App.css';
import Weather from "./Weather"

function App() {
  return (
    <div className="App">
      <div className="container">
       
    
     <Weather defaultCity="Seoul" />
    
     <footer>
      This project was coded by Shandy Shek and is <a href="https://github.com/xshandy/weatherapp" target="_blank" rel="noopener noreferrer">open-sourced on Github.</a>
     </footer>
     </div>
    </div>
  );
}

export default App;
