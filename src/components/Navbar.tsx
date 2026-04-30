'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Translations, Locale } from '@/lib/i18n'

interface NavbarProps {
  t: Translations
  locale: Locale
  onLocaleChange: (l: Locale) => void
}

export default function Navbar({ t, locale, onLocaleChange }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { href: '#services', label: t.nav.services },
    { href: '#gallery', label: t.nav.gallery },
    { href: '#contact', label: t.nav.contact },
  ]

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass border-b border-white/5 py-3' : 'py-5 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-full bg-gradient-luxury flex items-center justify-center flex-shrink-0">
              <span className="text-white font-display font-bold text-sm">RM</span>
            </div>
            <div className="leading-tight">
              <span className="block font-display font-bold text-white text-lg leading-none">RM AUTO</span>
              <span className="block text-xs font-body tracking-[0.2em] text-gradient-luxury uppercase">SPA</span>
            </div>
          </a>

          {/* Desktop links */}
          <div className="hidden lg:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-200 font-body"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <button
              onClick={() => onLocaleChange(locale === 'fr' ? 'en' : 'fr')}
              className="text-sm text-white/60 hover:text-white transition-colors cursor-pointer font-body px-2 py-1 rounded border border-white/10 hover:border-white/30"
              aria-label="Switch language"
            >
              {locale === 'fr' ? 'EN' : 'FR'}
            </button>
            <a
              href="#contact"
              className="cursor-pointer px-5 py-2.5 rounded-full text-sm font-semibold bg-violet-500 hover:bg-violet-600 text-white transition-colors duration-200 font-body"
            >
              {t.nav.quote}
            </a>
          </div>

          {/* Mobile burger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 cursor-pointer"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
          >
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center gap-8"
          >
            {links.map((link, i) => (
              <motion.a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                className="text-3xl font-display font-semibold text-white hover:text-gradient-luxury transition-all cursor-pointer"
              >
                {link.label}
              </motion.a>
            ))}
            <div className="flex items-center gap-4 mt-4">
              <button
                onClick={() => { onLocaleChange(locale === 'fr' ? 'en' : 'fr'); setIsOpen(false) }}
                className="text-white/60 hover:text-white border border-white/20 rounded px-3 py-1 text-sm cursor-pointer"
              >
                {locale === 'fr' ? 'English' : 'Français'}
              </button>
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="px-6 py-3 rounded-full bg-violet-500 text-white font-semibold text-base cursor-pointer"
              >
                {t.nav.quote}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
