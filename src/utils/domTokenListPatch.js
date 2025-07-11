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
        .filter(token => token && token !== 'undefined' && token !== 'null') // Entferne null/undefined/string 'undefined'
        .map(token => {
          if (typeof token === 'string') {
            // Entferne alle Whitespace-Zeichen komplett
            return token.split(/\s+/).filter(Boolean).join('-');
          }
          return String(token);
        })
        .filter(token => token && token.length > 0); // Entferne leere strings
      
      // Nur anwenden wenn es safe tokens gibt
      if (safeTokens.length > 0) {
        return originalAdd.apply(this, safeTokens);
      }
    };
    
    // Auch classList.add patchen falls es direkt aufgerufen wird
    const originalClassListAdd = Element.prototype.classList.add;
    if (originalClassListAdd) {
      Object.defineProperty(Element.prototype.classList, 'add', {
        value: function(...tokens) {
          return DOMTokenList.prototype.add.apply(this, tokens);
        },
        configurable: true
      });
    }
    
    console.log('DOMTokenList.add wurde gepacht, um Whitespace-Fehler zu vermeiden');
  }
}
