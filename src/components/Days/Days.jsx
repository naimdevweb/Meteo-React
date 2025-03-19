import React, { useState } from 'react'
import './Days.css'

function Days({ onDateSelect, forecastData }) {
  const [activeDay, setActiveDay] = useState(0);
  
  const handleDateClick = (day) => {
    setActiveDay(day);
    onDateSelect(day);
  }
  
  // Fonction pour formater la date en jour de la semaine en français
  const formatDate = (dateString) => {
    const options = { weekday: 'long' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };
  
  // Cas où les données de prévision ne sont pas encore disponibles
  if (!forecastData || !forecastData.forecast) {
    return (
      <div className="date-buttons">
        <button className="date-button active">Chargement...</button>
      </div>
    );
  }
  
  return (
    <>
      <div className="date-buttons">
        {forecastData.forecast.forecastday.map((day, index) => (
          <button
            key={day.date}
            className={`date-button ${activeDay === index ? 'active' : ''}`}
            onClick={() => handleDateClick(index)}
          >
            {index === 0 ? "Aujourd'hui" : formatDate(day.date).charAt(0).toUpperCase() + formatDate(day.date).slice(1)}
          </button>
        ))}
      </div>
    </>
  )
}

export default Days