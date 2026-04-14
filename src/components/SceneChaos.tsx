'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const chaosElements = [
  { id: 1, text: '氣', pinyin: 'Qi', x: 10, y: 15, rotation: 12, color: '#d4af37' },
  { id: 2, text: '丹', pinyin: 'Dan', x: 75, y: 25, rotation: -18, color: '#00d4ff' },
  { id: 3, text: '道', pinyin: 'Dao', x: 20, y: 55, rotation: 22, color: '#8b0000' },
  { id: 4, text: '玄', pinyin: 'Xuan', x: 65, y: 70, rotation: -8, color: '#d4af37' },
  { id: 5, text: '心', pinyin: 'Xin', x: 40, y: 35, rotation: 28, color: '#00a86b' },
  { id: 6, text: '神', pinyin: 'Shen', x: 85, y: 45, rotation: -24, color: '#00d4ff' },
  { id: 7, text: '虛', pinyin: 'Xu', x: 15, y: 80, rotation: 15, color: '#8b0000' },
  { id: 8, text: '無', pinyin: 'Wu', x: 55, y: 10, rotation: -12, color: '#d4af37' },
  { id: 9, text: '真', pinyin: 'Zhen', x: 30, y: 75, rotation: 20, color: '#00d4ff' },
  { id: 10, text: '境', pinyin: 'Jing', x: 80, y: 80, rotation: -28, color: '#00a86b' },
  { id: 11, text: '悟', pinyin: 'Wu', x: 25, y: 40, rotation: 35, color: '#8b0000' },
  { id: 12, text: '靈', pinyin: 'Ling', x: 60, y: 50, rotation: -5, color: '#d4af37' },
]

export default function SceneChaos() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; color: string; vx: number; vy: number }>>([])

  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Elements float chaotically
      gsap.to('.chaos-element', {
        y: 'random(-30, 30)',
        x: 'random(-15, 15)',
        rotation: 'random(-60, 60)',
        duration: 4,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.15,
          from: 'random',
        },
      })

      // On scroll - chaos dissolves
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress

          if (progress > 0.2 && particles.length === 0) {
            const newParticles = chaosElements.map((el, i) => ({
              id: i,
              x: el.x * 10,
              y: el.y * 5,
              color: el.color,
              vx: (Math.random() - 0.5) * 40,
              vy: (Math.random() - 0.5) * 40,
            }))
            setParticles(newParticles)
          }

          gsap.to('.chaos-element', {
            opacity: 1 - progress,
            scale: 1 - progress * 0.5,
            filter: `blur(${progress * 10}px)`,
            stagger: 0.03,
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [particles.length])

  return (
    <section
      ref={sectionRef}
      className="scene min-h-[200vh] bg-void relative flex items-center justify-center overflow-hidden"
    >
      {/* Background - chaotic void energy */}
      <div className="absolute inset-0">
        {/* Dark fog layers */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 30% 50%, rgba(139, 43, 226, 0.1) 0%, transparent 50%)',
          }}
          animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at 70% 60%, rgba(139, 0, 0, 0.08) 0%, transparent 40%)',
          }}
          animate={{ opacity: [0.4, 0.7, 0.4], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 10, repeat: Infinity }}
        />

        {/* Chaotic qi lines */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-immortal-gold/20 to-transparent"
            style={{
              left: '0',
              right: '0',
              top: `${15 + i * 12}%`,
              transform: `rotate(${Math.random() * 10 - 5}deg)`,
            }}
            animate={{
              scaleX: [0.5, 1, 0.5],
              opacity: [0.1, 0.3, 0.1],
              x: [0, 50, 0],
            }}
            transition={{
              duration: 4 + i,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>

      {/* Scene Title */}
      <motion.div
        className="absolute top-20 left-8 md:left-20 z-20"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <span className="text-xs uppercase tracking-[0.4em] text-immortal-gold/50">Scene 01</span>
        <h2 className="text-3xl md:text-5xl font-bold gradient-gold text-glow-gold mt-3 mb-2">混沌初開</h2>
        <p className="text-sm text-spirit-cyan/60">Where everything begins...</p>
      </motion.div>

      {/* Chaos Container - Floating Chinese Characters */}
      <motion.div
        ref={containerRef}
        className="relative w-full max-w-5xl h-[700px]"
      >
        {/* Floating characters */}
        {chaosElements.map((el) => (
          <motion.div
            key={el.id}
            className="chaos-element absolute cursor-default"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              transform: `rotate(${el.rotation}deg)`,
            }}
          >
            <div
              className="relative group"
              style={{ color: el.color }}
            >
              {/* Glow ring */}
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `${el.color}20`,
                  filter: 'blur(20px)',
                }}
                animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              {/* Main character */}
              <div className="relative px-4 py-3">
                <span
                  className="text-4xl md:text-5xl font-bold"
                  style={{ textShadow: `0 0 30px ${el.color}` }}
                >
                  {el.text}
                </span>
                <span className="block text-xs text-white/40 mt-1 font-mono">{el.pinyin}</span>
              </div>
              {/* Hover effect */}
              <motion.div
                className="absolute inset-0 rounded-lg border opacity-0 group-hover:opacity-100 transition-opacity"
                style={{ borderColor: el.color }}
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        ))}

        {/* Particles that scatter on scroll */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute w-2 h-2 rounded-full"
            style={{
              left: p.x,
              top: p.y,
              background: p.color,
              boxShadow: `0 0 15px ${p.color}`,
            }}
            animate={{
              x: p.vx * 20,
              y: p.vy * 20,
              opacity: 0,
              scale: 0,
            }}
            transition={{ duration: 2, ease: 'easeOut' }}
          />
        ))}

        {/* Mystical circle in center */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-immortal-gold/20"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
        >
          <motion.div
            className="absolute inset-8 rounded-full border border-spirit-cyan/20"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />
          <div className="absolute inset-16 rounded-full bg-immortal-gold/5 backdrop-blur-sm" />
        </motion.div>
      </motion.div>

      {/* Bottom Text */}
      <motion.div
        className="absolute bottom-20 left-8 md:left-20 right-8 md:right-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <p className="text-spirit-cyan/60 text-sm md:text-base max-w-2xl leading-relaxed">
          In the vast emptiness, a single spark ignites. The chaotic qi swirls, seeking direction...
          <span className="text-immortal-gold ml-2">混沌之中，真氣初生。</span>
        </p>
      </motion.div>
    </section>
  )
}