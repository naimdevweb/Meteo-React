import React from 'react'
import './Weather.css'

// Ajoutez sun aux props
function Weather({ city, temperature, wind, icon, sun }) {
  // Fonction pour convertir l'heure au format 24h
  const convertTo24HourFormat = (time) => {
    const [hour, minute] = time.split(':');
    let hour24 = parseInt(hour, 10);
    if (time.includes('PM') && hour24 !== 12) {
      hour24 += 12;
    } else if (time.includes('AM') && hour24 === 12) {
      hour24 = 0;
    }
    return `${hour24.toString().padStart(2, '0')}:${minute.slice(0, 2)}`;
  };

  return (
    <div className="weather-card">
      <div className="card-content white-text">
        <span className="card-title">{city}</span>
        <img src={icon} alt="Icône météo" />
        <span className="temperature">{Math.round(temperature)}°</span>
        <span className="wind">
          Vent : {wind.speed} km/h
        </span>
        
        {/* Affichage du lever et coucher du soleil */}
        <div className="sun-info">
          <div className="sunrise">
            <span className="sun-icon">🌞</span> 
            <span className="sun-label">Lever</span>
            <span className="sun-time">{convertTo24HourFormat(sun.sunrise)}</span>
          </div>
          <div className="sunset">
            <span className="sun-icon">🌇</span> 
            <span className="sun-label">Coucher</span>
            <span className="sun-time">{convertTo24HourFormat(sun.sunset)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Weather