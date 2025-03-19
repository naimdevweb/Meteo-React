import React, { useState } from 'react';
import './Search.css';

function CitySearch({ onCityChange }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onCityChange(inputValue.trim());
      // Optionnel: réinitialiser l'input ou le garder avec la valeur actuelle
      setInputValue('');
    }
  };

  return (
    <div className="city-search-container">
      <form onSubmit={handleSubmit}>
        <div className="input-field">
          <input 
            id="city-search" 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Entrez le nom d'une ville"
            className="white-text"
          />
          <button 
            type="submit" 
            className="btn waves-effect waves-light blue"
          >
            Rechercher
          </button>
        </div>
      </form>
    </div>
  );
}

export default CitySearch;