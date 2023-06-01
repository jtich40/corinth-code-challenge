import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import CharacterSearch from './pages/CharacterSearch'
import AllCharacters from './pages/AllCharacters'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:search" element={<CharacterSearch />} />
        <Route path="/characters" element={<AllCharacters />} />
      </Routes>
    </Router>
  )
}
