import { useEffect } from 'react';

export function ClassNameDebugger() {
  useEffect(() => {
    // Original-Element.classList.add speichern
    const originalAdd = Element.prototype.classList.add;
    
    // classList.add überschreiben, um Fehler zu fangen
    Element.prototype.classList.add = function(...tokens) {
      try {
        return originalAdd.apply(this, tokens);
      } catch (e) {
        console.error('ClassList Error mit:', tokens);
        console.error('Auf Element:', this);
        console.error('Stack:', new Error().stack);
        
        // Versuche, das Token zu bereinigen und erneut hinzuzufügen
        const cleanTokens = tokens.map(token => 
          typeof token === 'string' ? token.replace(/\s+/g, '-') : token
        );
        return originalAdd.apply(this, cleanTokens);
      }
    };
  }, []);
  
  return null;
}
