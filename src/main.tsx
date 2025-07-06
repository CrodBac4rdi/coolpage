import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import './styles/mobile-enhancements.css'
import { patchDOMTokenList } from './utils/domTokenListPatch'
import App from './App.tsx'

// Patch vor allem anderen anwenden
patchDOMTokenList();

// Globaler Error Handler für unerwartete Fehler
window.addEventListener('error', (event) => {
  console.error('Globaler Fehler aufgetreten:', event.error);
  // Fehler auf dem Bildschirm anzeigen
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = 'position:fixed;top:0;left:0;right:0;background:red;color:white;padding:20px;z-index:99999';
  errorDiv.innerHTML = `<strong>Fehler:</strong> ${event.error?.message || 'Unbekannter Fehler'}`;
  document.body.appendChild(errorDiv);
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
