import React from 'react';
import { FaTemperatureLow, FaWind } from 'react-icons/fa';
import { WiHumidity } from 'react-icons/wi';

const WeatherCard = ({ weatherData }) => {
  const { name, main, weather, wind } = weatherData;

  return (
    <div className="card mt-4">
      <div className="card-body text-center">
        <h3 className="card-title">{name}</h3>
        <h4 className="text-secondary">{weather[0].description}</h4>
        <div className="mt-4">
          <h2>{main.temp}°C</h2>
          <div className="d-flex justify-content-around mt-3">
            <div>
              <FaTemperatureLow size={24} />
              <p>{main.temp_min}°C</p>
            </div>
            <div>
              <WiHumidity size={24} />
              <p>{main.humidity}%</p>
            </div>
            <div>
              <FaWind size={24} />
              <p>{wind.speed} m/s</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
