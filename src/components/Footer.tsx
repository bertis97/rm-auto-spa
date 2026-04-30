'use client'

import { motion } from 'framer-motion'
import type { Translations } from '@/lib/i18n'

interface FooterProps { t: Translations }

export default function Footer({ t }: FooterProps) {
  const f = t.footer
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black border-t border-white/5 py-16" aria-label="Pied de page">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 mb-12"
        >
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-luxury flex items-center justify-center flex-shrink-0">
                <span className="text-white font-display font-bold text-sm">RM</span>
              </div>
              <div className="leading-tight">
                <span className="block font-display font-bold text-white text-lg leading-none">RM AUTO</span>
                <span className="block text-xs font-body tracking-[0.2em] text-gradient-luxury uppercase">SPA</span>
              </div>
            </div>
            <p className="text-white/50 font-body text-sm leading-relaxed max-w-xs">{f.tagline}</p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4 text-sm tracking-wide uppercase">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-white/50 font-body text-sm">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                {f.address}
              </li>
              <li>
                <a href={`tel:${f.phone.replace(/\D/g, '')}`} className="flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors cursor-pointer">
                  <svg className="w-4 h-4 flex-shrink-0 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  {f.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${f.email}`} className="flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors cursor-pointer">
                  <svg className="w-4 h-4 flex-shrink-0 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  {f.email}
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com/share/1B6gXz1wBz/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-white/50 hover:text-white font-body text-sm transition-colors cursor-pointer">
                  <svg className="w-4 h-4 flex-shrink-0 text-violet-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                  Facebook
                </a>
              </li>
            </ul>
          </div>

          {/* CTA */}
          <div>
            <h3 className="font-display text-white font-semibold mb-4 text-sm tracking-wide uppercase">Devis gratuit</h3>
            <a href="#contact"
              className="inline-block cursor-pointer px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-600 text-white font-semibold font-body text-sm transition-colors duration-200 min-h-[44px] flex items-center">
              Réserver →
            </a>
          </div>
        </motion.div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/25 font-body text-xs">© {year} RM AUTO SPA. {f.rights}</p>
          <div className="flex gap-4">
            <a href="#" className="text-white/25 hover:text-white/60 font-body text-xs transition-colors cursor-pointer">{f.links.privacy}</a>
            <a href="#" className="text-white/25 hover:text-white/60 font-body text-xs transition-colors cursor-pointer">{f.links.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
