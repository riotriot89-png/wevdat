'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Intro() {
  const [phase, setPhase] = useState(0)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 1500),
      setTimeout(() => setPhase(2), 3500),
      setTimeout(() => setPhase(3), 5500),
      setTimeout(() => setShowIntro(false), 7000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.section
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        >
          {/* Background ambient glow */}
          <div className="absolute inset-0 overflow-hidden">
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%)',
                filter: 'blur(60px)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          {/* Text Content */}
          <div className="relative z-10 text-center px-4">
            <AnimatePresence mode="wait">
              {phase >= 1 && (
                <motion.p
                  key="line1"
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-lg md:text-xl text-gray-400 mb-4 tracking-wide"
                >
                  Every interface tells a story…
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {phase >= 2 && (
                <motion.h1
                  key="line2"
                  initial={{ opacity: 0, y: 30, scale: 0.95, filter: 'blur(15px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                  className="text-3xl md:text-5xl lg:text-6xl font-bold text-white"
                >
                  This one is mine.
                </motion.h1>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {phase >= 3 && (
                <motion.div
                  key="line3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: 'easeOut' }}
                  className="mt-12"
                >
                  <p className="text-sm text-gray-500 animate-pulse">
                    Scroll to begin…
                  </p>
                  <motion.div
                    className="mt-4 mx-auto w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                  >
                    <motion.div className="w-1.5 h-3 bg-gray-500 rounded-full mt-2" />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}
