import { StrictMode, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

function Boot() {
  useEffect(() => {
    if (window.__legacyScriptsLoaded) return;
    window.__legacyScriptsLoaded = true;

    const scripts = [
      '/three.min.js',
      '/entryScene.js',
      '/snowEffect.js',
      '/hero.js',
      '/hero-accessibility.js',
      '/searchBar.js',
      '/scrollbar.js',
    ];

    const loadScriptSequential = (urls, index = 0) => {
      if (index >= urls.length) return Promise.resolve();
      return new Promise((resolve, reject) => {
        const s = document.createElement('script');
        s.src = urls[index];
        s.async = false;
        s.defer = true;
        s.onload = () => resolve();
        s.onerror = reject;
        document.body.appendChild(s);
      }).then(() => loadScriptSequential(urls, index + 1));
    };

    loadScriptSequential(scripts).catch(() => {
      // swallow errors to avoid breaking the app render
    });
  }, []);
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Boot />
  </StrictMode>,
)
