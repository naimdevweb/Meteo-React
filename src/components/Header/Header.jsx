import React from 'react'
import logo from '/logo_transparent.png'
import './Header.css'

function Header() {
  return (
    <header className="App-header">
        <img src={logo} className="App-logo" alt="logo"/>
    </header>
  )
}

export default Header