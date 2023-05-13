import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import React from "react";
import {getFormattedDate, convertToCelsius} from "../util/calc";

export default function Home() {
  const [city, setCity] = React.useState("");
  const [temp, setTemp] = React.useState({});
  const [description, setDescription] = React.useState("");
  const [high, setHigh] = React.useState({});
  const [low, setLow] = React.useState({});
  const [wind, setWind] = React.useState({});
  const [icon, setIcon] = React.useState("");
  const [week, setWeek] = React.useState([]);

  return (
    <>
      <Head>
        <title>Sarah's Weather App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {getFormattedDate()}
        </div>
        <p>
          {convertToCelsius(45)}
        </p>
      </main>
    </>
  );
}
