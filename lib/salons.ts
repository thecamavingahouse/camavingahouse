export type Language = 'fr' | 'es' | 'en'
export const franchiseEmail = 'thecamavingahouse@gmail.com'
export const planity = 'https://www.planity.com/the-camavinga-house-35000-rennes'
const chamberi = 'https://booksy.com/es-es/85430_the-camavinga-house_barberia_53009_madrid'
const arroyomolinos = 'https://booksy.com/es-es/130416_the-camavinga-house-arroyomolinos_barberia_53689_valdefuentes'

export const salons = [
  { key: 'rennes', name: 'Rennes', address: '2 passage Antoinette Caillot', town: '35000 Rennes', book: '/book', reviews: planity, platform: 'Planity', count: 501,
    hours: { fr: 'Lun–ven 10 h–20 h · Sam 9 h–20 h', es: 'Lun–vie 10:00–20:00 · Sáb 9:00–20:00', en: 'Mon–Fri 10am–8pm · Sat 9am–8pm' } },
  { key: 'chamberi', name: 'Madrid · Chamberí', address: 'Calle del General Álvarez de Castro, 12', town: '28010 Madrid', book: chamberi, reviews: chamberi, platform: 'Booksy', count: 450,
    hours: { fr: 'Lun–sam 10 h–14 h et 15 h–20 h', es: 'Lun–sáb 10:00–14:00 y 15:00–20:00', en: 'Mon–Sat 10am–2pm and 3pm–8pm' } },
  { key: 'arroyomolinos', name: 'Madrid · Arroyomolinos', address: 'Calle de Potro, 1', town: '28939 Arroyomolinos', book: arroyomolinos, reviews: arroyomolinos, platform: 'Booksy', count: 226,
    hours: { fr: 'Lun–sam 10 h–20 h', es: 'Lun–sáb 10:00–20:00', en: 'Mon–Sat 10am–8pm' } },
] as const

export type Salon = (typeof salons)[number]
export function bookingUrl(salon: Salon, lang: Language) {
  return salon.key === 'rennes' && lang !== 'fr' ? '/book?lang=' + lang : salon.book
}

export const shopText = {
  fr: { choose: 'Choisis ton salon', book: 'Réserver à', directions: 'Itinéraire', soon: 'Prochainement', closed: 'Fermé le dimanche', fees: 'Voir les tarifs', review: 'avis', checked: 'Notes relevées le 13 novembre 2026', franchise: 'Découvrir la franchise', back: 'Retour aux salons', full: 'Toutes les prestations sur Booksy' },
  es: { choose: 'Elige tu barbería', book: 'Reservar en', directions: 'Cómo llegar', soon: 'Próximamente', closed: 'Domingo cerrado', fees: 'Ver precios', review: 'reseñas', checked: 'Valoraciones consultadas el 13 de noviembre de 2026', franchise: 'Descubrir la franquicia', back: 'Volver a las barberías', full: 'Todos los servicios en Booksy' },
  en: { choose: 'Choose your barbershop', book: 'Book in', directions: 'Directions', soon: 'Coming soon', closed: 'Closed on Sundays', fees: 'See prices', review: 'reviews', checked: 'Ratings checked on 13 November 2026', franchise: 'Explore the franchise', back: 'Back to locations', full: 'All services on Booksy' },
}

export function directionsUrl(salon: Salon) {
  return 'https://www.google.com/maps/dir/?api=1&destination=' + encodeURIComponent(salon.address + ', ' + salon.town)
}

const arroyoServices = [
  { fr: 'Coupe homme', es: 'Corte caballero', en: 'Haircut', minutes: 30, euros: 20 },
  { fr: 'Coupe étudiant', es: 'Corte de estudiante', en: 'Student haircut', minutes: 30, euros: 18 },
  { fr: 'Coupe et barbe', es: 'Corte y barba', en: 'Haircut and beard', minutes: 45, euros: 27 },
  { fr: 'Coupe hebdomadaire', es: 'Corte semanal', en: 'Weekly haircut', minutes: 30, euros: 16 },
  { fr: 'Coupe et barbe hebdomadaires', es: 'Corte y barba semanal', en: 'Weekly haircut and beard', minutes: 45, euros: 25 },
  { fr: 'Coupe et motif', es: 'Corte y diseño', en: 'Haircut and design', minutes: 35, euros: 23 },
  { fr: 'Coupe enfant (jusqu’à 10 ans)', es: 'Corte de niño (hasta 10 años)', en: 'Kids’ haircut (up to age 10)', minutes: 30, euros: 15 },
  { fr: 'Barbe XL', es: 'Barba XL', en: 'Long beard trim', minutes: 30, euros: 10 },
  { fr: 'Taille de barbe', es: 'Perfilado de barba', en: 'Beard shaping', minutes: 15, euros: 7 },
  { fr: 'Décoloration et coupe', es: 'Decoloración y corte', en: 'Bleaching and haircut', minutes: 180, euros: 80 },
  { fr: 'Mèches et coupe', es: 'Mechas y corte', en: 'Highlights and haircut', minutes: 180, euros: 60 },
]
export function arroyoMenu(lang: Language) {
  return [{
    category: { fr: 'Prestations', es: 'Servicios', en: 'Services' }[lang],
    items: arroyoServices.map(service => ({
      name: service[lang], sub: null, duration: service.minutes === 180 ? '3 h' : service.minutes + ' min',
      price: new Intl.NumberFormat(lang, { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(service.euros),
    })),
  }]
}
