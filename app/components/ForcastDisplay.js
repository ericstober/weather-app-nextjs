export default function ForecastDisplay({ forecast }) {
  if (!forecast || !forecast.forecast) return null;

  return (
    <div className='bg-blue-100 p-4 rounded shadow w-full mt-4'>
      <h3 className='text-xl font-bold text-blue-700 mb-2'>Forecast</h3>
      <div className='flex flex-col gap-2'>
        {forecast.forecast.forecastday.map((day) => (
          <div key={day.date} className='flex items-center justify-between'>
            <span>{day.date}</span>
            <span>{day.day.condition.text}</span>
            <span>High: {day.day.maxtemp_f}°F</span>
            <span>Low: {day.day.mintemp_f}°F</span>
          </div>
        ))}
      </div>
    </div>
  );
}
