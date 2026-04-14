'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { name: 'GitHub', icon: '⌘', url: '#' },
  { name: 'LinkedIn', icon: 'in', url: '#' },
  { name: 'Twitter', icon: 'tw', url: '#' },
  { name: 'Email', icon: '@', url: '#' },
]

export default function SceneEnding() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Text reveals
      gsap.from('.ending-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
      })

      // Buttons slide up
      gsap.from('.ending-btn', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1,
        },
        y: 50,
        opacity: 0,
        stagger: 0.15,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scene min-h-[100vh] bg-dark-900 relative flex items-center justify-center overflow-hidden"
    >
      {/* Ambient Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 60%)',
            filter: 'blur(80px)',
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full bg-accent-purple/50"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-4xl mx-auto">
        {/* Main Question */}
        <motion.p
          className="ending-text text-sm md:text-base uppercase tracking-[0.4em] text-gray-500 mb-8"
        >
          The End... or The Beginning?
        </motion.p>

        <motion.h2
          className="ending-text text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight"
        >
          Now...
          <br />
          <span className="gradient-text">what will you build?</span>
        </motion.h2>

        <motion.p
          className="ending-text text-lg text-gray-400 mb-12 max-w-xl mx-auto"
        >
          Every great journey starts with a single step.
          Let's create something extraordinary together.
        </motion.p>

        {/* CTA Buttons */}
        <div className="ending-btn flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
          <motion.a
            href="#contact"
            className="group relative px-8 py-4 rounded-full overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Button Background */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent-purple to-accent-cyan" />
            <div className="absolute inset-[2px] bg-dark-900 rounded-full" />
            <span className="relative z-10 text-white font-medium">
              Get In Touch
            </span>
            {/* Hover Glow */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{
                background: 'linear-gradient(to right, #8b5cf6, #06b6d4)',
                filter: 'blur(15px)',
              }}
            />
          </motion.a>

          <motion.a
            href="#work"
            className="ending-btn px-8 py-4 rounded-full border border-gray-600 text-gray-300 font-medium hover:border-accent-purple hover:text-accent-purple transition-colors"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            View My Work
          </motion.a>
        </div>

        {/* Social Links */}
        <div className="ending-btn flex items-center justify-center gap-6">
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              className="group w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-500 hover:border-accent-purple hover:text-accent-purple transition-all duration-300"
              whileHover={{ y: -3 }}
            >
              <span className="text-xs font-mono">{link.icon}</span>
              <span className="absolute opacity-0 group-hover:opacity-100 -bottom-8 text-xs text-gray-400 whitespace-nowrap transition-opacity">
                {link.name}
              </span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1 }}
      >
        <p className="text-xs text-gray-600">
          Crafted with passion & precision • {new Date().getFullYear()}
        </p>
      </motion.footer>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="w-6 h-10 border-2 border-gray-600 rounded-full flex justify-center p-1">
          <motion.div
            className="w-1.5 h-3 bg-gray-500 rounded-full"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}
