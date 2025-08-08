import React from 'react';
import Dashboard from './Dashboard.jsx';

export default function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-container">
        <div className="hero-overlay"></div>
        <canvas id="blizzard-canvas"></canvas>
        <canvas id="snow-canvas"></canvas>

        <div className="hero-content">
          <div className="sub-content">
            <p className="hero-subtitle">THE <br /> <span>PEAK OF EVEREST </span></p>
            <p className="hero-description"> <span>Uncover the mysteries </span><br /> of the world's highest mountain</p>
          </div>

          <div className="search-bar search-bar--center">
            <i className='bx bx-search search-icon' aria-hidden="true"></i>
            <input id="search-input" type="search" placeholder="Search the world’s wonders…" />
            <div className="search-suggestions">Try searching: <button data-q="Everest">Everest</button>, <button data-q="Himalaya">Himalaya</button>, <button data-q="Wildlife">Wildlife</button></div>
          </div>

          <Dashboard />
        </div>
      </div>
    </div>
  );
}