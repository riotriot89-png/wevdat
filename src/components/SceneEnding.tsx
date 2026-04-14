'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const socialLinks = [
  { name: 'GitHub', hanzi: '碼', url: '#' },
  { name: 'LinkedIn', hanzi: '絡', url: '#' },
  { name: 'Twitter', hanzi: '鳴', url: '#' },
  { name: 'Email', hanzi: '書', url: '#' },
]

export default function SceneEnding() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Stars appear one by one
      gsap.from('.ending-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        stagger: 0.3,
        filter: 'blur(20px)',
      })

      // CTA buttons rise
      gsap.from('.ending-btn', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        ease: 'back.out(1.5)',
      })

      // Stars twinkle
      gsap.to('.star', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          scrub: 1,
        },
        opacity: 0.8,
        scale: 1.5,
        stagger: 0.1,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scene min-h-[120vh] bg-void relative flex items-center justify-center overflow-hidden"
    >
      {/* Background - Cosmic void with stars */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Deep space gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 50% 30%, rgba(138, 43, 226, 0.1) 0%, transparent 50%)',
          }}
        />

        {/* Stars */}
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="star absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: i % 4 === 0 ? '#d4af37' : i % 4 === 1 ? '#00d4ff' : i % 4 === 2 ? '#00a86b' : '#ffffff',
              boxShadow: `0 0 ${3 + Math.random() * 6}px ${
                i % 4 === 0 ? '#d4af37' : i % 4 === 1 ? '#00d4ff' : i % 4 === 2 ? '#00a86b' : '#ffffff'
              }`,
            }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
          />
        ))}

        {/* Cosmic nebula effect */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, rgba(0, 212, 255, 0.03) 30%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.7, 0.4],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        />

        {/* Floating qi particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#00d4ff' : '#00a86b',
              boxShadow: `0 0 8px ${i % 3 === 0 ? '#d4af37' : i % 3 === 1 ? '#00d4ff' : '#00a86b'}`,
            }}
            animate={{
              y: [0, -50, 0],
              x: [0, Math.random() * 30 - 15, 0],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 5 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto">
        {/* Main Question */}
        <motion.p
          className="ending-text text-sm md:text-base uppercase tracking-[0.5em] text-immortal-gold/50 mb-10"
        >
          終章 · The Final Chapter
        </motion.p>

        <motion.h2
          className="ending-text text-4xl md:text-6xl lg:text-8xl font-bold text-white mb-10 leading-tight"
        >
          現在...
          <br />
          <span className="gradient-gold text-glow-gold">你將創造什麼？</span>
        </motion.h2>

        <motion.p
          className="ending-text text-lg md:text-xl text-spirit-white/60 mb-16 max-w-2xl mx-auto leading-relaxed"
        >
          萬里之行，始於足下。
          <br />
          Every great journey starts with a single step.
        </motion.p>

        {/* CTA Buttons */}
        <div className="ending-btn flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <motion.a
            href="#contact"
            className="group relative px-10 py-5 rounded-full overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {/* Gradient background */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #00d4ff 50%, #00a86b 100%)',
              }}
            />
            <div className="absolute inset-[2px] bg-void rounded-full" />
            <span className="relative z-10 text-white font-medium text-lg tracking-wider">
              聯繫我 · Get In Touch
            </span>
            {/* Glow effect */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-80 transition-opacity duration-500"
              style={{
                background: 'linear-gradient(135deg, #d4af37 0%, #00d4ff 100%)',
                filter: 'blur(20px)',
              }}
            />
          </motion.a>

          <motion.a
            href="#work"
            className="ending-btn px-10 py-5 rounded-full border border-immortal-gold/40 text-white/70 font-medium hover:border-immortal-gold hover:text-immortal-gold transition-all duration-500 tracking-wider"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            查看作品 · View My Work
          </motion.a>
        </div>

        {/* Social Links with Hanzi */}
        <div className="ending-btn flex items-center justify-center gap-8">
          {socialLinks.map((link, i) => (
            <motion.a
              key={i}
              href={link.url}
              className="group relative flex flex-col items-center gap-2"
              whileHover={{ y: -5 }}
            >
              {/* Hanzi circle */}
              <div
                className="w-14 h-14 rounded-full border border-immortal-gold/30 flex items-center justify-center text-immortal-gold/50 group-hover:border-immortal-gold/60 group-hover:text-immortal-gold transition-all duration-500"
                style={{
                  boxShadow: '0 0 20px rgba(212, 175, 55, 0.1)',
                }}
              >
                <span className="text-lg font-bold">{link.hanzi}</span>
              </div>
              {/* English name */}
              <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors tracking-wider">
                {link.name}
              </span>
              {/* Glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                style={{
                  background: 'radial-gradient(circle, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                  filter: 'blur(10px)',
                }}
              />
            </motion.a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <motion.footer
        className="absolute bottom-8 left-0 right-0 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
      >
        <div className="flex items-center justify-center gap-4">
          <div className="w-8 h-px bg-gradient-to-r from-transparent to-immortal-gold/30" />
          <p className="text-xs text-white/30 tracking-[0.3em]">
            以心鑄道 · CRAFTED WITH PASSION · {new Date().getFullYear()}
          </p>
          <div className="w-8 h-px bg-gradient-to-l from-transparent to-immortal-gold/30" />
        </div>
      </motion.footer>

      {/* Scroll Indicator - Qi flowing down */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 2.5, repeat: Infinity }}
      >
        <div className="w-8 h-14 rounded-full border border-immortal-gold/30 flex justify-center p-1 overflow-hidden">
          <motion.div
            className="w-1.5 rounded-full"
            style={{
              background: 'linear-gradient(to bottom, #d4af37, transparent)',
            }}
            animate={{ y: [0, 24, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  )
}