"use client";

import { useState } from "react";
import axios from "axios";
import WeatherForm from "./components/WeatherForm";
import WeatherDisplay from "./components/WeatherDisplay";

export default function Home() {
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      setError(null);
      const location = state ? `${city}, ${state}` : city;
      const response = await axios.get("/api/weather", {
        params: { city: location },
      });
      setWeather(response.data);
    } catch (err) {
      setError("Location not found. Please try again.");
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Weather App</h1>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-2xl">
        <WeatherForm
          city={city}
          state={state}
          loading={loading}
          onCityChange={(e) => setCity(e.target.value)}
          onStateChange={(e) => setState(e.target.value)}
          onSubmit={fetchWeather}
        />
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 w-full text-center border border-red-300">
            {error}
          </div>
        )}
        <WeatherDisplay weather={weather} state={state} />
      </div>
    </div>
  );
}
