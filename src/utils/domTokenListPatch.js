/**
 * Vereinheitlichter Patch für DOMTokenList.add, um Whitespace-Probleme zu beheben
 */
export function patchDOMTokenList() {
  if (typeof window !== 'undefined' && window.DOMTokenList) {
    // Original-Methode speichern
    const originalAdd = DOMTokenList.prototype.add;
    
    // Überschreibe add-Methode mit einer sicheren Version
    DOMTokenList.prototype.add = function(...tokens) {
      try {
        return originalAdd.apply(this, tokens);
      } catch (e) {
        console.info('DOMTokenList.add-Fehler behoben:', e.message);
        
        // Bereinige Tokens und versuche es erneut
        const cleanTokens = tokens
          .filter(Boolean)
          .map(token => 
            typeof token === 'string' ? token.replace(/\s+/g, '-') : token
          );
        
        return originalAdd.apply(this, cleanTokens);
      }
    };
    
    console.log('DOMTokenList.add wurde erfolgreich gepacht');
  }
}
