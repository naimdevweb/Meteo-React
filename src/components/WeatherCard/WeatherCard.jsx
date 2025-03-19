import React, { useState, useEffect } from 'react'
import './WeatherCard.css'
import Weather from '../Weather/Weather'
import Days from '../Days/Days'
import Search from '../Search/Search'

// Ajout de onDateSelect dans les props
function WeatherCard({ selectedDay = 0, onDateSelect }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [city, setCity] = useState('Lyon');

  const handleCityChange = (newCity) => {
    setCity(newCity);
    setLoading(true); // Réactiver l'état de chargement
  };
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        // Notez le changement d'URL : forecast.json au lieu de current.json et &days=5
        const response = await fetch(
           `https://api.weatherapi.com/v1/forecast.json?key=${import.meta.env.VITE_WEATHER_API_KEY}&q=${city}&days=5&aqi=no&alerts=no`
        );
        
        if (!response.ok) {
          throw new Error('Données météo non disponibles');
        }
        
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors du chargement des données: ' + err.message);
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [city]);

  if (loading) return <div className="weather card blue-grey darken-1"><div className="card-content white-text">Chargement...</div></div>;
  if (error) return <div className="weather card blue-grey darken-1"><div className="card-content white-text">Erreur: {error}</div></div>;

  // Données actuelles (aujourd'hui) ou prévisions pour un jour spécifique
  const displayData = selectedDay === 0 
    ? {
        city: weatherData.location.name,
        temperature: weatherData.current.temp_c,
        wind: {
          speed: weatherData.current.wind_kph,
          direction: weatherData.current.wind_degree
        },
        icon: weatherData.current.condition.icon
      }
    : {
        city: weatherData.location.name,
        temperature: weatherData.forecast.forecastday[selectedDay-1].day.avgtemp_c,
        wind: {
          speed: weatherData.forecast.forecastday[selectedDay-1].day.maxwind_kph,
          direction: 0 // Les données de direction peuvent ne pas être disponibles dans les prévisions
        },
        icon: weatherData.forecast.forecastday[selectedDay-1].day.condition.icon
      };

     

  return (
    <div className="weather card blue-grey darken-1">
       <div className="card-content white-text search-area">
        <Search onCityChange={handleCityChange} />
      </div>
      {weatherData && (
        <>
      
     

          <Weather 
            city={displayData.city}
            temperature={displayData.temperature}
            wind={displayData.wind}
            icon={displayData.icon}
          />

          
          {/* Transmission de onDateSelect au composant Days */}
          <Days onDateSelect={onDateSelect} forecastData={weatherData} />
        </>
      )}
    </div>
  );
}

export default WeatherCard