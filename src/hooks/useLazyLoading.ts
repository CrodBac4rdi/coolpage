import { useState, useEffect, useRef } from 'react'

interface LazyLoadingOptions {
  threshold?: number
  rootMargin?: string
  triggerOnce?: boolean
}

export function useLazyLoading(options: LazyLoadingOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '50px',
    triggerOnce = true
  } = options

  const [isVisible, setIsVisible] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)
  const elementRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          if (triggerOnce) {
            observer.unobserve(element)
          }
        } else if (!triggerOnce) {
          setIsVisible(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    observer.observe(element)

    return () => {
      observer.disconnect()
    }
  }, [threshold, rootMargin, triggerOnce])

  return {
    elementRef,
    isVisible,
    isLoaded,
    setIsLoaded
  }
}

export function useLazyImage(src: string) {
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { elementRef, isVisible, isLoaded, setIsLoaded } = useLazyLoading()

  useEffect(() => {
    if (isVisible && !isLoaded && !isLoading) {
      setIsLoading(true)
      setError(null)
      
      const img = new Image()
      img.onload = () => {
        setImageSrc(src)
        setIsLoaded(true)
        setIsLoading(false)
      }
      img.onerror = () => {
        setError('Failed to load image')
        setIsLoading(false)
      }
      img.src = src
    }
  }, [isVisible, isLoaded, isLoading, src, setIsLoaded])

  return {
    elementRef,
    imageSrc,
    isLoading,
    error,
    isVisible
  }
}

export function useLazyContent<T>(
  loadFunction: () => Promise<T>,
  dependencies: React.DependencyList = []
) {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { elementRef, isVisible, isLoaded, setIsLoaded } = useLazyLoading()

  useEffect(() => {
    if (isVisible && !isLoaded && !isLoading) {
      setIsLoading(true)
      setError(null)
      
      loadFunction()
        .then((result) => {
          setData(result)
          setIsLoaded(true)
          setIsLoading(false)
        })
        .catch((err) => {
          setError(err.message || 'Failed to load content')
          setIsLoading(false)
        })
    }
  }, [isVisible, isLoaded, isLoading, loadFunction, setIsLoaded, ...dependencies])

  return {
    elementRef,
    data,
    isLoading,
    error,
    isVisible
  }
}