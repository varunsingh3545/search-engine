import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Boot() {
  useEffect(() => {
    const scripts = [
      '/three.min.js',
      '/entryScene.js',
      '/snowEffect.js',
      '/hero.js',
      '/hero-accessibility.js',
      '/searchBar.js',
      '/scrollbar.js',
    ];
    scripts.forEach(src => {
      const s = document.createElement('script');
      s.src = src;
      s.defer = true;
      document.body.appendChild(s);
    });
  }, []);
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Boot />
  </StrictMode>,
)
