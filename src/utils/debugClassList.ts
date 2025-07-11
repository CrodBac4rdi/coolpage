// Debug utility to find where the whitespace error comes from
export function debugClassList() {
  if (typeof window === 'undefined') return

  // Override DOMTokenList.add to log errors
  const originalAdd = DOMTokenList.prototype.add
  DOMTokenList.prototype.add = function(...tokens: any[]) {
    // Check each token for whitespace
    tokens.forEach(token => {
      console.log('DOMTokenList.add called with:', token, 'type:', typeof token)
      
      // Convert to string and check
      const tokenStr = String(token)
      if (tokenStr && tokenStr.includes(' ')) {
        console.error('WHITESPACE FOUND IN CLASS:', tokenStr)
        console.error('Original value:', token)
        console.error('Element:', this)
        console.trace('Stack trace:')
      }
    })
    
    // Call original method - but filter out non-strings
    const validTokens = tokens.filter(t => typeof t === 'string')
    if (validTokens.length > 0) {
      return originalAdd.apply(this, validTokens)
    }
  }
  
  console.log('Debug classList monitoring activated')
}