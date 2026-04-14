'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 120, damping: 20 })
  const springY = useSpring(cursorY, { stiffness: 120, damping: 20 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const handleMouseLeave = () => setIsVisible(false)
    const handleMouseEnter = () => setIsVisible(true)

    const handleHoverStart = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'BUTTON' ||
        target.tagName === 'A' ||
        target.closest('button') ||
        target.closest('a') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true)
      }
    }

    const handleHoverEnd = () => setIsHovering(false)

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseleave', handleMouseLeave)
    window.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseover', handleHoverStart)
    document.addEventListener('mouseout', handleHoverEnd)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      window.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseover', handleHoverStart)
      document.removeEventListener('mouseout', handleHoverEnd)
    }
  }, [cursorX, cursorY, isVisible])

  return (
    <>
      {/* Desktop Cursor */}
      <motion.div
        ref={cursorRef}
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 1.8 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Outer ring - golden */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full transition-all duration-300"
            style={{
              background: isHovering ? 'rgba(212, 175, 55, 0.15)' : 'rgba(212, 175, 55, 0.05)',
              boxShadow: isHovering ? '0 0 30px rgba(212, 175, 55, 0.4)' : '0 0 15px rgba(212, 175, 55, 0.1)',
              border: `1px solid ${isHovering ? 'rgba(212, 175, 55, 0.5)' : 'rgba(212, 175, 55, 0.2)'}`,
            }}
          />

          {/* Main cursor - golden dot */}
          <div
            className="w-3 h-3 rounded-full"
            style={{
              background: isHovering ? '#00d4ff' : '#d4af37',
              boxShadow: isHovering ? '0 0 15px #00d4ff' : '0 0 15px #d4af37',
            }}
          />
        </motion.div>
      </motion.div>

      {/* Mobile - hide cursor */}
      <style jsx global>{`
        @media (max-width: 768px) {
          * {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  )
}