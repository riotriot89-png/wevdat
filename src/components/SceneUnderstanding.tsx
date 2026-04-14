'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const gridItems = [
  { icon: '◉', title: 'Layout', desc: 'Cấu trúc hoàn hảo', col: 1 },
  { icon: '◇', title: 'Spacing', desc: 'Khoảng cách hài hòa', col: 2 },
  { icon: '○', title: 'Color', desc: 'Bảng màu nhất quán', col: 3 },
  { icon: '▢', title: 'Typography', desc: 'Chữ viết có ngữ điệu', col: 4 },
  { icon: '△', title: 'Motion', desc: 'Chuyển động có mục đích', col: 5 },
  { icon: '☆', title: 'Focus', desc: 'Tập trung vào nội dung', col: 6 },
]

const codeSnippets = [
  { code: 'display: grid', y: 0 },
  { code: 'gap: 24px', y: 60 },
  { code: 'align-items: center', y: 120 },
  { code: 'justify-content: center', y: 180 },
]

export default function SceneUnderstanding() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Grid items snap into place with stagger
      gsap.from('.grid-item', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'center center',
          scrub: 1,
        },
        y: 100,
        opacity: 0,
        scale: 0.8,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      })

      // Code snippets appear sequentially
      gsap.from('.code-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          end: 'bottom 80%',
          scrub: 1,
        },
        x: -100,
        opacity: 0,
        stagger: 0.15,
      })

      // Grid lines draw themselves
      gsap.from('.grid-line', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          end: 'top 30%',
          scrub: 1,
        },
        scaleX: 0,
        transformOrigin: 'left center',
        stagger: 0.1,
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
        <span className="text-xs uppercase tracking-[0.3em] text-gray-500">Scene 02</span>
        <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">Hiểu Biết</h2>
        <p className="text-sm text-gray-400 mt-1">Structure emerges from chaos...</p>
      </motion.div>

      {/* Background Grid Lines */}
      <div className="absolute inset-0 opacity-10">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="grid-line absolute h-px bg-gradient-to-r from-transparent via-accent-purple to-transparent"
            style={{
              top: `${20 + i * 12}%`,
              left: '10%',
              right: '10%',
              width: '80%',
            }}
          />
        ))}
        {[...Array(8)].map((_, i) => (
          <div
            key={`v-${i}`}
            className="grid-line absolute w-px bg-gradient-to-b from-transparent via-accent-cyan to-transparent"
            style={{
              left: `${10 + i * 11}%`,
              top: '10%',
              bottom: '10%',
              height: '80%',
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-8">
        {/* Grid Items */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-32">
          {gridItems.map((item, i) => (
            <motion.div
              key={i}
              className="grid-item p-6 rounded-2xl bg-dark-800/50 backdrop-blur-sm border border-dark-700 hover:border-accent-purple/50 transition-colors"
              whileHover={{ scale: 1.02, borderColor: 'rgba(139, 92, 246, 0.5)' }}
            >
              <span className="text-3xl text-accent-purple mb-4 block">{item.icon}</span>
              <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
              <p className="text-sm text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Code + Visual Side by Side */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Code Panel */}
          <div className="space-y-4">
            {codeSnippets.map((snippet, i) => (
              <motion.div
                key={i}
                className="code-line flex items-center gap-4"
              >
                <span className="text-gray-600 text-sm font-mono w-8">{i + 1}</span>
                <code className="px-4 py-2 rounded-lg bg-dark-800 text-accent-cyan font-mono text-sm">
                  {snippet.code}
                </code>
              </motion.div>
            ))}
          </div>

          {/* Visual Grid Demo */}
          <motion.div
            className="grid grid-cols-3 gap-4 p-8 rounded-2xl bg-dark-800/30 border border-dark-700"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            {[...Array(9)].map((_, i) => (
              <motion.div
                key={i}
                className="aspect-square rounded-xl bg-gradient-to-br from-accent-purple/20 to-accent-cyan/20 border border-accent-purple/20"
                animate={{
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </motion.div>
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
          Dần dần, những thứ lộn xộn tìm được vị trí của chúng. 
          Hệ thống hình thành, và mọi thứ bắt đầu có ý nghĩa.
        </p>
      </motion.div>
    </section>
  )
}
