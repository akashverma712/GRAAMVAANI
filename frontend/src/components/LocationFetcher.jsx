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
    } catch (err) {
      setError("Failed to fetch weather data");
    }
  };

  if (error) return <p>{error}</p>;
  if (!coords.lat || !coords.lon) return <p>Fetching location...</p>;
  if (!weatherData) return <p>Fetching weather data...</p>;

  // Hourly (next 12 hours)
  const hourlyData = weatherData.forecast.forecastday[0].hour.slice(0, 12).map((hour) => ({
    time: hour.time.split(" ")[1],
    temp: hour.temp_c
  }));

  // Daily (7 days)
  const dailyData = weatherData.forecast.forecastday.map((day) => ({
    date: day.date,
    temp: day.day.avgtemp_c
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h2>
        Weather Dashboard - {weatherData.location.name}, {weatherData.location.country}
      </h2>
      <p>Current Temperature: {weatherData.current.temp_c}°C</p>
      <p>Condition: {weatherData.current.condition.text}</p>

      <h3>Hourly Forecast (Next 12 Hours)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={hourlyData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="time" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>

      <h3>Daily Forecast (Next 7 Days)</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={dailyData}>
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis domain={["auto", "auto"]} />
          <Tooltip />
          <Line type="monotone" dataKey="temp" stroke="#82ca9d" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
