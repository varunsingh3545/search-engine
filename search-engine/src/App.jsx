import React from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import LegacyScriptsLoader from './components/LegacyScriptsLoader.jsx';

export default function App() {
  return (
    <div className="container">
      <div id="three-container"></div>
      <Navbar />
      <Hero />
      <LegacyScriptsLoader />
    </div>
  );
}