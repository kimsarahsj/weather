import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React, { useEffect } from "react";
import {getFormattedDate, convertToCelsius, convertToKM} from "../util/calc";

export default function Home() {
  const [city, setCity] = React.useState("");
  const [temp, setTemp] = React.useState();
  const [description, setDescription] = React.useState("");
  const [high, setHigh] = React.useState({});
  const [low, setLow] = React.useState({});
  const [wind, setWind] = React.useState({});
  const [icon, setIcon] = React.useState("");
  const [week, setWeek] = React.useState([]);
  const [lat, setLat] = React.useState("");
  const [long, setLong] = React.useState("");
  const [imperial, setImperial] = React.useState(true);

  React.useEffect(() => {
    let city = "Atlanta";
    geoLocation(city);
  }, []);

  async function getWeather(lat, long)
  {
    var url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&appid=${process.env.NEXT_PUBLIC_API_KEY}&units=imperial`;
    const response = await fetch(url);
    const data = await response.json();
    setDescription(data.current.weather[0].description);
    setHigh(Math.round(data.daily[0].temp.max));
    setLow(Math.round(data.daily[0].temp.min));
    setTemp(Math.round(data.current.temp));
    setWind(data.current.wind_speed);
    setIcon(data.current.weather[0].icon);
    setWeek(data.daily);
  }

  async function geoLocation(city)
  {
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.NEXT_PUBLIC_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setCity(data[0].name);
    setLat(data[0].lat);
    setLong(data[0].lon);
    await getWeather(data[0].lat, data[0].lon);
  }

  async function handleSearch (event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData);
    const city  = encodeURI(data.search);
    geoLocation(city);
  }
 
  return (
    <>
      <Head>
        <title>Sarah's Weather App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
         <div className="container">
          <div className="weather-app">
            <div className="search-form">
                <div className="Searchform">
                  <form onSubmit={handleSearch}>
                    <input id="search" name="search" type="search" placeholder="Type a city" />
                    <button type="Submit">Search</button>
                  </form>
                </div>
                  <div className="date">
                   <h3>{getFormattedDate()}</h3>
                  </div>
            </div>
              <h2>{city}</h2>
              { imperial && <h1>{temp}°F</h1>}
              { !imperial && <h1>{convertToCelsius(temp)}°C</h1>}
              
              <Image src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt="weather icon" width={30} height={30} />
          </div>
         </div> 
        <footer>This website is <a href="https://github.com/kimsarahsj/weather">open-sourced</a> and coded by Sarah Kim</footer>
      </main>
    </>
  );
}
