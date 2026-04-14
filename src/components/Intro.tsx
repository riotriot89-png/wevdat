'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Intro() {
  const [phase, setPhase] = useState(0)
  const [showIntro, setShowIntro] = useState(true)

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase(1), 2000),
      setTimeout(() => setPhase(2), 4000),
      setTimeout(() => setPhase(3), 6000),
      setTimeout(() => setShowIntro(false), 8000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [])

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.section
          className="fixed inset-0 z-[100] bg-void flex items-center justify-center overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
        >
          {/* Background - Void with golden energy */}
          <div className="absolute inset-0">
            {/* Rotating rune circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <motion.div
                className="w-[500px] h-[500px] rounded-full border border-immortal-gold/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-10 rounded-full border border-spirit-cyan/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-20 rounded-full border border-immortal-gold/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute inset-32 rounded-full border border-jade-green/10"
                animate={{ rotate: -360 }}
                transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Golden ambient glow */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
                filter: 'blur(80px)',
              }}
              animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Qi energy particles */}
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="cultivation-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${2 + Math.random() * 4}px`,
                  height: `${2 + Math.random() * 4}px`,
                  background: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#00d4ff' : '#00a86b',
                  boxShadow: `0 0 10px ${i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#00d4ff' : '#00a86b'}`,
                }}
                animate={{
                  y: [0, -40, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Infinity,
                  delay: Math.random() * 3,
                }}
              />
            ))}
          </div>

          {/* Text Content */}
          <div className="relative z-10 text-center px-4">
            <AnimatePresence mode="wait">
              {phase >= 1 && (
                <motion.p
                  key="line1"
                  initial={{ opacity: 0, y: 20, filter: 'blur(20px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
                  className="text-lg md:text-xl text-immortal-gold/80 mb-6 tracking-[0.4em] font-light"
                >
                  天道酬勤
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {phase >= 2 && (
                <motion.h1
                  key="line2"
                  initial={{ opacity: 0, y: 40, scale: 0.9, filter: 'blur(30px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1], delay: 0.5 }}
                  className="text-4xl md:text-6xl lg:text-7xl font-bold gradient-gold text-glow-gold mb-8"
                >
                  My Cultivation Journey
                </motion.h1>
              )}
            </AnimatePresence>

            <AnimatePresence mode="wait">
              {phase >= 3 && (
                <motion.div
                  key="line3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                  className="mt-16"
                >
                  <p className="text-sm text-spirit-cyan/60 tracking-[0.5em] animate-pulse">
                    SCROLL TO BEGIN
                  </p>
                  <motion.div
                    className="mt-6 mx-auto w-8 h-12 border-2 border-immortal-gold/40 rounded-full flex justify-center overflow-hidden"
                    animate={{ borderColor: ['rgba(212,175,55,0.4)', 'rgba(212,175,55,0.8)', 'rgba(212,175,55,0.4)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <motion.div
                      className="w-1 h-4 bg-gradient-to-b from-immortal-gold to-transparent rounded-full mt-2"
                      animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Corner decorations */}
          <div className="absolute top-8 left-8 text-immortal-gold/30 font-calligraphy text-2xl">道</div>
          <div className="absolute top-8 right-8 text-immortal-gold/30 font-calligraphy text-2xl">法</div>
          <div className="absolute bottom-8 left-8 text-immortal-gold/30 font-calligraphy text-2xl">自然</div>
          <div className="absolute bottom-8 right-8 text-immortal-gold/30 font-calligraphy text-2xl">無為</div>
        </motion.section>
      )}
    </AnimatePresence>
  )
}