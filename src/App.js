import React from 'react'
import { Routes, Route } from "react-router-dom";
import CountryInfo from './components/CountryInfo';
import Home from './components/Home';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:countryName" element={<CountryInfo />} />
    </Routes>
  )
}

export default App
