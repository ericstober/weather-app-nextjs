import { FaSearch, FaMapMarkerAlt, FaSpinner } from "react-icons/fa";

export default function WeatherForm({
  city,
  state,
  loading,
  onCityChange,
  onStateChange,
  onSubmit,
}) {
  return (
    <>
      <div className="flex w-full mb-4 gap-2">
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={onCityChange}
            className="border p-3 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute left-3 top-3 text-gray-400">
            <FaSearch size={20} />
          </span>
        </div>
        <div className="relative flex-grow">
          <input
            type="text"
            placeholder="State (optional)"
            value={state}
            onChange={onStateChange}
            className="border p-3 pl-10 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <span className="absolute left-3 top-3 text-gray-400">
            <FaMapMarkerAlt size={20} />
          </span>
        </div>
      </div>
      <button
        onClick={onSubmit}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center justify-center w-full mb-4"
        disabled={loading || !city}
      >
        {loading ? (
          <FaSpinner className="animate-spin h-5 w-5 mr-2" />
        ) : (
          <span className="w-full text-center">Get Weather</span>
        )}
      </button>
    </>
  );
}
