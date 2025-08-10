import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { WiDaySunny, WiCloudy, WiRain, WiSnow } from "react-icons/wi";

export default function LocationFetcher() {
  const [coords, setCoords] = useState({ lat: null, lon: null });
  const [error, setError] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setCoords({ lat, lon });
          fetchWeather(lat, lon);
        },
        (err) => {
          setError(err.message);
        }
      );
    } else {
      setError("Geolocation not supported by your browser");
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=7&aqi=no&alerts=no`
      );
      setWeatherData(res.data);
    } catch {
      setError("Failed to fetch weather data");
    }
  };

  const getWeatherIcon = (condition) => {
    if (condition.includes("sunny")) return <WiDaySunny size={48} className="text-yellow-400" />;
    if (condition.includes("cloud")) return <WiCloudy size={48} className="text-gray-400" />;
    if (condition.includes("rain")) return <WiRain size={48} className="text-blue-400" />;
    if (condition.includes("snow")) return <WiSnow size={48} className="text-blue-200" />;
    return <WiDaySunny size={48} className="text-yellow-400" />;
  };

  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!coords.lat || !coords.lon) return <p className="text-center">📍 Detecting location...</p>;
  if (!weatherData) return <p className="text-center">☁ Fetching weather data...</p>;

  const hourlyData = weatherData.forecast.forecastday[0].hour
    .slice(0, 12)
    .map((hour) => ({
      time: hour.time.split(" ")[1],
      temp: hour.temp_c
    }));

  const dailyData = weatherData.forecast.forecastday.map((day) => ({
    date: day.date,
    temp: day.day.avgtemp_c
  }));

  return (
    <div className="max-w-5xl mx-auto p-4">
     
      <div className="bg-white rounded-2xl shadow-lg p-6 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {weatherData.location.name}, {weatherData.location.country}
          </h2>
          <p className="text-lg text-gray-600">
            {weatherData.current.temp_c}°C • {weatherData.current.condition.text}
          </p>
        </div>
        <div>{getWeatherIcon(weatherData.current.condition.text.toLowerCase())}</div>
      </div>

      {/* Hourly Forecast */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Hourly Forecast (Next 12 Hours)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={hourlyData}>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#3b82f6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 mt-6">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Daily Forecast (Next 7 Days)</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={dailyData}>
            <CartesianGrid stroke="#e5e7eb" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="temp" stroke="#10b981" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
