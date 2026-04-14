'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SceneSignature() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Wireframe to real animation
      gsap.from('.wireframe', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
        strokeDashoffset: 2000,
        opacity: 0,
      })

      gsap.to('.wireframe-fill', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'center center',
          scrub: 1,
        },
        fillOpacity: 1,
        strokeOpacity: 0,
      })

      // Text elements animate in
      gsap.from('.sig-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 30%',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.1,
      })

      // Button appears last
      gsap.from('.sig-button', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1,
        },
        scale: 0.8,
        opacity: 0,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scene min-h-[150vh] bg-dark-900 relative overflow-hidden py-32"
    >
      {/* Scene Title */}
      <motion.div
        className="absolute top-20 right-8 md:right-20 z-20 text-right"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scene 04</span>
        <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">Dấu Ấn Riêng</h2>
        <p className="text-sm text-gray-400 mt-1">From wireframe to masterpiece...</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-8 mt-32">
        {/* Wireframe to Real Transition */}
        <div className="relative">
          {/* SVG Wireframe */}
          <motion.svg
            className="w-full max-w-2xl mx-auto"
            viewBox="0 0 400 300"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Background */}
            <rect
              x="10"
              y="10"
              width="380"
              height="280"
              rx="20"
              fill="transparent"
              stroke="#8b5cf6"
              strokeWidth="2"
              strokeDasharray="10 5"
              className="wireframe"
            />

            {/* Header wireframe */}
            <rect
              x="30"
              y="30"
              width="100"
              height="20"
              rx="5"
              fill="#8b5cf6"
              fillOpacity="0"
              stroke="#8b5cf6"
              strokeWidth="1"
              strokeDasharray="5 3"
              className="wireframe wireframe-fill"
            />

            {/* Nav wireframe */}
            <line x1="30" y1="70" x2="370" y2="70" stroke="#8b5cf6" strokeWidth="1" strokeDasharray="5 3" className="wireframe" />
            {[80, 110, 140].map((y, i) => (
              <rect
                key={i}
                x={30 + i * 100}
                y={y}
                width="60"
                height="15"
                rx="3"
                fill="#06b6d4"
                fillOpacity="0"
                stroke="#06b6d4"
                strokeWidth="1"
                strokeDasharray="5 3"
                className="wireframe wireframe-fill"
              />
            ))}

            {/* Main content wireframe */}
            <rect
              x="30"
              y="160"
              width="200"
              height="110"
              rx="10"
              fill="#f43f5e"
              fillOpacity="0"
              stroke="#f43f5e"
              strokeWidth="1"
              strokeDasharray="5 3"
              className="wireframe wireframe-fill"
            />

            {/* Sidebar wireframe */}
            <rect
              x="250"
              y="160"
              width="120"
              height="110"
              rx="10"
              fill="#8b5cf6"
              fillOpacity="0"
              stroke="#8b5cf6"
              strokeWidth="1"
              strokeDasharray="5 3"
              className="wireframe wireframe-fill"
            />

            {/* Decorative elements */}
            <circle cx="350" cy="50" r="20" fill="#06b6d4" fillOpacity="0" stroke="#06b6d4" strokeWidth="1" className="wireframe wireframe-fill" />
            <rect x="300" y="230" width="80" height="30" rx="5" fill="#8b5cf6" fillOpacity="0" stroke="#8b5cf6" strokeWidth="1" className="wireframe wireframe-fill" />
          </motion.svg>

          {/* Animated text overlay */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <motion.p
                className="sig-text text-xs uppercase tracking-[0.3em] text-gray-500 mb-4"
              >
                Watch it transform
              </motion.p>
              <motion.h3
                className="sig-text text-2xl md:text-4xl font-bold gradient-text"
              >
                Wireframe → Reality
              </motion.h3>
            </div>
          </div>
        </div>

        {/* Comparison Cards */}
        <div className="grid md:grid-cols-2 gap-8 mt-24">
          {/* Before */}
          <motion.div
            className="sig-text p-8 rounded-2xl bg-dark-800/50 border border-dashed border-gray-600"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest text-gray-500 mb-4 block">Before</span>
            <div className="space-y-3">
              <div className="h-4 bg-gray-700/50 rounded w-3/4" />
              <div className="h-4 bg-gray-700/50 rounded w-1/2" />
              <div className="h-20 bg-gray-700/30 rounded" />
              <div className="flex gap-2">
                <div className="h-8 bg-gray-700/30 rounded w-16" />
                <div className="h-8 bg-gray-700/30 rounded w-16" />
              </div>
            </div>
          </motion.div>

          {/* After */}
          <motion.div
            className="sig-text p-8 rounded-2xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 border border-accent-purple/30"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="text-xs uppercase tracking-widest text-accent-purple mb-4 block">After</span>
            <div className="space-y-3">
              <div className="h-4 bg-gradient-to-r from-accent-purple to-accent-cyan rounded w-3/4" />
              <div className="h-4 bg-gray-500 rounded w-1/2" />
              <div className="h-20 bg-gradient-to-br from-accent-purple/30 to-accent-cyan/30 rounded-lg border border-accent-purple/20" />
              <div className="flex gap-3">
                <div className="h-9 bg-accent-purple rounded-lg px-4 flex items-center justify-center text-sm font-medium">
                  Explore
                </div>
                <div className="h-9 bg-dark-700 rounded-lg px-4 flex items-center justify-center text-sm text-gray-400">
                  Learn More
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Signature Quote */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <p className="text-lg md:text-2xl text-gray-300 italic max-w-3xl mx-auto leading-relaxed">
            "Design is not just what it looks like and feels like. 
            Design is how it works — and how it makes people feel."
          </p>
        </motion.div>
      </div>
    </section>
  )
}
