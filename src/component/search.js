import React, { useState, useEffect } from "react";
import axios from "axios";

export default function searchForm() {
  let [city, setCity] = useState("");
  let [processed, setProcessed] = useState(false);
  let [weather, setWeather] = useState({});

  function showWeather(response) {
    setProcessed(true);
    setWeather({
      city: response.data.name,
      temperature: response.data.main.temp,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "1a2b7258ebd456c01aef9175dfe8b709";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showWeather);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <div className="Weatherform">
      <form onSubmit={handleSubmit}>
        <input type="search" placeholder="Type a city" onChange={updateCity} />
        <button type="Submit">Search</button>
      </form>
    </div>
  );

  if (processed) {
    return (
      <div>
        {form}
        <ul>
          <li>City: {weather.city}</li>
          <li>Temperature: {Math.round(weather.temperature)}°C</li>
          <li>Description: {weather.description}</li>
          <li>Humidity: {weather.humidity}%</li>
          <li>Wind: {weather.wind}km/h</li>
          <li>
            <img src={weather.icon} alt={weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}
