/**
 * Patch für DOMTokenList.add, um Whitespace-Probleme zu beheben
 */
export function patchDOMTokenList() {
  if (typeof window !== 'undefined' && window.DOMTokenList) {
    // Original-Methode speichern
    const originalAdd = DOMTokenList.prototype.add;
    
    // Überschreibe add-Methode mit einer sicheren Version
    DOMTokenList.prototype.add = function(...tokens) {
      // Filtere und bereinige Tokens
      const safeTokens = tokens
        .filter(token => token) // Entferne null/undefined
        .map(token => {
          if (typeof token === 'string') {
            // Ersetze Leerzeichen durch Bindestriche
            return token.trim().replace(/\s+/g, '-');
          }
          return token;
        });
      
      // Wende Original-Methode mit bereinigten Tokens an
      return originalAdd.apply(this, safeTokens);
    };
    
    console.log('DOMTokenList.add wurde gepacht, um Whitespace-Fehler zu vermeiden');
  }
}
