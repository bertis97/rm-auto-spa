'use client'

import { useEffect, useRef } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import Image from 'next/image'
import type { Translations } from '@/lib/i18n'

interface HeroProps { t: Translations }

export default function Hero({ t }: HeroProps) {
  const prefersReducedMotion = useReducedMotion()
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (prefersReducedMotion) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let t = 0

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize, { passive: true })

    const particles: { x: number; y: number; r: number; vx: number; vy: number; hue: number; opacity: number }[] = []
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: Math.random() * 120 + 40,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        hue: Math.random() * 60 + 260,
        opacity: Math.random() * 0.12 + 0.03,
      })
    }

    const draw = () => {
      t += 0.005
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach((p) => {
        p.x += p.vx + Math.sin(t + p.y * 0.01) * 0.2
        p.y += p.vy + Math.cos(t + p.x * 0.01) * 0.2
        if (p.x < -p.r) p.x = canvas.width + p.r
        if (p.x > canvas.width + p.r) p.x = -p.r
        if (p.y < -p.r) p.y = canvas.height + p.r
        if (p.y > canvas.height + p.r) p.y = -p.r

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        grad.addColorStop(0, `hsla(${p.hue}, 80%, 60%, ${p.opacity})`)
        grad.addColorStop(1, 'transparent')
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [prefersReducedMotion])

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: (i: number) => ({ opacity: 1, y: 0, transition: { delay: i * 0.15, duration: 0.7, ease: 'easeOut' as const } }),
  }

  const stats = [
    { value: t.hero.stat1_value, label: t.hero.stat1_label },
    { value: t.hero.stat2_value, label: t.hero.stat2_label },
    { value: t.hero.stat3_value, label: t.hero.stat3_label },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" aria-label="Hero">
      {/* Animated background canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {/* Hero image with overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2000"
          alt="Voiture de luxe détaillée par RM AUTO SPA"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-black/70" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center pt-24 pb-12">
        {/* Badge */}
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="inline-flex items-center gap-2 glass-violet rounded-full px-4 py-2 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" aria-hidden="true" />
          <span className="text-xs sm:text-sm font-body text-violet-300 tracking-wide">{t.hero.badge}</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          custom={1}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6"
        >
          {t.hero.title}{' '}
          <span className="text-gradient-luxury italic">{t.hero.title2}</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          custom={2}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="text-base sm:text-lg md:text-xl text-white/70 font-body leading-relaxed max-w-2xl mx-auto mb-10"
        >
          {t.hero.subtitle}
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="#contact"
            className="cursor-pointer w-full sm:w-auto px-8 py-4 rounded-full bg-violet-500 hover:bg-violet-600 text-white font-semibold text-base font-body transition-all duration-200 hover:shadow-[0_0_30px_rgba(139,92,246,0.5)] min-h-[44px] flex items-center justify-center"
          >
            {t.hero.cta_primary}
          </a>
          <a
            href="#services"
            className="cursor-pointer w-full sm:w-auto px-8 py-4 rounded-full glass border border-white/20 hover:border-violet-500/50 text-white font-semibold text-base font-body transition-all duration-200 min-h-[44px] flex items-center justify-center gap-2"
          >
            {t.hero.cta_secondary}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          custom={4}
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          className="grid grid-cols-3 gap-4 sm:gap-8 mt-16 pt-8 border-t border-white/10 max-w-lg mx-auto"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-2xl sm:text-3xl font-bold text-gradient-luxury">{stat.value}</div>
              <div className="text-xs sm:text-sm text-white/50 font-body mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        aria-hidden="true"
      >
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-violet-400"
          />
        </div>
      </motion.div>
    </section>
  )
}
