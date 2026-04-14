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
      // Formation circles activate
      gsap.from('.formation-circle', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'center center',
          scrub: 1,
        },
        scale: 0,
        opacity: 0,
        stagger: 0.3,
        ease: 'back.out(2)',
      })

      // Text reveals with golden light
      gsap.from('.sig-text', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'top 20%',
          scrub: 1,
        },
        y: 80,
        opacity: 0,
        stagger: 0.2,
        filter: 'blur(20px)',
      })

      // Seal stamp animation
      gsap.from('.seal-stamp', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'center center',
          end: 'bottom center',
          scrub: 1,
        },
        scale: 3,
        opacity: 0,
        rotation: -30,
      })

      // Before/After cards slide in
      gsap.from('.compare-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
        },
        x: (i) => (i === 0 ? -150 : 150),
        opacity: 0,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scene min-h-[200vh] bg-void relative overflow-hidden py-32"
    >
      {/* Background - Mystical formation pattern */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large formation circle */}
        <motion.div
          className="formation-circle absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full border border-immortal-gold/10"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
        >
          {/* Inner rings */}
          <motion.div
            className="absolute inset-10 rounded-full border border-spirit-cyan/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-20 rounded-full border border-jade-green/10"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
          />
          <motion.div
            className="absolute inset-32 rounded-full border border-blood-crimson/10"
            animate={{ rotate: -360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          />

          {/* Rune marks */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute text-immortal-gold/20 text-2xl"
              style={{
                left: '50%',
                top: '0',
                transform: `translateX(-50%) rotate(${i * 45}deg)`,
              }}
            >
              ☰
            </div>
          ))}
        </motion.div>

        {/* Energy lines connecting to center */}
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-immortal-gold/20 to-transparent"
            style={{
              top: '25%',
              left: '0',
              right: '0',
              transform: `rotate(${i * 30}deg)`,
              transformOrigin: '50% 0%',
            }}
            animate={{
              opacity: [0.1, 0.4, 0.1],
              scaleX: [0.6, 1, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Scene Title */}
      <motion.div
        className="absolute top-20 right-8 md:right-20 z-20 text-right"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <span className="text-xs uppercase tracking-[0.4em] text-immortal-gold/50">Scene 04</span>
        <h2 className="text-3xl md:text-5xl font-bold gradient-fire text-glow-gold mt-3 mb-2">獨步天下</h2>
        <p className="text-sm text-spirit-cyan/60">A unique style forged...</p>
      </motion.div>

      <div className="max-w-6xl mx-auto px-8 mt-32 relative z-10">
        {/* Main Visual - Dao Forming */}
        <div className="relative">
          {/* Central visual */}
          <motion.div
            className="relative w-full max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {/* Outer glow */}
            <motion.div
              className="absolute inset-0 rounded-3xl"
              style={{
                background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
                filter: 'blur(40px)',
              }}
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }}
              transition={{ duration: 5, repeat: Infinity }}
            />

            {/* Formation rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[400px] h-[400px] rounded-full border border-immortal-gold/20"
                animate={{ rotate: 360 }}
                transition={{ duration: 45, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[300px] h-[300px] rounded-full border border-spirit-cyan/15"
                animate={{ rotate: -360 }}
                transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
              />
              <motion.div
                className="absolute w-[200px] h-[200px] rounded-full border border-jade-green/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {/* Central symbol */}
            <div className="relative z-10 text-center py-20">
              <motion.p
                className="sig-text text-xs uppercase tracking-[0.5em] text-spirit-cyan/50 mb-6"
              >
                From Void to Form
              </motion.p>
              <motion.h3
                className="sig-text text-3xl md:text-5xl font-bold gradient-gold text-glow-gold"
              >
                混沌 → 秩序
              </motion.h3>
              <motion.p
                className="sig-text text-sm text-white/40 mt-4 tracking-wider"
              >
                Chaos → Order
              </motion.p>
            </div>
          </motion.div>

          {/* Seal stamp */}
          <motion.div
            className="seal-stamp absolute top-8 right-8 md:right-20 w-24 h-24 rounded-lg flex items-center justify-center"
            style={{
              background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)',
              border: '3px solid rgba(212, 175, 55, 0.5)',
              boxShadow: '0 0 40px rgba(212, 175, 55, 0.3)',
            }}
          >
            <span className="text-3xl font-bold text-immortal-gold">印</span>
          </motion.div>
        </div>

        {/* Before/After Comparison */}
        <div className="grid md:grid-cols-2 gap-8 mt-24">
          {/* Before - Rough draft */}
          <motion.div
            className="compare-card p-8 rounded-2xl"
            style={{
              background: 'rgba(30, 20, 50, 0.5)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-immortal-gold/30 text-2xl">✗</span>
              <span className="text-xs uppercase tracking-widest text-white/30">尋常之人</span>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-white/5 rounded w-3/4" />
              <div className="h-4 bg-white/5 rounded w-1/2" />
              <div className="h-4 bg-white/5 rounded w-2/3" />
              <div className="h-24 bg-white/5 rounded mt-6" />
              <div className="flex gap-3 mt-4">
                <div className="h-10 bg-white/5 rounded-lg w-20" />
                <div className="h-10 bg-white/5 rounded-lg w-20" />
              </div>
            </div>
            <p className="text-xs text-white/30 mt-6 font-calligraphy">— 普通之路 —</p>
          </motion.div>

          {/* After - Refined */}
          <motion.div
            className="compare-card p-8 rounded-2xl"
            style={{
              background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.1) 0%, rgba(0, 212, 255, 0.05) 100%)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 0 60px rgba(212, 175, 55, 0.1)',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-immortal-gold text-2xl">✓</span>
              <span className="text-xs uppercase tracking-widest text-immortal-gold/70">道上之人</span>
            </div>
            <div className="space-y-4">
              <div className="h-4 bg-gradient-to-r from-immortal-gold to-spirit-cyan rounded w-3/4" />
              <div className="h-4 bg-white/30 rounded w-1/2" />
              <div className="h-4 bg-white/20 rounded w-2/3" />
              <div
                className="h-24 rounded-lg mt-6"
                style={{
                  background: 'linear-gradient(135deg, rgba(212, 175, 55, 0.2) 0%, rgba(0, 212, 255, 0.1) 100%)',
                  border: '1px solid rgba(212, 175, 55, 0.2)',
                }}
              />
              <div className="flex gap-3 mt-4">
                <div
                  className="h-10 rounded-lg px-5 flex items-center justify-center text-sm font-medium"
                  style={{
                    background: 'linear-gradient(135deg, #d4af37 0%, #f5e6a3 100%)',
                    color: '#030308',
                  }}
                >
                  探索
                </div>
                <div
                  className="h-10 rounded-lg px-5 flex items-center justify-center text-sm text-white/50"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  了解更多
                </div>
              </div>
            </div>
            <p className="text-xs text-immortal-gold/50 mt-6 font-calligraphy">— 天道之路 —</p>
          </motion.div>
        </div>

        {/* Signature Quote */}
        <motion.div
          className="mt-24 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <p className="text-lg md:text-2xl text-spirit-white/80 italic max-w-3xl mx-auto leading-relaxed font-light">
            "道可道，非常道。名可名，非常名。"
          </p>
          <p className="text-sm text-immortal-gold/50 mt-4 tracking-widest">
            The dao that can be spoken is not the eternal dao.
          </p>
        </motion.div>
      </div>
    </section>
  )
}