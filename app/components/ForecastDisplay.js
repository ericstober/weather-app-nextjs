import { FaCloudSun, FaCloudRain, FaSnowflake, FaSun, FaMapMarkerAlt } from "react-icons/fa";

function getIcon(condition) {
  const text = condition.toLowerCase();
  if (text.includes("rain")) return <FaCloudRain size={24} className="text-blue-500" />;
  if (text.includes("snow")) return <FaSnowflake size={24} className="text-blue-400" />;
  if (text.includes("sun") || text.includes("clear")) return <FaSun size={24} className="text-yellow-400" />;
  return <FaCloudSun size={24} className="text-gray-500" />;
}

export default function ForecastDisplay({ forecast }) {
  if (!forecast || !forecast.forecast) return null;

  const locationName = forecast.location?.name;
  const region = forecast.location?.region;

  return (
    <div className="bg-blue-100 p-6 rounded shadow w-full mt-4">
      <div className="flex items-center justify-center mb-2">
        <FaMapMarkerAlt className="mr-2 text-blue-700" size={22} />
        <span className="text-lg font-bold text-blue-700">
          {locationName}
          {region ? `, ${region}` : ""}
        </span>
      </div>
      <h3 className="text-xl font-bold text-blue-700 mb-4 text-center">3-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {forecast.forecast.forecastday.map((day) => (
          <div
            key={day.date}
            className="bg-white rounded-lg shadow flex flex-col items-center p-4"
          >
            <span className="text-lg font-semibold text-blue-600 mb-2">
              {new Date(day.date).toLocaleDateString(undefined, {
                weekday: "short",
                month: "short",
                day: "numeric",
              })}
            </span>
            <div className="mb-2">{getIcon(day.day.condition.text)}</div>
            <span className="text-md text-gray-700 mb-2">{day.day.condition.text}</span>
            <div className="flex flex-col items-center">
              <span className="text-2xl font-bold text-blue-700">
                {Math.round(day.day.maxtemp_f)}°F
              </span>
              <span className="text-sm text-gray-500">
                Low: {Math.round(day.day.mintemp_f)}°F
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-500">
              {day.day.daily_chance_of_rain > 0 && (
                <span>Rain: {day.day.daily_chance_of_rain}%</span>
              )}
              {day.day.daily_chance_of_snow > 0 && (
                <span> | Snow: {day.day.daily_chance_of_snow}%</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
