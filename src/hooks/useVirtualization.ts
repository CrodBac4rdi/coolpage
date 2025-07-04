import { useState, useEffect, useRef, useCallback } from 'react'

interface VirtualizationOptions {
  itemHeight: number
  containerHeight: number
  overscan?: number
}

export function useVirtualization<T>(
  items: T[],
  options: VirtualizationOptions
) {
  const { itemHeight, containerHeight, overscan = 5 } = options
  const [scrollTop, setScrollTop] = useState(0)
  const scrollElementRef = useRef<HTMLDivElement>(null)

  const visibleCount = Math.ceil(containerHeight / itemHeight)
  const totalHeight = items.length * itemHeight

  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - overscan)
  const endIndex = Math.min(
    items.length - 1,
    startIndex + visibleCount + overscan * 2
  )

  const visibleItems = items.slice(startIndex, endIndex + 1).map((item, index) => ({
    item,
    index: startIndex + index,
    offsetTop: (startIndex + index) * itemHeight
  }))

  const handleScroll = useCallback((e: Event) => {
    const target = e.target as HTMLDivElement
    setScrollTop(target.scrollTop)
  }, [])

  useEffect(() => {
    const element = scrollElementRef.current
    if (element) {
      element.addEventListener('scroll', handleScroll)
      return () => element.removeEventListener('scroll', handleScroll)
    }
  }, [handleScroll])

  return {
    scrollElementRef,
    visibleItems,
    totalHeight,
    startIndex,
    endIndex
  }
}

// Hook for virtualizing long content paragraphs
export function useContentVirtualization(content: string[], containerHeight: number) {
  const paragraphHeight = 120 // Estimated height per paragraph
  
  return useVirtualization(content, {
    itemHeight: paragraphHeight,
    containerHeight,
    overscan: 3
  })
}

// Hook for performance monitoring
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    memoryUsage: 0,
    scrollPerformance: 0
  })

  const measureRenderTime = useCallback((callback: () => void) => {
    const start = performance.now()
    callback()
    const end = performance.now()
    
    setMetrics(prev => ({
      ...prev,
      renderTime: end - start
    }))
  }, [])

  const getMemoryUsage = useCallback(() => {
    if ('memory' in performance) {
      const memory = (performance as any).memory
      return {
        used: Math.round(memory.usedJSHeapSize / 1048576), // MB
        total: Math.round(memory.totalJSHeapSize / 1048576), // MB
        limit: Math.round(memory.jsHeapSizeLimit / 1048576) // MB
      }
    }
    return null
  }, [])

  useEffect(() => {
    const updateMemoryUsage = () => {
      const memory = getMemoryUsage()
      if (memory) {
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.used
        }))
      }
    }

    const interval = setInterval(updateMemoryUsage, 5000)
    return () => clearInterval(interval)
  }, [getMemoryUsage])

  return {
    metrics,
    measureRenderTime,
    getMemoryUsage
  }
}