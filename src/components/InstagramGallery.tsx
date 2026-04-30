'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Translations } from '@/lib/i18n'
import type { InstagramPost } from '@/app/api/instagram/route'

interface InstagramGalleryProps { t: Translations }

const PLACEHOLDER_IMAGES = [
  { src: '/gallery/674786227_799853146325310_3500422265449239856_n.jpg', alt: 'Détailing RM AUTO SPA' },
  { src: '/gallery/675952345_2006598580732438_637542580748000600_n.jpg', alt: 'Traitement céramique RM AUTO SPA' },
  { src: '/gallery/677776354_736938149506611_8794085271221381689_n.jpg', alt: 'Polissage RM AUTO SPA' },
  { src: '/gallery/679337688_1452463609447600_6939511518132661196_n.jpg', alt: 'Protection peinture RM AUTO SPA' },
  { src: '/gallery/680148703_991923373259688_6758219384710238931_n.jpg', alt: 'Lavage premium RM AUTO SPA' },
  { src: '/gallery/672579033_939129268899312_6491529349596018458_n.jpg', alt: 'Détailing intérieur RM AUTO SPA' },
  { src: '/gallery/656970050_999764615810439_2781129092969515184_n.jpg', alt: 'Finition RM AUTO SPA' },
  { src: '/gallery/cleancover11-automobile-3669566.jpg', alt: 'RM AUTO SPA' },
]

type LightboxItem = { src: string; alt: string; href?: string }

export default function InstagramGallery({ t }: InstagramGalleryProps) {
  const [posts, setPosts] = useState<InstagramPost[]>([])
  const [loading, setLoading] = useState(true)
  const [hasToken, setHasToken] = useState(false)
  const [lightbox, setLightbox] = useState<number | null>(null)

  useEffect(() => {
    fetch('/api/instagram')
      .then((r) => r.json())
      .then((data) => {
        if (data.posts?.length > 0) {
          setPosts(data.posts)
          setHasToken(true)
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  const items: LightboxItem[] = hasToken
    ? posts.map((p) => ({
        src: p.thumbnail_url ?? p.media_url,
        alt: p.caption?.slice(0, 80) ?? 'RM AUTO SPA',
        href: p.permalink,
      }))
    : PLACEHOLDER_IMAGES.map((p) => ({ src: p.src, alt: p.alt }))

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-black" aria-label="Galerie Instagram">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 glass-violet rounded-full px-4 py-1.5 text-xs font-body text-violet-300 tracking-widest uppercase mb-4">
            {/* Instagram icon */}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            {t.gallery.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.gallery.title}{' '}
            <span className="text-gradient-luxury italic">{t.gallery.title2}</span>
          </h2>
          <p className="text-white/60 font-body text-base sm:text-lg max-w-xl mx-auto mb-2">{t.gallery.subtitle}</p>

          {/* Instagram follow link */}
          <a
            href="https://www.instagram.com/rmauto_spa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-violet-400 hover:text-violet-300 font-body text-sm transition-colors cursor-pointer mt-1"
          >
            @rmauto_spa
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>

        {/* Grid */}
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[220px] gap-3">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className={`rounded-xl bg-white/5 animate-pulse ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[220px] gap-3">
            {items.slice(0, 9).map((item, i) => {
              const span =
                i === 0 ? 'col-span-2 row-span-2' :
                i === 3 ? 'col-span-1 row-span-2' : ''
              return (
                <motion.button
                  key={item.src + i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  onClick={() => setLightbox(i)}
                  className={`${span} relative overflow-hidden rounded-xl group cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500`}
                  aria-label={`Voir la photo: ${item.alt}`}
                >
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    loading={i < 3 ? 'eager' : 'lazy'}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex flex-col items-center justify-center gap-2">
                    <svg
                      className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                    {hasToken && item.href && (
                      <span className="text-xs text-white/80 opacity-0 group-hover:opacity-100 transition-opacity font-body">
                        Voir sur Instagram
                      </span>
                    )}
                  </div>
                </motion.button>
              )
            })}
          </div>
        )}

        {/* Instagram CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mt-10"
        >
          <a
            href="https://www.instagram.com/rmauto_spa/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 cursor-pointer px-7 py-3.5 rounded-full glass border border-white/15 hover:border-violet-500/50 text-white font-body font-semibold text-sm transition-all duration-200 min-h-[44px]"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
            Suivre @rmauto_spa
          </a>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
            role="dialog"
            aria-modal="true"
            aria-label="Image agrandie"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative w-full max-w-3xl aspect-square sm:aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={items[lightbox].src}
                alt={items[lightbox].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            <button onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fermer">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {lightbox > 0 && (
              <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Photo précédente">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {lightbox < items.length - 1 && (
              <button onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Photo suivante">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {hasToken && items[lightbox].href && (
              <a href={items[lightbox].href} target="_blank" rel="noopener noreferrer"
                className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-4 py-2 text-sm text-white/70 hover:text-white font-body transition-colors cursor-pointer"
                onClick={(e) => e.stopPropagation()}>
                Voir sur Instagram →
              </a>
            )}

            <div className="absolute bottom-4 right-4 glass rounded-full px-3 py-1 text-sm text-white/50 font-body">
              {lightbox + 1} / {items.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
