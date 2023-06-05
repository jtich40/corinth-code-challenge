import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import './App.css'

import Home from './pages/Home'
import CharacterSearch from './pages/CharacterSearch'
import AllCharacters from './pages/AllCharacters'
import ThemeToggler from './components/ThemeToggler'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeToggler />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/character/:search" element={<CharacterSearch />} />
          <Route path="/characters" element={<AllCharacters />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}