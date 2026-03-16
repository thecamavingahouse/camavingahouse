import type { Metadata } from 'next'
import { Inter, Cormorant_Garamond } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' })
const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-serif',
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
})

const siteUrl = 'https://camavingahouse.com'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'The Camavinga House — Barbershop Rennes & Madrid',
    template: '%s | The Camavinga House',
  },
  description:
    'Barbershop haut de gamme a Rennes et Madrid. Le salon des champions : Mbappe, Vinicius Jr, Bellingham, Camavinga. Coupe, barbe, soins. Reservez en ligne.',
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
    url: siteUrl,
    siteName: 'The Camavinga House',
    title: 'The Camavinga House — Barbershop Rennes & Madrid',
    description:
      'Barbershop haut de gamme a Rennes et Madrid. Le salon des champions. Coupe, barbe, soins. Reservez en ligne.',
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
      'Le salon des champions. Barbershop haut de gamme a Rennes et Madrid.',
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
    canonical: siteUrl,
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
    '@type': 'BarberShop',
    name: 'The Camavinga House',
    image: `${siteUrl}/images/interior.png`,
    url: siteUrl,
    description:
      'Barbershop haut de gamme a Rennes et Madrid. Le salon des champions.',
    priceRange: '$$',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: '2 Passage Antoinette Caillot',
        addressLocality: 'Rennes',
        postalCode: '35000',
        addressCountry: 'FR',
      },
      {
        '@type': 'PostalAddress',
        streetAddress: 'C/ del Gral. Alvarez de Castro, 12',
        addressLocality: 'Madrid',
        postalCode: '28010',
        addressCountry: 'ES',
      },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '10:00',
        closes: '20:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '20:00',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5.0',
      reviewCount: '4800',
      bestRating: '5',
    },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Prestations',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Coupe simple' },
          price: '28',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Coupe & barbe' },
          price: '38',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Coupe VIP' },
          price: '60',
          priceCurrency: 'EUR',
        },
        {
          '@type': 'Offer',
          itemOffered: { '@type': 'Service', name: 'Barbe simple' },
          price: '15',
          priceCurrency: 'EUR',
        },
      ],
    },
    sameAs: [
      'https://www.instagram.com/thecamavingahouse/',
    ],
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
