import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://rmautospa.ca'),
  title: {
    default: 'RM AUTO SPA | Détailing Automobile Premium – Québec',
    template: '%s | RM AUTO SPA',
  },
  description: 'RM AUTO SPA – Détailing automobile haut de gamme à Québec. Polissage, protection céramique, PPF, intérieur. Résultats garantis. Devis gratuit en 24h.',
  keywords: ['détailing automobile', 'polissage voiture', 'céramique auto', 'PPF Québec', 'car detailing Quebec', 'lavage auto premium'],
  openGraph: {
    title: 'RM AUTO SPA | Détailing Automobile Premium',
    description: 'Détailing automobile haut de gamme à Québec — polissage, céramique, PPF.',
    type: 'website',
    locale: 'fr_CA',
    alternateLocale: 'en_CA',
    siteName: 'RM AUTO SPA',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'RM AUTO SPA' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'RM AUTO SPA | Détailing Premium',
    description: 'Détailing automobile haut de gamme à Québec.',
  },
  robots: { index: true, follow: true },
  alternates: {
    canonical: 'https://rmautospa.ca',
    languages: {
      'fr-CA': 'https://rmautospa.ca',
      'en-CA': 'https://rmautospa.ca/en',
    },
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://rmautospa.ca',
  name: 'RM AUTO SPA',
  description: 'Détailing automobile haut de gamme à Québec',
  url: 'https://rmautospa.ca',
  telephone: '+15140000000',
  email: 'contact@rmautospa.ca',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Québec',
    addressRegion: 'QC',
    addressCountry: 'CA',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: 46.8139,
    longitude: -71.2082,
  },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '08:00',
      closes: '18:00',
    },
  ],
  priceRange: '$$',
  image: 'https://rmautospa.ca/og-image.jpg',
  sameAs: [],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Services de détailing',
    itemListElement: [
      { '@type': 'Offer', name: 'Polissage & Correction', priceCurrency: 'CAD', price: '299' },
      { '@type': 'Offer', name: 'Protection Céramique', priceCurrency: 'CAD', price: '599' },
      { '@type': 'Offer', name: 'Détailing Intérieur', priceCurrency: 'CAD', price: '149' },
      { '@type': 'Offer', name: 'Lavage Premium', priceCurrency: 'CAD', price: '79' },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  )
}
