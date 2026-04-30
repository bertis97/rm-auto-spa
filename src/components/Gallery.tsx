'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import type { Translations } from '@/lib/i18n'

interface GalleryProps { t: Translations }

const IMAGES = [
  {
    src: '/gallery/674786227_799853146325310_3500422265449239856_n.jpg',
    alt: 'Détailing RM AUTO SPA',
    span: 'col-span-2 row-span-2',
  },
  {
    src: '/gallery/675952345_2006598580732438_637542580748000600_n.jpg',
    alt: 'Traitement céramique RM AUTO SPA',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/gallery/677776354_736938149506611_8794085271221381689_n.jpg',
    alt: 'Polissage RM AUTO SPA',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/gallery/679337688_1452463609447600_6939511518132661196_n.jpg',
    alt: 'Protection peinture RM AUTO SPA',
    span: 'col-span-1 row-span-2',
  },
  {
    src: '/gallery/680148703_991923373259688_6758219384710238931_n.jpg',
    alt: 'Lavage premium RM AUTO SPA',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/gallery/672579033_939129268899312_6491529349596018458_n.jpg',
    alt: 'Détailing intérieur RM AUTO SPA',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/gallery/656970050_999764615810439_2781129092969515184_n.jpg',
    alt: 'Finition RM AUTO SPA',
    span: 'col-span-1 row-span-1',
  },
  {
    src: '/gallery/cleancover11-automobile-3669566.jpg',
    alt: 'RM AUTO SPA',
    span: 'col-span-1 row-span-1',
  },
]

export default function Gallery({ t }: GalleryProps) {
  const [lightbox, setLightbox] = useState<number | null>(null)

  return (
    <section id="gallery" className="py-24 lg:py-32 bg-black" aria-label="Galerie">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <span className="inline-block glass-violet rounded-full px-4 py-1.5 text-xs font-body text-violet-300 tracking-widest uppercase mb-4">
            {t.gallery.badge}
          </span>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
            {t.gallery.title}{' '}
            <span className="text-gradient-luxury italic">{t.gallery.title2}</span>
          </h2>
          <p className="text-white/60 font-body text-base sm:text-lg max-w-xl mx-auto">{t.gallery.subtitle}</p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 auto-rows-[200px] sm:auto-rows-[220px] gap-3">
          {IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => setLightbox(i)}
              className={`${img.span} relative overflow-hidden rounded-xl group cursor-pointer focus-visible:ring-2 focus-visible:ring-violet-500`}
              aria-label={`Voir l'image: ${img.alt}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </motion.button>
          ))}
        </div>
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
              className="relative w-full max-w-4xl aspect-video"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[lightbox].src}
                alt={IMAGES[lightbox].alt}
                fill
                className="object-contain"
                sizes="90vw"
              />
            </motion.div>

            {/* Close */}
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Fermer"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Nav arrows */}
            {lightbox > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox - 1) }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Image précédente"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            {lightbox < IMAGES.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightbox(lightbox + 1) }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 glass rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-colors cursor-pointer"
                aria-label="Image suivante"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 glass rounded-full px-3 py-1 text-sm text-white/70 font-body">
              {lightbox + 1} / {IMAGES.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
