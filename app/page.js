"use client";

import { useState } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";
import ErrorAlert from "./components/ErrorAlert";
import ForecastDisplay from "./components/ForcastDisplay";

export default function Home() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [forecast, setForecast] = useState(null);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      setError(null);
      const location = state ? `${city}, ${state}` : city;
      const response = await axios.get("/api/current-weather", {
        params: { city: location },
      });
      setWeather(response.data);
    } catch (err) {
      setError("Location not found. Please try again.");
      setWeather(null);
    }
    setLoading(false);
  };

  const fetchForecast = async () => {
    setLoading(true);
    try {
      setError(null);
      const location = state ? `${city}, ${state}` : city;
      const response = await axios.get("/api/forecast", {
        params: { city: location, days: 3 },
      });
      setForecast(response.data);
    } catch (err) {
      setError("Forecast not found. Please try again.");
      setForecast(null);
    }
    setLoading(false);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300'>
      <h1 className='text-3xl font-bold mb-8 text-blue-800'>Weather App</h1>
      <div className='bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-2xl'>
        <WeatherForm
          city={city}
          state={state}
          loading={loading}
          onCityChange={(e) => setCity(e.target.value)}
          onStateChange={(e) => setState(e.target.value)}
          onSubmit={fetchWeather}
          onForecast={fetchForecast}
        />
        <ErrorAlert error={error} />
        <WeatherDisplay weather={weather} state={state} />
        <ForecastDisplay forecast={forecast} />
      </div>
    </div>
  );
}
