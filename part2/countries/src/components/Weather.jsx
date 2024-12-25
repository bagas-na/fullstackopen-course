/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";

export const Weather = ({ cityName, countryCode }) => {
  const [weather, setWeather] = useState(null);
  const api_key = import.meta.env.VITE_WEATHER_API_KEY;
  const geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName},${countryCode}&limit=1&appid=${api_key}`;

  useEffect(() => {
    fetch(geocodeUrl)
      .then((geoCodeResponse) => {
        return geoCodeResponse.json();
      })
      .then((json) => {
        const {lat, lon} = json[0];
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;
        return fetch(weatherUrl);
      })
      .then((weatherResult) => {
        return weatherResult.json();
      })
      .then((json) => {
        setWeather(json);
      })
      .catch((e) => console.error("Failed to fetch weather data", e))
  }, [api_key, geocodeUrl]);

  return (
    <div>
      <h3>Weather in {cityName}</h3>
      {weather === null ? (
        ""
      ) : (
        <div>
          <p style={{ margin: "0" }}>temperature: {weather.main.temp} Celcius</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
          <p style={{ margin: "0" }}>wind speed: {weather.wind.speed} m/s</p>
          <p style={{ margin: "0" }}>wind direction: {weather.wind.deg} degrees</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
