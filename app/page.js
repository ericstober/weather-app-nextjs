"use client";

import { useState } from "react";
import axios from "axios";
import { FaSearch, FaTemperatureHigh, FaCloudSun, FaTint, FaWind, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    setLoading(true);
    try {
      setError(null);
      const response = await axios.get("/api/weather", {
        params: { city },
      });
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please try again.");
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-blue-300">
      <h1 className="text-3xl font-bold mb-8 text-blue-800">Weather App</h1>
      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center w-full max-w-md">
        <div className="flex w-full mb-4">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Enter city name"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="border p-3 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <span className="absolute left-3 top-3 text-gray-400">
              <FaSearch size={20} />
            </span>
          </div>
          <button
            onClick={fetchWeather}
            className="bg-blue-500 text-white px-4 py-2 rounded ml-2 hover:bg-blue-600 flex items-center"
            disabled={loading || !city}
          >
            {loading ? (
              <FaSpinner className="animate-spin h-5 w-5 mr-2" />
            ) : (
              <span>Get Weather</span>
            )}
          </button>
        </div>
        {error && (
          <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4 w-full text-center border border-red-300">
            {error}
          </div>
        )}
        {weather && (
          <div className="bg-blue-50 p-6 rounded shadow w-full flex flex-col items-center">
            <h2 className="text-2xl font-bold text-blue-700 mb-2 flex items-center">
              <FaMapMarkerAlt className="mr-2" size={28} />
              {weather.location.name}
            </h2>
            <div className="flex flex-col items-center gap-2">
              <div className="flex items-center gap-2">
                <FaTemperatureHigh size={24} />
                <span className="text-lg">Temperature: <b>{weather.current.temp_f}°F</b></span>
              </div>
              <div className="flex items-center gap-2">
                <FaCloudSun size={24} />
                <span className="text-lg">Condition: <b>{weather.current.condition.text}</b></span>
              </div>
              <div className="flex items-center gap-2">
                <FaTint size={24} />
                <span className="text-lg">Humidity: <b>{weather.current.humidity}%</b></span>
              </div>
              <div className="flex items-center gap-2">
                <FaWind size={24} />
                <span className="text-lg">Wind Speed: <b>{weather.current.wind_mph} mph</b></span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
