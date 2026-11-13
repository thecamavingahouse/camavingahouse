import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import { salons } from '@/lib/salons'
import { siteUrl } from '@/lib/site-url'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The Camavinga House — Barbershop Rennes & Madrid',
    template: '%s | The Camavinga House',
  },
  description:
    'Réservez votre coupe ou votre soin de barbe à Rennes, Madrid Chamberí ou Arroyomolinos. Tarifs, horaires et accès à chaque salon.',
  keywords: [
    'barbershop rennes',
    'barbershop madrid',
    'camavinga house',
    'the camavinga house',
    'barber rennes',
    'barbier rennes',
    'coiffeur homme rennes',
    'barberia madrid',
    'coupe homme rennes',
    'barbe rennes',
    'salon coiffure homme rennes',
    'meilleur barbier rennes',
    'barbershop haut de gamme',
    'camavinga barber',
    'coupe vip rennes',
  ],
  authors: [{ name: 'The Camavinga House' }],
  creator: 'The Camavinga House',
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    alternateLocale: 'es_ES',
    url: './',
    siteName: 'The Camavinga House',
    title: 'The Camavinga House — Barbershop Rennes & Madrid',
    description:
      'Barbershop haut de gamme à Rennes et Madrid. Le salon des champions. Coupe, barbe, soins. Réservez en ligne.',
    images: [
      {
        url: '/images/interior.png',
        width: 1200,
        height: 630,
        alt: 'The Camavinga House - Interieur du salon',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'The Camavinga House — Barbershop Rennes & Madrid',
    description:
      'Le salon des champions. Barbershop haut de gamme à Rennes et Madrid.',
    images: ['/images/interior.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: './',
  },
  verification: {},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'The Camavinga House',
    url: siteUrl,
    sameAs: ['https://www.instagram.com/thecamavingahouse/'],
    location: salons.map(salon => ({
      '@type': 'HairSalon',
      name: 'The Camavinga House · ' + salon.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: salon.address,
        postalCode: salon.town.split(' ')[0],
        addressLocality: salon.town.slice(6),
        addressCountry: salon.key === 'rennes' ? 'FR' : 'ES',
      },
      url: new URL(salon.book, siteUrl).href,
    })),
  }

  return (
    <html lang="fr" className={`${inter.variable} ${cormorant.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
