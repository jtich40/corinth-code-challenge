import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import Home from './pages/Home'
import CharacterSearch from './pages/CharacterSearch'
import AllCharacters from './pages/AllCharacters'

export default function App() {
  // TODO: set up routing logic
  return (
   <div>
      <Home />
      <CharacterSearch />
      <AllCharacters />
   </div>
  )
}
