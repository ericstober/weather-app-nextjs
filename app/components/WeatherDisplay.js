import { FaMapMarkerAlt, FaTemperatureHigh, FaCloudSun, FaTint, FaWind, FaSmog } from "react-icons/fa";

export default function WeatherDisplay({ weather, state }) {
  if (!weather) return null;

  return (
    <div className='bg-blue-50 p-6 rounded shadow w-full flex flex-col items-center'>
      <h2 className='text-2xl font-bold text-blue-700 mb-2 flex items-center'>
        <FaMapMarkerAlt className='mr-2' size={28} />
        {weather.location.name}
        {state && `, ${state}`}
      </h2>
      <div className='flex flex-col items-center gap-2'>
        <div className='flex items-center gap-2'>
          <FaTemperatureHigh size={24} />
          <span className='text-lg'>
            Temperature: <b>{weather.current.temp_f}°F</b>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <FaCloudSun size={24} />
          <span className='text-lg'>
            Condition: <b>{weather.current.condition.text}</b>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <FaTint size={24} />
          <span className='text-lg'>
            Humidity: <b>{weather.current.humidity}%</b>
          </span>
        </div>
        <div className='flex items-center gap-2'>
          <FaWind size={24} />
          <span className='text-lg'>
            Wind Speed: <b>{weather.current.wind_mph} mph</b>
          </span>
        </div>
      </div>
    </div>
  );
}
