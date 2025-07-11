// Performance optimization utilities

// Debounce function for search inputs
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), wait)
  }
}

// Throttle function for scroll events
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle = false
  
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

// Memoize expensive calculations
export function memoize<T extends (...args: any[]) => any>(
  func: T
): T {
  const cache = new Map()
  
  return ((...args: Parameters<T>) => {
    const key = JSON.stringify(args)
    if (cache.has(key)) {
      return cache.get(key)
    }
    
    const result = func(...args)
    cache.set(key, result)
    return result
  }) as T
}

// Request idle callback with fallback
export function requestIdleCallback(
  callback: () => void,
  options?: { timeout?: number }
) {
  if ('requestIdleCallback' in window) {
    window.requestIdleCallback(callback, options)
  } else {
    setTimeout(callback, options?.timeout || 0)
  }
}

// Preload images for better performance
export function preloadImages(urls: string[]) {
  urls.forEach(url => {
    const img = new Image()
    img.src = url
  })
}

// Intersection Observer factory for lazy loading
export function createLazyLoader(
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        callback(entry)
        observer.unobserve(entry.target)
      }
    })
  }, {
    rootMargin: '50px',
    ...options
  })
  
  return observer
}

// Performance monitor
export class PerformanceMonitor {
  private marks: Map<string, number> = new Map()
  
  mark(name: string) {
    this.marks.set(name, performance.now())
  }
  
  measure(name: string, startMark: string) {
    const start = this.marks.get(startMark)
    if (!start) return null
    
    const duration = performance.now() - start
    console.log(`⚡ ${name}: ${duration.toFixed(2)}ms`)
    return duration
  }
  
  measureFPS(duration: number = 1000): Promise<number> {
    return new Promise(resolve => {
      let frames = 0
      let startTime = performance.now()
      
      const countFrame = () => {
        frames++
        const elapsed = performance.now() - startTime
        
        if (elapsed < duration) {
          requestAnimationFrame(countFrame)
        } else {
          const fps = (frames / elapsed) * 1000
          resolve(Math.round(fps))
        }
      }
      
      requestAnimationFrame(countFrame)
    })
  }
}