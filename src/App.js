import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import LandingPage from './components/LandingPage';
import CollectionPage from './components/CollectionPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/collection/:collectionSlug" element={<CollectionPage />} />
      </Routes>
    </div>
  );
}

export default App; 