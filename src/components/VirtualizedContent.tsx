import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useVirtualization, usePerformanceMonitor } from '../hooks/useVirtualization'

interface VirtualizedContentProps {
  content: string[]
  fontSize: string
  lineHeight: string
  onParagraphView?: (index: number) => void
  className?: string
}

export default function VirtualizedContent({
  content,
  fontSize,
  lineHeight,
  onParagraphView,
  className = ''
}: VirtualizedContentProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerHeight, setContainerHeight] = useState(600)
  const { metrics, measureRenderTime } = usePerformanceMonitor()

  // Estimate paragraph height based on font size
  const getParagraphHeight = useCallback(() => {
    const baseSizes = {
      'text-sm': 80,
      'text-base': 100,
      'text-lg': 120,
      'text-xl': 140
    }
    return baseSizes[fontSize as keyof typeof baseSizes] || 100
  }, [fontSize])

  const {
    scrollElementRef,
    visibleItems,
    totalHeight,
    startIndex,
    endIndex
  } = useVirtualization(content, {
    itemHeight: getParagraphHeight(),
    containerHeight,
    overscan: 3
  })

  // Update container height on resize
  useEffect(() => {
    const updateHeight = () => {
      if (containerRef.current) {
        setContainerHeight(containerRef.current.clientHeight)
      }
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  // Notify parent of viewed paragraphs
  useEffect(() => {
    if (onParagraphView) {
      const middleIndex = Math.floor((startIndex + endIndex) / 2)
      onParagraphView(middleIndex)
    }
  }, [startIndex, endIndex, onParagraphView])

  const renderParagraph = useCallback((paragraph: string, index: number, offsetTop: number) => {
    measureRenderTime(() => {})
    return (
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: (index - startIndex) * 0.05 }}
        style={{
          position: 'absolute',
          top: offsetTop,
          left: 0,
          right: 0,
          minHeight: getParagraphHeight()
        }}
        className={`px-4 py-3 ${fontSize} ${lineHeight}`}
      >
        <div className="max-w-none prose prose-invert">
          {paragraph.split('\n').map((line, lineIndex) => (
            <p key={lineIndex} className="mb-4 last:mb-0">
              {line}
            </p>
          ))}
        </div>
      </motion.div>
    )
  }, [fontSize, lineHeight, getParagraphHeight, measureRenderTime, startIndex])

  return (
    <div 
      ref={containerRef}
      className={`relative overflow-hidden ${className}`}
      style={{ height: '70vh' }}
    >
      <div
        ref={scrollElementRef}
        className="absolute inset-0 overflow-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800"
      >
        <div style={{ height: totalHeight, position: 'relative' }}>
          {visibleItems.map(({ item, index, offsetTop }) =>
            renderParagraph(item, index, offsetTop)
          )}
        </div>
      </div>

      {/* Performance indicator (only in development) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed bottom-4 left-4 bg-black/80 text-green-400 p-2 rounded text-xs font-mono">
          <div>Render: {metrics.renderTime.toFixed(1)}ms</div>
          <div>Memory: {metrics.memoryUsage}MB</div>
          <div>Visible: {startIndex}-{endIndex}/{content.length}</div>
        </div>
      )}
    </div>
  )
}

// Optimized paragraph component with intersection observer
export function OptimizedParagraph({
  content,
  index,
  fontSize,
  lineHeight,
  onView
}: {
  content: string
  index: number
  fontSize: string
  lineHeight: string
  onView?: (index: number) => void
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        const visible = entry.isIntersecting
        setIsVisible(visible)
        
        if (visible && onView) {
          onView(index)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px 0px'
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [index, onView])

  return (
    <div ref={ref} className={`mb-6 ${fontSize} ${lineHeight}`}>
      {isVisible ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {content}
        </motion.div>
      ) : (
        <div style={{ height: '6rem' }} className="bg-gray-800/20 rounded animate-pulse" />
      )}
    </div>
  )
}

// Progressive content loader
export function ProgressiveContentLoader({
  content,
  chunkSize = 10,
  fontSize,
  lineHeight,
  onParagraphView
}: {
  content: string[]
  chunkSize?: number
  fontSize: string
  lineHeight: string
  onParagraphView?: (index: number) => void
}) {
  const [loadedChunks, setLoadedChunks] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const loadingRef = useRef<HTMLDivElement>(null)

  const totalChunks = Math.ceil(content.length / chunkSize)
  const visibleContent = content.slice(0, loadedChunks * chunkSize)

  // Load more content when user scrolls near bottom
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isLoading && loadedChunks < totalChunks) {
          setIsLoading(true)
          
          // Simulate loading delay for better UX
          setTimeout(() => {
            setLoadedChunks(prev => Math.min(prev + 1, totalChunks))
            setIsLoading(false)
          }, 300)
        }
      },
      { threshold: 0.1 }
    )

    if (loadingRef.current) {
      observer.observe(loadingRef.current)
    }

    return () => observer.disconnect()
  }, [isLoading, loadedChunks, totalChunks])

  return (
    <div>
      {visibleContent.map((paragraph, index) => (
        <OptimizedParagraph
          key={index}
          content={paragraph}
          index={index}
          fontSize={fontSize}
          lineHeight={lineHeight}
          onView={onParagraphView}
        />
      ))}
      
      {loadedChunks < totalChunks && (
        <div ref={loadingRef} className="py-8 text-center">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-3">
              <div className="w-5 h-5 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
              <span className="text-gray-400">Loading more content...</span>
            </div>
          ) : (
            <div className="text-gray-500 text-sm">
              Scroll down to load more • {loadedChunks * chunkSize} of {content.length} paragraphs
            </div>
          )}
        </div>
      )}
    </div>
  )
}