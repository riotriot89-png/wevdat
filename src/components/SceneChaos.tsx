'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, gsap } from 'framer-motion'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const chaosElements = [
  { id: 1, text: 'div', x: 10, y: 20, rotation: 15, color: '#8b5cf6' },
  { id: 2, text: 'flex', x: 70, y: 30, rotation: -20, color: '#06b6d4' },
  { id: 3, text: 'padding', x: 20, y: 60, rotation: 25, color: '#f43f5e' },
  { id: 4, text: 'margin', x: 60, y: 70, rotation: -10, color: '#8b5cf6' },
  { id: 5, text: 'className', x: 40, y: 40, rotation: 30, color: '#06b6d4' },
  { id: 6, text: 'const', x: 80, y: 50, rotation: -25, color: '#f43f5e' },
  { id: 7, text: 'export', x: 15, y: 75, rotation: 10, color: '#8b5cf6' },
  { id: 8, text: 'return', x: 55, y: 15, rotation: -15, color: '#06b6d4' },
  { id: 9, text: 'useState', x: 35, y: 85, rotation: 20, color: '#f43f5e' },
  { id: 10, text: 'function', x: 75, y: 85, rotation: -30, color: '#8b5cf6' },
  { id: 11, text: 'async', x: 25, y: 45, rotation: 35, color: '#06b6d4' },
  { id: 12, text: 'await', x: 85, y: 25, rotation: -5, color: '#f43f5e' },
]

export default function SceneChaos() {
  const sectionRef = useRef<HTMLElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>([])

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 50, damping: 10 })
  const springY = useSpring(mouseY, { stiffness: 50, damping: 10 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30
      const y = (e.clientY / window.innerHeight - 0.5) * 30
      mouseX.set(x)
      mouseY.set(y)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  // Scroll animation - chaos breaks into particles
  useEffect(() => {
    if (!sectionRef.current || !containerRef.current) return

    const ctx = gsap.context(() => {
      // Elements float around initially
      gsap.to('.chaos-element', {
        y: 'random(-20, 20)',
        x: 'random(-10, 10)',
        rotation: 'random(-45, 45)',
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: {
          each: 0.1,
          from: 'random',
        },
      })

      // On scroll - chaos explodes into particles
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress

          if (progress > 0.3 && particles.length === 0) {
            // Create particles from chaos elements
            const newParticles = chaosElements.map((el, i) => ({
              id: i,
              x: el.x * 10,
              y: el.y * 5,
              vx: (Math.random() - 0.5) * 20,
              vy: (Math.random() - 0.5) * 20,
            }))
            setParticles(newParticles)
          }

          // Fade out chaos elements
          gsap.to('.chaos-element', {
            opacity: 1 - progress,
            scale: 1 - progress * 0.5,
            stagger: 0.02,
          })

          // Particles explode
          gsap.to('.chaos-particle', {
            x: 'random(-500, 500)',
            y: 'random(-500, 500)',
            opacity: 0,
            duration: 1.5,
            stagger: 0.01,
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [particles.length])

  return (
    <section
      ref={sectionRef}
      className="scene min-h-[150vh] bg-dark-900 relative flex items-center justify-center overflow-hidden"
    >
      {/* Scene Title */}
      <motion.div
        className="absolute top-20 left-8 md:left-20 z-20"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scene 01</span>
        <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">Hỗn Loạn</h2>
        <p className="text-sm text-gray-400 mt-1">Where everything begins...</p>
      </motion.div>

      {/* Chaos Container */}
      <motion.div
        ref={containerRef}
        className="relative w-full max-w-4xl h-[600px]"
        style={{ x: springX, y: springY }}
      >
        {/* Floating Code Elements */}
        {chaosElements.map((el) => (
          <motion.div
            key={el.id}
            className="chaos-element absolute px-4 py-2 rounded-lg font-mono text-sm cursor-default"
            style={{
              left: `${el.x}%`,
              top: `${el.y}%`,
              background: `${el.color}20`,
              border: `1px solid ${el.color}40`,
              color: el.color,
              transform: `rotate(${el.rotation}deg)`,
              boxShadow: `0 0 20px ${el.color}30`,
            }}
            whileHover={{
              scale: 1.1,
              boxShadow: `0 0 40px ${el.color}50`,
            }}
          >
            {el.text}
          </motion.div>
        ))}

        {/* Glitch Lines */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          animate={{
            background: [
              'linear-gradient(transparent 0%, rgba(139, 92, 246, 0.03) 50%, transparent 100%)',
              'linear-gradient(transparent 0%, rgba(6, 182, 212, 0.03) 50%, transparent 100%)',
              'linear-gradient(transparent 0%, rgba(244, 63, 94, 0.03) 50%, transparent 100%)',
            ],
          }}
          transition={{ duration: 3, repeat: Infinity }}
        />

        {/* Particles that explode */}
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="chaos-particle absolute w-2 h-2 rounded-full"
            style={{
              left: p.x,
              top: p.y,
              background: chaosElements[p.id % chaosElements.length].color,
              boxShadow: `0 0 10px ${chaosElements[p.id % chaosElements.length].color}`,
            }}
          />
        ))}
      </motion.div>

      {/* Description */}
      <motion.div
        className="absolute bottom-20 left-8 md:left-20 right-8 md:right-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <p className="text-gray-400 text-sm md:text-base max-w-xl">
          Mọi thứ bắt đầu với sự hỗn loạn. Những dòng code, những ý tưởng, 
          những thử nghiệm... tất cả đều cần một người để sắp xếp.
        </p>
      </motion.div>
    </section>
  )
}
