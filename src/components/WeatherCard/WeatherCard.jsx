import React, { useState, useEffect } from 'react'
import './WeatherCard.css'
import Weather from '../Weather/Weather'
import Days from '../Days/Days'
import Search from '../Search/Search'
import Graphique from '../Graphique/Graphique'

// Ajout des props city et onCityChange
function WeatherCard({ selectedDay = 0, onDateSelect, city = 'Lyon', onCityChange }) {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Gestionnaire de changement de ville
  const handleCityChange = (newCity) => {
    // Notifier le composant parent (App) du changement
    if (onCityChange) {
      onCityChange(newCity);
    }
  };
  
  useEffect(() => {
    const fetchWeatherData = async () => {
      setLoading(true);
      try {
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
  }, [city]); // Utiliser city en dépendance pour recharger quand la ville change

  if (loading) return <div className="weather card blue-grey darken-1"><div className="card-content white-text">Chargement...</div></div>;
  if (error) return <div className="weather card blue-grey darken-1"><div className="card-content white-text">Erreur: {error}</div></div>;

  // Données actuelles ou prévisions pour un jour spécifique
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
          direction: 0
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
        <section className='weather-card'>
          {/* <h3 className="weather-title">Météo à {displayData.city}</h3> */}
          <div className="weather-layout">
            <div className="weather-info">
              <Weather 
                city={displayData.city}
                temperature={displayData.temperature}
                wind={displayData.wind}
                icon={displayData.icon}
              />
            </div>
            
          </div>
            <div className="hourly-chart-container">
              <Graphique
                hourlyData={weatherData.forecast.forecastday[selectedDay].hour} 
              />
            </div>
            </section>
          
          <Days onDateSelect={onDateSelect} forecastData={weatherData} />
        </>
      )}
    </div>
  );
}

export default WeatherCard