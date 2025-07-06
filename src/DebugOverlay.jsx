import { useEffect, useState } from 'react';

export default function DebugOverlay() {
  const [foundElements, setFoundElements] = useState([]);
  const [fixApplied, setFixApplied] = useState(false);

  useEffect(() => {
    console.log("Debug-Overlay initialisiert - Suche nach Elementen, die die Seite überlagern");
    
    // Funktion zur Identifizierung problematischer Elemente
    function findProblemElements() {
      // Suche nach allen potenziell überlagernden Elementen
      const allElements = document.querySelectorAll('*');
      const problemElements = [];

      allElements.forEach((el, index) => {
        const styles = window.getComputedStyle(el);
        const position = styles.position;
        const zIndex = parseInt(styles.zIndex, 10);
        const opacity = parseFloat(styles.opacity);
        const bgColor = styles.backgroundColor;
        
        // Überprüfe auf Elemente, die den ganzen Bildschirm abdecken könnten
        const rect = el.getBoundingClientRect();
        const coversMostOfScreen = 
          rect.width > window.innerWidth * 0.9 && 
          rect.height > window.innerHeight * 0.9;
        
        // Hat das Element eine dunkle Hintergrundfarbe?
        const hasDarkBg = bgColor.includes('rgb(0, 0, 0)') || 
                         bgColor.includes('rgba(0, 0, 0') || 
                         bgColor.includes('#000');
        
        // Verdächtige Klassen oder IDs
        const suspiciousName = 
          (el.className && (
            el.className.includes('overlay') || 
            el.className.includes('modal') || 
            el.className.includes('backdrop')
          )) || 
          (el.id && (
            el.id.includes('overlay') || 
            el.id.includes('modal') || 
            el.id.includes('backdrop')
          ));
        
        // Problematisches Element gefunden
        if ((position === 'fixed' || position === 'absolute') && 
            ((zIndex > 10 && opacity > 0.5) || 
             (coversMostOfScreen && hasDarkBg) ||
             (suspiciousName && coversMostOfScreen))) {
          
          problemElements.push({
            index,
            element: el,
            zIndex,
            position,
            bgColor,
            size: { width: rect.width, height: rect.height },
            className: el.className,
            id: el.id
          });
          
          console.log(`Problematisches Element gefunden:`, el);
        }
      });
      
      return problemElements;
    }

    // Probleme automatisch beheben
    function applyFix(elements) {
      elements.forEach((info) => {
        const { element, bgColor } = info;
        
        if (bgColor.includes('rgb(0, 0, 0)') || bgColor.includes('rgba(0, 0, 0')) {
          console.log(`Element mit schwarzem Hintergrund gefunden - mache es transparent`, element);
          
          // Hintergrund transparent machen
          element.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          // z-index reduzieren
          element.style.zIndex = '5';
          // Ränder hinzufügen, um es sichtbar zu machen
          element.style.border = '3px dashed red';
        }
      });
      
      setFixApplied(true);
    }
    
    // Timer setzen, damit die Seite Zeit hat, vollständig zu rendern
    const timer = setTimeout(() => {
      const problems = findProblemElements();
      setFoundElements(problems);
      
      if (problems.length > 0) {
        console.log(`${problems.length} problematische Elemente gefunden.`);
        applyFix(problems);
      }
    }, 500);
    
    return () => clearTimeout(timer);
  }, []);

  // Hinzufügen einer Debug-Steuerung auf dem Bildschirm
  return (
    <div className="fixed bottom-4 left-4 bg-black/90 text-green-400 p-3 rounded-lg z-[99999] text-xs font-mono max-w-xs">
      <div className="flex flex-col gap-1">
        <div className="font-bold">COOLPAGE DEBUG MODE</div>
        <div>Problematische Elemente: {foundElements.length}</div>
        <div>Status: {fixApplied ? '✅ Fix angewendet' : '🔄 Analysiere...'}</div>
        {foundElements.map((info, i) => (
          <div key={i} className="text-xs opacity-70 truncate">
            {info.className || info.id || 'Unbenannt'} [z:{info.zIndex}]
          </div>
        ))}
        <div className="text-xs text-yellow-300 mt-2">
          Wenn die Seite immer noch schwarz ist, prüfe die Browser-Konsole für Details.
        </div>
      </div>
    </div>
  );
}
