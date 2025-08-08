import React, { useEffect } from 'react';

export default function LegacyScriptsLoader() {
  useEffect(() => {
    // Helper to append a script and return a promise that resolves on load
    const appendScript = (src, type = 'text/javascript') => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.type = type;
        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load ${src}`));
        document.body.appendChild(script);
      });
    };

    // Load in order: entryScene (module), then snowEffect, then ui
    // Ensures DOM is present before legacy scripts run
    appendScript('/assets/js/entryScene.js', 'module')
      .then(() => appendScript('/assets/js/snowEffect.js'))
      .then(() => appendScript('/assets/js/ui.js'))
      .catch((err) => console.error(err));
  }, []);

  return null;
}