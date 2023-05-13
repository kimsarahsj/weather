import React from "react";
import axios from "axios";

export default function localWeather({ setHello }) {
  const [name, setName] = React.useState("");
  const [temp, setTemp] = React.useState("");

  React.useEffect(() => {
    let apiKey = "6bfa54f242cbb59343d4e58db578dc61";
    let city = "atlanta";
    let unit = "imperial";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

    console.log(apiUrl);
    fetch(apiUrl, { method: "GET" })
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setTemp(Math.round(data.main.temp));
        setHello("world");
      });
  }, [name, temp]);

  return (
    <div>
      <h2>{name}</h2>
      <h3>{temp}°F</h3>
    </div>
  );
}
