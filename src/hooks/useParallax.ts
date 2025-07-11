import { useScroll, useTransform, MotionValue } from 'framer-motion'
import { RefObject } from 'react'

interface ParallaxOptions {
  offset?: number[]
  yRange?: number[]
  rotateRange?: number[]
  scaleRange?: number[]
  opacityRange?: number[]
}

export function useParallax(
  ref?: RefObject<HTMLElement>,
  options: ParallaxOptions = {}
) {
  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: options.offset as any || ["start end", "end start"]
  })

  const defaultYRange = [-100, 100]
  const defaultRotateRange = [-5, 5]
  const defaultScaleRange = [0.8, 1.2]
  const defaultOpacityRange = [0, 1]

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    options.yRange || defaultYRange
  )

  const rotate = useTransform(
    scrollYProgress,
    [0, 1],
    options.rotateRange || defaultRotateRange
  )

  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    options.scaleRange || defaultScaleRange
  )

  const opacity = useTransform(
    scrollYProgress,
    [0, 1],
    options.opacityRange || defaultOpacityRange
  )

  return {
    y,
    rotate,
    scale,
    opacity,
    scrollY,
    scrollYProgress
  }
}

// Advanced parallax with multiple layers
export function useLayeredParallax(layerCount: number = 3) {
  const { scrollY } = useScroll()
  
  const layers = Array.from({ length: layerCount }, (_, i) => {
    const speed = (i + 1) * 0.5
    return {
      y: useTransform(scrollY, [0, 1000], [0, -100 * speed]),
      opacity: useTransform(scrollY, [0, 500, 1000], [1, 0.5 / (i + 1), 0])
    }
  })

  return layers
}

// Mouse parallax effect
export function useMouseParallax() {
  const x = useTransform(
    new MotionValue(),
    [-1, 1],
    [-20, 20]
  )
  
  const y = useTransform(
    new MotionValue(),
    [-1, 1],
    [-20, 20]
  )

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event
    const { innerWidth, innerHeight } = window
    
    const xPos = (clientX / innerWidth - 0.5) * 2
    const yPos = (clientY / innerHeight - 0.5) * 2
    
    x.get()
    y.get()
  }

  return { x, y, handleMouseMove }
}