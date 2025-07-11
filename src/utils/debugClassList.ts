// Debug utility to find where the whitespace error comes from
export function debugClassList() {
  if (typeof window === 'undefined') return

  // Override DOMTokenList.add to log errors
  const originalAdd = DOMTokenList.prototype.add
  DOMTokenList.prototype.add = function(...tokens: string[]) {
    // Check each token for whitespace
    tokens.forEach(token => {
      if (token && token.includes(' ')) {
        console.error('WHITESPACE FOUND IN CLASS:', token)
        console.error('Element:', this)
        console.trace('Stack trace:')
      }
    })
    
    // Call original method
    return originalAdd.apply(this, tokens)
  }
  
  console.log('Debug classList monitoring activated')
}