'use client'

import { useEffect, useState, useRef } from 'react'
import Intro from '@/components/Intro'
import SceneChaos from '@/components/SceneChaos'
import SceneUnderstanding from '@/components/SceneUnderstanding'
import SceneMastery from '@/components/SceneMastery'
import SceneSignature from '@/components/SceneSignature'
import SceneEnding from '@/components/SceneEnding'
import CustomCursor from '@/components/CustomCursor'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Mark as loaded after initial render
    const timer = setTimeout(() => setIsLoaded(true), 100)

    // Setup scroll animations
    gsap.config({ nullTargetWarn: false })

    return () => clearTimeout(timer)
  }, [])

  return (
    <main ref={containerRef} className="relative bg-dark-900">
      <CustomCursor />
      
      {/* Intro - Cold Open */}
      <Intro />

      {/* Scene 1 - Chaos */}
      <SceneChaos />

      {/* Scene 2 - Understanding */}
      <SceneUnderstanding />

      {/* Scene 3 - Mastery */}
      <SceneMastery />

      {/* Scene 4 - Signature */}
      <SceneSignature />

      {/* Scene 5 - Ending */}
      <SceneEnding />

      {/* Progress Indicator */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col gap-2">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="w-1 h-4 bg-dark-700 rounded-full overflow-hidden"
          >
            <div
              className="w-full h-0 bg-accent-purple transition-all duration-300"
              id={`progress-${i}`}
            />
          </div>
        ))}
      </div>
    </main>
  )
}