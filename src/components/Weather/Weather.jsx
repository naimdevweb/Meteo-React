import React from 'react';
import './Weather.css'; 

function Weather({ city = "Lyon", temperature = 15, wind = { speed: 1, direction: 360 }, icon }) {
    return (
        <div className="card-content white-text">
            <span className="card-title">{city}</span>
            <p><img src={icon || "src/assets/icons/sun.svg"} alt="Conditions météo"/></p>
            <span className="temperature">{temperature}°</span>
            <div className="wind">Vent {wind.speed}km/h ({wind.direction}°)</div>
        </div>
    );
}

export default Weather