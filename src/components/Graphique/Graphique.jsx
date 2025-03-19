import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './Graphique.css';

function HourlyChart({ hourlyData }) {
  if (!hourlyData || hourlyData.length === 0) {
    return <div className="loading-chart">Chargement des données horaires...</div>;
  }

  // Formater les données pour le graphique
  const chartData = hourlyData.map(hour => ({
    time: new Date(hour.time).getHours() + 'h',
    temperature: hour.temp_c,
    feelsLike: hour.feelslike_c,
    humidity: hour.humidity,
  }));

  return (
    <div className="hourly-chart-container">
      <h5 className="chart-title">Prévisions horaires</h5>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis 
            dataKey="time" 
            stroke="#fff"
            tick={{ fill: '#fff' }}
          />
          <YAxis 
            stroke="#fff"
            tick={{ fill: '#fff' }}
            label={{ value: '°C', angle: -90, position: 'insideLeft', fill: '#fff' }}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#0b0829', border: '1px solid #61dafb', color: '#fff' }}
            labelStyle={{ color: '#61dafb' }}
          />
          <Line 
            type="monotone" 
            dataKey="temperature" 
            stroke="#61dafb" 
            strokeWidth={2}
            dot={{ r: 4, fill: '#61dafb', stroke: '#fff', strokeWidth: 1 }}
            name="Température"
          />
          <Line 
            type="monotone" 
            dataKey="feelsLike" 
            stroke="#ffca28" 
            strokeDasharray="5 5"
            strokeWidth={2}
            dot={{ r: 4, fill: '#ffca28', stroke: '#fff', strokeWidth: 1 }}
            name="Ressenti"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default HourlyChart;