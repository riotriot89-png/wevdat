'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springX = useSpring(cursorX, { stiffness: 150, damping: 15 })
  const springY = useSpring(cursorY, { stiffness: 150, damping: 15 })

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
        className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block mix-blend-difference"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Outer Ring */}
        <motion.div
          className="relative -translate-x-1/2 -translate-y-1/2"
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
        >
          {/* Glow Effect */}
          <div
            className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full transition-all duration-300 ${
              isHovering ? 'bg-accent-purple/30' : 'bg-white/10'
            }`}
            style={{
              filter: 'blur(10px)',
            }}
          />

          {/* Main Cursor */}
          <div
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              isHovering ? 'bg-accent-purple' : 'bg-white'
            }`}
          />
        </motion.div>
      </motion.div>

      {/* Mobile Detection */}
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
