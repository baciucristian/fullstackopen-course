import React, {useState, useEffect} from 'react';
import axios from 'axios';

const Weather = ({country}) => {
  const [weather, setWeather] = useState({});

  const apiKey = process.env.REACT_APP_API_KEY;
  const query = country.capital;

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${apiKey}&query=${query}`,
      )
      .then(response => {
        setWeather(response.data.current);
      });
  }, [apiKey, query]);

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>
        <b>Temperature: </b>
        {weather.temperature} Celsius
      </p>
      <img src={weather.weather_icons} alt={weather.weather_descriptions} />
      <p>
        <b>Wind: </b>
        {weather.wind_speed} mph direction {weather.wind_dir}
      </p>
    </div>
  );
};

export default Weather;
