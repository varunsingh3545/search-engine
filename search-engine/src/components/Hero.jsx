import React from 'react';
import Dashboard from './Dashboard.jsx';

export default function Hero() {
  return (
    <div className="hero-section">
      <div className="hero-container">
        <canvas id="blizzard-canvas"></canvas>
        <canvas id="snow-canvas"></canvas>

        <div className="hero-content">
          <div className="sub-content">
            <p className="hero-subtitle">THE <br /> <span>PEAK OF EVEREST </span></p>
            <p className="hero-description"> <span>Uncover the mysteries </span><br /> of the world's highest mountain</p>
          </div>

          <Dashboard />
        </div>
      </div>
    </div>
  );
}