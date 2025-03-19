import React, { useState } from 'react'
import Header from './components/Header/Header'
import WeatherCard from './components/WeatherCard/WeatherCard'
import "./App.css"

function App() {
  const [selectedDay, setSelectedDay] = useState(0); // 0 = Aujourd'hui

  return (
    <main>
      <div className='App'>
        <Header />
        <div className='row'>
          <div className='col s12 m6 push-m3'>
            <WeatherCard 
              selectedDay={selectedDay} 
              onDateSelect={setSelectedDay}
            />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App