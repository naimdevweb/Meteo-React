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
        // Utilisez une clé API de secours si la variable d'environnement n'est pas définie
        const apiKey = import.meta.env.VITE_WEATHER_API_KEY || '9b311b62a2a849848b481803251903';
        
        const response = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=5&aqi=no&alerts=no`
        );
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error?.message || 'Données météo non disponibles');
        }
        
        const data = await response.json();
        setWeatherData(data);
        setLoading(false);
        setError(null); // Réinitialiser l'erreur si la requête réussit
      } catch (err) {
        console.error("Erreur API météo:", err);
        setError('Erreur lors du chargement des données: ' + err.message);
        setLoading(false);
      }
    };
    
    fetchWeatherData();
  }, [city]); // Utiliser city en dépendance pour recharger quand la ville change

  // Modifier le comportement lors du chargement
  if (loading) return (
    <div className="weather card blue-grey darken-1">
      <div className="card-content white-text loading-container">
        <div className="loading-spinner"></div>
        <p>Chargement des données météo...</p>
      </div>
    </div>
  );

  // Amélioration de l'affichage d'erreur
  if (error) return (
    <div className="weather card blue-grey darken-1">
      <div className="card-content white-text error-container">
        <div className="error-icon">⚠️</div>
        <p>{error}</p>
        <p className="error-tip">Vérifiez le nom de la ville ou votre connexion internet</p>
        <div className="error-search">
          <Search onCityChange={handleCityChange} />
        </div>
      </div>
    </div>
  );

  // Reste du code inchangé...
  const displayData = selectedDay === 0 
    ? {
        city: weatherData.location.name,
        temperature: weatherData.current.temp_c,
        wind: {
          speed: weatherData.current.wind_kph,
          direction: weatherData.current.wind_degree
        },
        icon: weatherData.current.condition.icon,
        sun:{
          sunrise: weatherData.forecast.forecastday[selectedDay].astro.sunrise,
          sunset: weatherData.forecast.forecastday[selectedDay].astro.sunset
        }
      }
    : {
        city: weatherData.location.name,
        temperature: weatherData.forecast.forecastday[selectedDay-1].day.avgtemp_c,
        wind: {
          speed: weatherData.forecast.forecastday[selectedDay-1].day.maxwind_kph,
          direction: 0
        },
        icon: weatherData.forecast.forecastday[selectedDay-1].day.condition.icon,
        sun:{
          sunrise: weatherData.forecast.forecastday[selectedDay-1].astro.sunrise,
          sunset: weatherData.forecast.forecastday[selectedDay-1].astro.sunset
        }
      };

  return (
    <div className="weather card blue-grey darken-1">
      <div className="card-content white-text search-area">
        <Search onCityChange={handleCityChange} />
      </div>
      {weatherData && (
        <>
          <div className="weather-layout">
            <div className="weather-info">
              <Weather 
                city={displayData.city}
                temperature={displayData.temperature}
                wind={displayData.wind}
                icon={displayData.icon}
                sun={displayData.sun}
              />
            </div>
            
            <div className="hourly-chart-container">
              <Graphique
                hourlyData={weatherData.forecast.forecastday[selectedDay].hour} 
              />
            </div>
          </div>
          
          <Days onDateSelect={onDateSelect} forecastData={weatherData} />
        </>
      )}
    </div>
  );
}

export default WeatherCard