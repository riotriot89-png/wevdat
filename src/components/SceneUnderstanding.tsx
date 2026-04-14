'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const pillars = [
  { hanzi: '定', meaning: 'Concentration', desc: 'Tập trung tinh thần', color: '#d4af37' },
  { hanzi: '靜', meaning: 'Stillness', desc: 'Tĩnh lặng tâm hồn', color: '#00d4ff' },
  { hanzi: '慧', meaning: 'Wisdom', desc: 'Trí tuệ minh triết', color: '#00a86b' },
  { hanzi: '悟', meaning: 'Enlightenment', desc: 'Giác ngộ chân lý', color: '#8b0000' },
  { hanzi: '道', meaning: 'The Path', desc: 'Con đường tu luyện', color: '#d4af37' },
  { hanzi: '德', meaning: 'Virtue', desc: 'Đức hạnh cao thượng', color: '#00d4ff' },
]

const codeSnippets = [
  { code: 'const qi = align();', y: 0 },
  { code: 'await innerPeace.achieve();', y: 60 },
  { code: 'wisdom.grow(forever);', y: 120 },
  { code: 'return dao.ofLife;', y: 180 },
]

export default function SceneUnderstanding() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Pillars rise from ground
      gsap.from('.pillar', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'center center',
          scrub: 1,
        },
        y: 200,
        opacity: 0,
        scaleY: 0,
        transformOrigin: 'bottom center',
        stagger: 0.2,
        ease: 'back.out(1.5)',
      })

      // Code lines appear
      gsap.from('.code-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 60%',
          scrub: 1,
        },
        x: -100,
        opacity: 0,
        stagger: 0.15,
      })

      // Dao symbol rotates
      gsap.to('.dao-symbol', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 40%',
          end: 'bottom 40%',
          scrub: 1,
        },
        rotation: 360,
      })

      // Light beams
      gsap.from('.light-beam', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
        },
        scaleY: 0,
        opacity: 0,
        stagger: 0.1,
        transformOrigin: 'top center',
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scene min-h-[200vh] bg-void relative overflow-hidden py-32"
    >
      {/* Background - Mystical mountains silhouette */}
      <div className="absolute inset-0">
        {/* Gradient mist at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-chaos-purple/50 to-transparent" />

        {/* Subtle grid pattern - Dao lines */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px bg-immortal-gold/5"
            style={{
              left: `${8 + i * 8}%`,
              top: '20%',
              height: '60%',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`h-${i}`}
            className="absolute h-px bg-spirit-cyan/5"
            style={{
              top: `${20 + i * 10}%`,
              left: '8%',
              right: '8%',
            }}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Light beams from top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-[50vh] bg-gradient-to-b from-immortal-gold/30 to-transparent" />
      <div className="absolute top-0 left-1/4 w-px h-[40vh] bg-gradient-to-b from-spirit-cyan/20 to-transparent" />
      <div className="absolute top-0 left-3/4 w-px h-[40vh] bg-gradient-to-b from-jade-green/20 to-transparent" />

      {/* Scene Title */}
      <motion.div
        className="absolute top-20 right-8 md:right-20 z-20 text-right"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <span className="text-xs uppercase tracking-[0.4em] text-immortal-gold/50">Scene 02</span>
        <h2 className="text-3xl md:text-5xl font-bold gradient-cyan text-glow-cyan mt-3 mb-2">明心見性</h2>
        <p className="text-sm text-spirit-cyan/60">Understanding emerges...</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-8 relative z-10">
        {/* Pillar of Enlightenment */}
        <div className="flex justify-center gap-4 md:gap-8 mb-32 flex-wrap">
          {pillars.map((pillar, i) => (
            <motion.div
              key={i}
              className="pillar group relative"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -10 }}
            >
              {/* Pillar glow base */}
              <motion.div
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-20 h-4 rounded-full"
                style={{ background: `${pillar.color}30`, filter: 'blur(10px)' }}
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
              />

              {/* Main pillar */}
              <div
                className="relative w-20 md:w-24 h-40 md:h-48 rounded-lg flex flex-col items-center justify-center overflow-hidden"
                style={{
                  background: `linear-gradient(180deg, ${pillar.color}15 0%, ${pillar.color}05 100%)`,
                  border: `1px solid ${pillar.color}40`,
                }}
              >
                {/* Light beam on top */}
                <div
                  className="light-beam absolute -top-8 w-px h-20"
                  style={{ background: `linear-gradient(to bottom, ${pillar.color}, transparent)` }}
                />

                {/* Hanzi */}
                <span
                  className="text-4xl md:text-5xl font-bold"
                  style={{ color: pillar.color, textShadow: `0 0 30px ${pillar.color}` }}
                >
                  {pillar.hanzi}
                </span>

                {/* Meaning */}
                <span className="text-xs text-white/60 mt-2 tracking-wider">{pillar.meaning}</span>

                {/* Chinese meaning */}
                <span className="text-xs text-white/40 mt-1">{pillar.desc}</span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Code + Visual Side by Side */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Code Panel - Ancient scroll style */}
          <div className="relative">
            <div
              className="p-8 rounded-2xl backdrop-blur-sm border border-immortal-gold/20 bg-immortal-gold/5"
              style={{
                boxShadow: '0 0 60px rgba(212, 175, 55, 0.1), inset 0 0 30px rgba(212, 175, 55, 0.05)',
              }}
            >
              {/* Corner ornaments */}
              <div className="absolute top-4 left-4 text-immortal-gold/30 text-xl">☯</div>
              <div className="absolute top-4 right-4 text-immortal-gold/30 text-xl">☯</div>

              <div className="space-y-5">
                {codeSnippets.map((snippet, i) => (
                  <motion.div
                    key={i}
                    className="code-line flex items-center gap-4"
                  >
                    <span className="text-immortal-gold/40 text-sm font-mono w-8">{i + 1}</span>
                    <code
                      className="px-4 py-3 rounded-lg text-spirit-cyan font-mono text-sm md:text-base"
                      style={{
                        background: 'rgba(0, 212, 255, 0.05)',
                        border: '1px solid rgba(0, 212, 255, 0.2)',
                        boxShadow: '0 0 20px rgba(0, 212, 255, 0.1)',
                      }}
                    >
                      {snippet.code}
                    </code>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Visual - Dao Symbol */}
          <motion.div
            className="relative flex items-center justify-center h-[300px]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {/* Outer ring */}
            <motion.div
              className="dao-symbol absolute w-64 h-64 rounded-full border-2 border-immortal-gold/40"
              style={{
                boxShadow: '0 0 50px rgba(212, 175, 55, 0.2)',
              }}
            />

            {/* Inner ring */}
            <motion.div
              className="absolute w-48 h-48 rounded-full border border-spirit-cyan/30"
              animate={{ rotate: -360 }}
              transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
            />

            {/* Center symbol */}
            <div className="text-center z-10">
              <div className="text-5xl font-bold gradient-gold text-glow-gold mb-2">道</div>
              <p className="text-sm text-spirit-cyan/60">The Way</p>
            </div>

            {/* Orbiting particles */}
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 rounded-full"
                style={{
                  background: i % 2 === 0 ? '#d4af37' : '#00d4ff',
                  boxShadow: `0 0 15px ${i % 2 === 0 ? '#d4af37' : '#00d4ff'}`,
                  transform: `rotate(${i * 60}deg) translateY(-120px)`,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8 + i * 2,
                  repeat: Infinity,
                  delay: i * -1.3,
                  ease: 'linear',
                }}
              />
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom Text */}
      <motion.div
        className="absolute bottom-20 left-8 md:left-20 right-8 md:right-20"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5 }}
      >
        <p className="text-spirit-cyan/60 text-sm md:text-base max-w-2xl leading-relaxed">
          Through stillness, clarity emerges. The path becomes visible.
          <span className="text-immortal-gold ml-2">心清則明，道自現。</span>
        </p>
      </motion.div>
    </section>
  )
}