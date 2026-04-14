'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'E-Commerce Platform',
    desc: 'Full-stack shopping experience with real-time inventory',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    hanzi: '商',
    color: '#d4af37',
    position: { x: -30, y: -20 },
  },
  {
    title: 'AI Dashboard',
    desc: 'Real-time analytics with machine learning insights',
    tags: ['Next.js', 'Python', 'TensorFlow'],
    hanzi: '智',
    color: '#00d4ff',
    position: { x: 30, y: 10 },
  },
  {
    title: 'Social App',
    desc: 'Community platform with live features',
    tags: ['React Native', 'Firebase', 'WebSocket'],
    hanzi: '通',
    color: '#8b0000',
    position: { x: 0, y: 30 },
  },
]

export default function SceneMastery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Panels slide in from sides like swords
      projects.forEach((_, i) => {
        gsap.from(`.mastery-panel-${i}`, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1,
          },
          x: i === 0 ? -300 : i === 2 ? 300 : 0,
          y: 150,
          rotation: i === 0 ? -15 : i === 2 ? 15 : 20,
          opacity: 0,
          ease: 'back.out(1.2)',
        })
      })

      // Golden qi flowing effect
      gsap.to('.qi-flow', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 50%',
          end: 'bottom 50%',
          scrub: 1,
        },
        strokeDashoffset: 0,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scene min-h-[250vh] bg-void relative overflow-hidden py-32"
    >
      {/* Background - Golden energy streams */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Diagonal energy lines */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-px h-[200vh] bg-gradient-to-b from-immortal-gold/20 via-immortal-gold/5 to-transparent"
            style={{
              left: `${20 + i * 20}%`,
              transform: 'rotate(-30deg)',
              transformOrigin: 'top center',
            }}
            animate={{
              opacity: [0.2, 0.5, 0.2],
              y: [-100, 0, -100],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              delay: i * 1.5,
            }}
          />
        ))}

        {/* Central glow */}
        <motion.div
          className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.15) 0%, transparent 60%)',
            filter: 'blur(60px)',
          }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
      </div>

      {/* Scene Title */}
      <motion.div
        className="absolute top-20 left-8 md:left-20 z-20"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5 }}
      >
        <span className="text-xs uppercase tracking-[0.4em] text-immortal-gold/50">Scene 03</span>
        <h2 className="text-3xl md:text-5xl font-bold gradient-gold text-glow-gold mt-3 mb-2">炉火純青</h2>
        <p className="text-sm text-spirit-cyan/60">Skills refined through years...</p>
      </motion.div>

      {/* 3D Project Cards - Floating like cultivation artifacts */}
      <div className="relative h-[900px] flex items-center justify-center">
        <motion.div
          className="relative w-full max-w-7xl h-full"
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className={`mastery-panel-${i} absolute w-80 md:w-96 p-8 rounded-2xl transition-all duration-500`}
              style={{
                left: `calc(50% + ${project.position.x}%)`,
                top: `calc(35% + ${project.position.y}%)`,
                transform: 'translate(-50%, -50%)',
                background: `linear-gradient(135deg, ${project.color}10 0%, ${project.color}05 100%)`,
                border: `1px solid ${project.color}40`,
                boxShadow: `0 20px 80px ${project.color}20, 0 0 40px ${project.color}10`,
                zIndex: hoveredIndex === i ? 10 : i + 1,
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                scale: hoveredIndex === i ? 1.15 : 1,
                rotateZ: hoveredIndex === i ? 0 : project.position.x * 0.15,
              }}
              whileInView={{ opacity: 1 }}
            >
              {/* Hanzi badge */}
              <div
                className="absolute -top-6 left-8 w-16 h-16 rounded-xl flex items-center justify-center text-3xl font-bold"
                style={{
                  background: `${project.color}20`,
                  border: `1px solid ${project.color}40`,
                  color: project.color,
                  textShadow: `0 0 20px ${project.color}`,
                }}
              >
                {project.hanzi}
              </div>

              {/* Project header */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className="w-14 h-14 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${project.color}25` }}
                >
                  {i === 0 ? '◉' : i === 1 ? '◆' : '◇'}
                </div>
                <span
                  className="text-xs px-3 py-1 rounded-full"
                  style={{
                    background: `${project.color}20`,
                    color: project.color,
                  }}
                >
                  {i + 1}
                </span>
              </div>

              {/* Project info */}
              <h3 className="text-xl font-bold text-white mb-3">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">{project.desc}</p>

              {/* Tags - cultivation levels */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs px-3 py-1 rounded-md"
                    style={{
                      background: 'rgba(0, 0, 0, 0.4)',
                      border: `1px solid ${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Inner glow on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                style={{
                  boxShadow: `inset 0 0 50px ${project.color}30`,
                }}
              />

              {/* Orbiting energy */}
              <motion.div
                className="absolute -inset-2 rounded-2xl border border-dashed"
                style={{ borderColor: `${project.color}20` }}
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Depth lines - spiritual threads */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 w-px bg-gradient-to-b from-transparent via-immortal-gold/10 to-transparent"
              style={{
                height: `${40 + i * 15}%`,
                transform: `translate(-50%, -50%) rotate(${i * 22.5}deg)`,
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.4,
              }}
            />
          ))}
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
          Each project is a cultivation step. Each line of code, a meditation.
          <span className="text-immortal-gold ml-2">千錘百鍊，方成大道。</span>
        </p>
      </motion.div>
    </section>
  )
}