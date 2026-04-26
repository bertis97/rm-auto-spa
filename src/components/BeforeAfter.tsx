'use client'

import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import type { Translations } from '@/lib/i18n'

interface BeforeAfterProps { t: Translations }

export default function BeforeAfter({ t }: BeforeAfterProps) {
  const [position, setPosition] = useState(50)
  const [isDragging, setIsDragging] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const getPercent = useCallback((clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return 50
    return Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100))
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging) return
    setPosition(getPercent(e.clientX))
  }, [isDragging, getPercent])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    e.preventDefault()
    setPosition(getPercent(e.touches[0].clientX))
  }, [getPercent])

  return (
    <section id="before-after" className="py-24 lg:py-32 bg-zinc-950" aria-label="Avant Après">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block glass-violet rounded-full px-4 py-1.5 text-xs font-body text-violet-300 tracking-widest uppercase mb-4">
            {t.before_after.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.before_after.title}{' '}
            <span className="text-gradient-luxury italic">{t.before_after.title2}</span>
          </h2>
          <p className="text-white/60 font-body text-base sm:text-lg max-w-xl mx-auto">{t.before_after.subtitle}</p>
        </motion.div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8 }}
          ref={containerRef}
          className="relative rounded-2xl overflow-hidden select-none cursor-col-resize aspect-[16/9] sm:aspect-[16/8]"
          onMouseDown={() => setIsDragging(true)}
          onMouseUp={() => setIsDragging(false)}
          onMouseLeave={() => setIsDragging(false)}
          onMouseMove={handleMouseMove}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
          onTouchMove={handleTouchMove}
          role="img"
          aria-label="Comparaison avant et après le polissage"
        >
          {/* After image (base) */}
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?q=80&w=2000"
              alt="Voiture après polissage RM AUTO SPA"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
            <div className="absolute top-4 right-4 glass rounded-full px-3 py-1.5 text-xs font-body font-semibold text-white tracking-wider uppercase">
              {t.before_after.after}
            </div>
          </div>

          {/* Before image (clipped) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
          >
            <Image
              src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?q=80&w=2000"
              alt="Voiture avant polissage RM AUTO SPA"
              fill
              sizes="(max-width: 768px) 100vw, 80vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 glass rounded-full px-3 py-1.5 text-xs font-body font-semibold text-white tracking-wider uppercase">
              {t.before_after.before}
            </div>
          </div>

          {/* Divider line */}
          <div
            className="absolute top-0 bottom-0 w-0.5 bg-white z-10 pointer-events-none"
            style={{ left: `${position}%` }}
            aria-hidden="true"
          >
            {/* Handle */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white shadow-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-3 3 3 3M16 9l3 3-3 3" />
              </svg>
            </div>
          </div>
        </motion.div>

        {/* Hint */}
        <p className="text-center text-white/30 text-xs font-body mt-4">
          {/* Drag / Glisser */}
          ← Glissez pour comparer / Drag to compare →
        </p>
      </div>
    </section>
  )
}
