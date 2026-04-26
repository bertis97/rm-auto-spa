'use client'

import { useState } from 'react'
import { getTranslations, type Locale } from '@/lib/i18n'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Services from '@/components/Services'
import BeforeAfter from '@/components/BeforeAfter'
import Gallery from '@/components/Gallery'
import QuoteForm from '@/components/QuoteForm'
import Footer from '@/components/Footer'

export default function HomePage() {
  const [locale, setLocale] = useState<Locale>('fr')
  const t = getTranslations(locale)

  return (
    <main>
      <Navbar t={t} locale={locale} onLocaleChange={setLocale} />
      <Hero t={t} />
      <Services t={t} />
      <BeforeAfter t={t} />
      <Gallery t={t} />
      <QuoteForm t={t} />
      <Footer t={t} />
    </main>
  )
}
