"use client";

import Head from "next/head";
import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setError(null);
      const API_KEY = process.env.NEXT_PUBLIC_WEATHERAPI_KEY;
      const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`);
      setWeather(response.data);
    } catch (error) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
  };

  return (
    <div className='container mx-auto p-4'>
      <Head>
        <title>Weather App</title>
        <meta name='description' content='A simple weather web application' />
      </Head>

      <h1 className='text-2xl font-bold mb-4'>Weather App</h1>

      <div className='mb-4'>
        <input
          type='text'
          placeholder='Enter city name'
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className='border p-2 mr-2 rounded'
        />

        <button onClick={fetchWeather} className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600'>
          Get Weather
        </button>
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      {weather && (
        <div className='bg-gray-100 p-4 rounded shadow-md'>
          <h2 className='bg-gray-100 p-4 rounded shadow-md'>{weather.location.name}</h2>
          <p>Temperature: {weather.current.temp_f}°F</p>
          <p>Condition: {weather.current.condition.text}</p>
          <p>Humidity: {weather.current.humidity}%</p>
          <p>Wind Speed: {weather.current.wind_mph} mph</p>
        </div>
      )}
    </div>
  );
}
