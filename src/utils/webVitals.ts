// Web Vitals Performance Monitoring
export interface WebVitalsMetric {
  name: string
  value: number
  id: string
  delta: number
  rating: 'good' | 'needs-improvement' | 'poor'
}

export function reportWebVitals(onPerfEntry?: (metric: WebVitalsMetric) => void) {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    // Core Web Vitals
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    }).catch(() => {
      // Fallback if web-vitals is not available
      console.warn('Web Vitals library not available')
    })
  }
}

// Custom performance observer
export class PerformanceMonitor {
  private metrics: Map<string, number> = new Map()
  
  constructor() {
    if ('performance' in window) {
      this.observeNavigationTiming()
      this.observeResourceTiming()
      this.observeLongTasks()
    }
  }

  private observeNavigationTiming() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'navigation') {
            const navEntry = entry as PerformanceNavigationTiming
            this.metrics.set('domContentLoaded', navEntry.domContentLoadedEventEnd - navEntry.domContentLoadedEventStart)
            this.metrics.set('loadComplete', navEntry.loadEventEnd - navEntry.loadEventStart)
            this.metrics.set('firstByte', navEntry.responseStart - navEntry.requestStart)
          }
        }
      })
      
      observer.observe({ entryTypes: ['navigation'] })
    } catch (error) {
      console.warn('Navigation timing observer not supported')
    }
  }

  private observeResourceTiming() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'resource') {
            const resourceEntry = entry as PerformanceResourceTiming
            
            // Track slow resources
            if (resourceEntry.duration > 1000) { // > 1 second
              console.warn(`Slow resource: ${resourceEntry.name} took ${resourceEntry.duration}ms`)
            }
          }
        }
      })
      
      observer.observe({ entryTypes: ['resource'] })
    } catch (error) {
      console.warn('Resource timing observer not supported')
    }
  }

  private observeLongTasks() {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'longtask') {
            console.warn(`Long task detected: ${entry.duration}ms`)
            this.metrics.set('longTask', entry.duration)
          }
        }
      })
      
      observer.observe({ entryTypes: ['longtask'] })
    } catch (error) {
      console.warn('Long task observer not supported')
    }
  }

  public getMetrics() {
    return Object.fromEntries(this.metrics)
  }

  public logMetrics() {
    console.table(this.getMetrics())
  }
}

// Initialize performance monitoring
export const performanceMonitor = new PerformanceMonitor()

// Custom timing function
export function measurePerformance(name: string, fn: () => void) {
  const start = performance.now()
  fn()
  const end = performance.now()
  console.log(`${name}: ${end - start}ms`)
}

// Memory usage tracking
export function getMemoryUsage() {
  if ('memory' in performance) {
    const memInfo = (performance as any).memory
    return {
      usedJSHeapSize: memInfo.usedJSHeapSize,
      totalJSHeapSize: memInfo.totalJSHeapSize,
      jsHeapSizeLimit: memInfo.jsHeapSizeLimit,
      usage: (memInfo.usedJSHeapSize / memInfo.jsHeapSizeLimit) * 100
    }
  }
  return null
}

// Connection quality detection
export function getConnectionQuality() {
  if ('connection' in navigator) {
    const conn = (navigator as any).connection
    return {
      effectiveType: conn.effectiveType,
      downlink: conn.downlink,
      rtt: conn.rtt,
      saveData: conn.saveData
    }
  }
  return null
}

// Report to console or analytics
export function reportPerformance() {
  const metrics = performanceMonitor.getMetrics()
  const memory = getMemoryUsage()
  const connection = getConnectionQuality()
  
  console.group('Performance Report')
  console.log('Metrics:', metrics)
  console.log('Memory:', memory)
  console.log('Connection:', connection)
  console.groupEnd()
}