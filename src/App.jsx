import React, { useState, useEffect } from 'react'
import Header from './components/Header/Header'
import WeatherCard from './components/WeatherCard/WeatherCard'
import "./App.css"

function App() {
  const [selectedDay, setSelectedDay] = useState(0);
  
  // Récupérer les villes depuis localStorage ou utiliser les défauts
  const [cities, setCities] = useState(() => {
    const saved = localStorage.getItem('savedCities');
    return saved ? JSON.parse(saved) : ['Lyon', 'Paris', 'Marseille'];
  });
  
  // Récupérer la ville actuelle depuis localStorage ou utiliser la première ville de la liste
  const [currentCity, setCurrentCity] = useState(() => {
    const savedCurrentCity = localStorage.getItem('currentCity');
    if (savedCurrentCity) {
      return savedCurrentCity;
    }
    const saved = localStorage.getItem('savedCities');
    const citiesList = saved ? JSON.parse(saved) : ['Lyon', 'Paris', 'Marseille'];
    return citiesList[0] || 'Lyon';
  });
  
  // Sauvegarder les villes dans localStorage quand elles changent
  useEffect(() => {
    localStorage.setItem('savedCities', JSON.stringify(cities));
  }, [cities]);
  
  // Sauvegarder la ville actuelle dans localStorage quand elle change
  useEffect(() => {
    localStorage.setItem('currentCity', currentCity);
  }, [currentCity]);

  const addCity = (newCity) => {
    // Vérifier si la ville existe déjà
    if (!cities.includes(newCity)) {
      // Ajouter la nouvelle ville au début de la liste
      setCities(prevCities => [newCity, ...prevCities]);
    } else {
      // Si la ville existe déjà, la déplacer en haut de la liste
      setCities(prevCities => [
        newCity,
        ...prevCities.filter(city => city !== newCity)
      ]);
    }
    // Définir la ville actuelle
    setCurrentCity(newCity);
  };
  
  const selectCity = (city) => {
    setCurrentCity(city);
  };

  // Fonction pour supprimer une ville
  const removeCity = (cityToRemove, event) => {
    // Empêcher la propagation de l'événement vers le parent (li)
    event.stopPropagation();
    
    
    
    // Filtrer la ville à supprimer
    const newCities = cities.filter(city => city !== cityToRemove);
    setCities(newCities);
    
    // Si la ville supprimée est la ville actuelle, sélectionner la première ville
    if (cityToRemove === currentCity) {
      setCurrentCity(newCities[0]);
    }
  };

  return (
    <main>
      <div className='App'>
        <Header />
        <div className='row'>
          {/* Colonne gauche pour la carte météo */}
          <div className='col s12 m8'>
            <WeatherCard 
              selectedDay={selectedDay} 
              onDateSelect={setSelectedDay}
              city={currentCity}
              onCityChange={addCity}
            />
          </div>
          
          {/* Colonne droite pour la liste des villes */}
          <div className='col s12 m4'>
            <div className="cities-sidebar">
              <h4 className='Titre'>Villes recherchées</h4>
              <ul className="city-list">
              {cities.map(city => (
  <li 
    key={city} 
    className={city === currentCity ? 'active' : ''}
    onClick={() => selectCity(city)}
  >
    <span className="city-name">{city}</span>
    <button 
      className={`remove-city-btn ${cities.length <= 1 ? 'disabled' : ''}`}
      onClick={(e) => removeCity(city, e)}
      aria-label={`Supprimer ${city}`}
      disabled={cities.length <= 1}
    >
      ×
    </button>
  </li>
))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App