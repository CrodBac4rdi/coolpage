import { useEffect } from 'react';

export default function DebugOverlay() {
  useEffect(() => {
    // Suche nach Elementen, die die ganze Seite überdecken könnten
    const fullscreenElements = document.querySelectorAll(
      '*[style*="position: fixed"], *[style*="position: absolute"], *[class*="overlay"], *[class*="modal"]'
    );
    
    console.log("Potenzielle überlagernde Elemente:", fullscreenElements);
    
    // Setze z-index temporär auf alle verdächtigen Elemente zurück
    fullscreenElements.forEach(el => {
      console.log(`Element mit Klasse "${el.className}" und z-index: ${getComputedStyle(el).zIndex}`);
      if (getComputedStyle(el).backgroundColor.includes("0, 0, 0") || 
          getComputedStyle(el).backgroundColor.includes("rgb(0, 0, 0)")) {
        console.log("Schwarzes Element gefunden:", el);
        el.style.backgroundColor = "rgba(0,0,0,0.5)"; // Mache es halbtransparent für Debug-Zwecke
      }
    });
  }, []);

  return null;
}
