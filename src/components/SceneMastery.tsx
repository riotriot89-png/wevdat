'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    title: 'E-Commerce Platform',
    desc: 'Full-stack shopping experience with real-time inventory',
    tags: ['React', 'Node.js', 'PostgreSQL'],
    color: '#8b5cf6',
    position: { x: -30, y: -20 },
  },
  {
    title: 'AI Dashboard',
    desc: 'Real-time analytics with machine learning insights',
    tags: ['Next.js', 'Python', 'TensorFlow'],
    color: '#06b6d4',
    position: { x: 30, y: 10 },
  },
  {
    title: 'Social App',
    desc: 'Community platform with live features',
    tags: ['React Native', 'Firebase', 'WebSocket'],
    color: '#f43f5e',
    position: { x: 0, y: 30 },
  },
]

export default function SceneMastery() {
  const sectionRef = useRef<HTMLElement>(null)
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springX = useSpring(mouseX, { stiffness: 30, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 30, damping: 20 })

  useEffect(() => {
    if (!sectionRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 20)
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 20)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Panels slide in from different directions
      projects.forEach((_, i) => {
        gsap.from(`.project-panel-${i}`, {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            end: 'top 20%',
            scrub: 1,
          },
          x: i === 0 ? -200 : i === 2 ? 200 : 0,
          y: 100,
          rotation: i === 0 ? -10 : i === 2 ? 10 : 15,
          opacity: 0,
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="scene min-h-[200vh] bg-dark-900 relative overflow-hidden py-32"
    >
      {/* Scene Title */}
      <motion.div
        className="absolute top-20 left-8 md:left-20 z-20"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scene 03</span>
        <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">Làm Chủ</h2>
        <p className="text-sm text-gray-400 mt-1">Projects that speak volumes...</p>
      </motion.div>

      {/* 3D Container */}
      <div className="relative h-[800px] flex items-center justify-center">
        <motion.div
          className="relative w-full max-w-6xl h-full"
          style={{ x: springX, y: springY }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className={`project-panel-${i} absolute w-80 md:w-96 p-6 rounded-2xl backdrop-blur-md transition-all duration-500`}
              style={{
                left: `calc(50% + ${project.position.x}%)`,
                top: `calc(40% + ${project.position.y}%)`,
                transform: 'translate(-50%, -50%)',
                background: `${project.color}15`,
                border: `1px solid ${project.color}40`,
                boxShadow: `0 20px 60px ${project.color}20`,
                zIndex: hoveredIndex === i ? 10 : i + 1,
              }}
              onHoverStart={() => setHoveredIndex(i)}
              onHoverEnd={() => setHoveredIndex(null)}
              animate={{
                scale: hoveredIndex === i ? 1.1 : 1,
                rotateZ: hoveredIndex === i ? 0 : project.position.x * 0.1,
              }}
              whileInView={{ opacity: 1 }}
            >
              {/* Project Header */}
              <div className="flex items-start justify-between mb-4">
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                  style={{ background: `${project.color}30` }}
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

              {/* Project Info */}
              <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
              <p className="text-gray-400 text-sm mb-4">{project.desc}</p>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, j) => (
                  <span
                    key={j}
                    className="text-xs px-2 py-1 rounded-md bg-dark-800 text-gray-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Glow Effect on Hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredIndex === i ? 1 : 0 }}
                style={{
                  boxShadow: `inset 0 0 30px ${project.color}30`,
                }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Depth Lines */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-1/2 top-1/2 w-px bg-gradient-to-b from-transparent via-accent-purple/20 to-transparent"
              style={{
                height: `${30 + i * 20}%`,
                transform: 'translate(-50%, -50%)',
              }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
      </div>

      {/* Bottom Text */}
      <motion.div
        className="absolute bottom-20 left-8 md:left-20 right-8 md:right-20"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="text-gray-400 text-sm md:text-base max-w-xl">
          Những dự án không chỉ là code. Chúng là câu chuyện về cách giải quyết vấn đề, 
          về sự sáng tạo, và về việc biến ý tưởng thành hiện thực.
        </p>
      </motion.div>
    </section>
  )
}
