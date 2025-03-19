import React, { useState } from 'react'
import './Days.css'

function Days({ onDateSelect }) {
  const [activeDay, setActiveDay] = useState(0);
  
  const handleDateClick = (day) => {
    setActiveDay(day);
    onDateSelect(day);
  }
  
  return (
    <>
      <div className="date-buttons">
        <button 
          className={`date-button ${activeDay === 0 ? 'active' : ''}`} 
          onClick={() => handleDateClick(0)}
        >
          Aujourd'hui
        </button>
        <button 
          className={`date-button ${activeDay === 1 ? 'active' : ''}`} 
          onClick={() => handleDateClick(1)}
        >
          Mardi
        </button>
        <button 
          className={`date-button ${activeDay === 2 ? 'active' : ''}`} 
          onClick={() => handleDateClick(2)}
        >
          Mercredi
        </button>
        <button 
          className={`date-button ${activeDay === 3 ? 'active' : ''}`} 
          onClick={() => handleDateClick(3)}
        >
          Jeudi
        </button>
        <button 
          className={`date-button ${activeDay === 4 ? 'active' : ''}`} 
          onClick={() => handleDateClick(4)}
        >
          Vendredi
        </button>
      </div>
    </>
  )
}

export default Days