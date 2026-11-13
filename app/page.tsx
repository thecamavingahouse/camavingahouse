'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useScrollReveal } from '@/hooks/use-scroll-reveal'

import { T } from '@/lib/site-copy'
import { salons, directionsUrl, shopText, bookingUrl, arroyoMenu } from '@/lib/salons'
import type { Salon } from '@/lib/salons'
import { useLanguage } from '@/lib/use-language'

type ServiceItem = { name: string; sub: string | null; duration: string; price: string }
type ServiceCategory = { category: string; items: ServiceItem[] }

const MENUS: Record<string, Record<string, ServiceCategory[]>> = {
  fr: {
    rennes: [
      { category: 'Coupe', items: [
        { name: 'Coupe simple', sub: 'Shampoing + coiffage', duration: '30min', price: '28\u20ac' },
        { name: 'Coupe \u00e9tudiant', sub: 'Shampoing + coiffage', duration: '30min', price: '23\u20ac' },
        { name: 'Coupe & barbe', sub: null, duration: '45min', price: '38\u20ac' },
        { name: 'Coupe & barbe \u00e9tudiant', sub: null, duration: '45min', price: '33\u20ac' },
        { name: 'Coupe enfant', sub: '-12 ans', duration: '30min', price: '20\u20ac' },
        { name: 'Coupe VIP', sub: 'Coupe + barbe + soin', duration: '1h', price: '60\u20ac' },
        { name: 'Coupe transformation', sub: null, duration: '1h', price: '60\u20ac' },
      ]},
      { category: 'Barbe', items: [
        { name: 'Barbe simple', sub: null, duration: '15min', price: '15\u20ac' },
        { name: 'Barbe XL', sub: null, duration: '20min', price: '20\u20ac' },
      ]},
      { category: 'Suppl\u00e9ments', items: [
        { name: 'Design', sub: null, duration: '10min', price: '3\u20ac' },
        { name: 'Contours', sub: null, duration: '10min', price: '5\u20ac' },
        { name: 'D\u00e9coloration', sub: 'Sur rendez-vous', duration: '3h', price: '80\u20ac' },
        { name: 'D\u00e9coloration fantaisie', sub: 'Sur rendez-vous', duration: '3h', price: '90\u20ac' },
        { name: 'Couleur m\u00e8che', sub: 'Sur rendez-vous', duration: '2h', price: '50\u20ac' },
      ]},
      { category: 'Soins', items: [
        { name: 'Soin hydratant', sub: null, duration: '15min', price: '15\u20ac' },
        { name: 'Soin du visage', sub: null, duration: '20min', price: '25\u20ac' },
      ]},
    ],
    chamberi: [
      { category: 'Coupe', items: [
        { name: 'Coupe', sub: null, duration: '30min', price: '23\u20ac' },
        { name: 'Coupe & barbe', sub: null, duration: '45min', price: '33\u20ac' },
        { name: 'Coupe enfant', sub: 'jusqu\u2019\u00e0 10 ans', duration: '30min', price: '17\u20ac' },
        { name: 'Coupe & Hairtattoo', sub: 'design', duration: '35min', price: '26\u20ac' },
        { name: 'Coupe hebdo', sub: null, duration: '30min', price: '20\u20ac' },
      ]},
      { category: 'Barbe', items: [
        { name: 'Barbe', sub: null, duration: '15min', price: '10\u20ac' },
        { name: 'Barbe XL', sub: null, duration: '20min', price: '13\u20ac' },
      ]},
      { category: 'Couleur', items: [
        { name: 'D\u00e9coloration', sub: null, duration: '3h', price: '70\u20ac' },
        { name: 'D\u00e9coloration fantaisie', sub: null, duration: '3h', price: '85\u20ac' },
        { name: 'Couleur m\u00e8ches', sub: null, duration: '3h', price: '50\u20ac' },
      ]},
      { category: 'Rastas', items: [
        { name: 'R\u00e9paration rastas', sub: null, duration: '2h', price: '80\u20ac' },
        { name: 'Cr\u00e9ation rastas', sub: 'depuis 0', duration: '4h', price: '200\u20ac' },
        { name: 'Tresses avec rastas', sub: null, duration: '1h', price: '40\u20ac' },
      ]},
    ],
  },
  es: {
    rennes: [
      { category: 'Corte', items: [
        { name: 'Corte simple', sub: 'Champ\u00fa + peinado', duration: '30min', price: '28\u20ac' },
        { name: 'Corte estudiante', sub: 'Champ\u00fa + peinado', duration: '30min', price: '23\u20ac' },
        { name: 'Corte & barba', sub: null, duration: '45min', price: '38\u20ac' },
        { name: 'Corte & barba estudiante', sub: null, duration: '45min', price: '33\u20ac' },
        { name: 'Corte ni\u00f1o', sub: '-12 a\u00f1os', duration: '30min', price: '20\u20ac' },
        { name: 'Corte VIP', sub: 'Corte + barba + tratamiento', duration: '1h', price: '60\u20ac' },
        { name: 'Corte transformaci\u00f3n', sub: null, duration: '1h', price: '60\u20ac' },
      ]},
      { category: 'Barba', items: [
        { name: 'Barba simple', sub: null, duration: '15min', price: '15\u20ac' },
        { name: 'Barba XL', sub: null, duration: '20min', price: '20\u20ac' },
      ]},
      { category: 'Extras', items: [
        { name: 'Dise\u00f1o', sub: null, duration: '10min', price: '3\u20ac' },
        { name: 'Contornos', sub: null, duration: '10min', price: '5\u20ac' },
        { name: 'Decoloraci\u00f3n', sub: 'Con cita previa', duration: '3h', price: '80\u20ac' },
        { name: 'Decoloraci\u00f3n fantas\u00eda', sub: 'Con cita previa', duration: '3h', price: '90\u20ac' },
        { name: 'Color mechas', sub: 'Con cita previa', duration: '2h', price: '50\u20ac' },
      ]},
      { category: 'Tratamientos', items: [
        { name: 'Tratamiento hidratante', sub: null, duration: '15min', price: '15\u20ac' },
        { name: 'Tratamiento facial', sub: null, duration: '20min', price: '25\u20ac' },
      ]},
    ],
    chamberi: [
      { category: 'Corte', items: [
        { name: 'Corte de pelo', sub: null, duration: '30min', price: '23\u20ac' },
        { name: 'Corte y barba', sub: null, duration: '45min', price: '33\u20ac' },
        { name: 'Corte ni\u00f1o', sub: 'hasta 10 a\u00f1os', duration: '30min', price: '17\u20ac' },
        { name: 'Corte y Hairtattoo', sub: 'dise\u00f1o', duration: '35min', price: '26\u20ac' },
        { name: 'Corte semanal', sub: null, duration: '30min', price: '20\u20ac' },
      ]},
      { category: 'Barba', items: [
        { name: 'Perfilado de barba', sub: null, duration: '15min', price: '10\u20ac' },
        { name: 'Barba XL', sub: null, duration: '20min', price: '13\u20ac' },
      ]},
      { category: 'Color', items: [
        { name: 'Decoloraci\u00f3n', sub: null, duration: '3h', price: '70\u20ac' },
        { name: 'Decoloraci\u00f3n fantas\u00eda', sub: null, duration: '3h', price: '85\u20ac' },
        { name: 'Color mechas', sub: null, duration: '3h', price: '50\u20ac' },
      ]},
      { category: 'Rastas', items: [
        { name: 'Arreglo de rastas', sub: null, duration: '2h', price: '80\u20ac' },
        { name: 'Creaci\u00f3n de rastas', sub: 'desde 0', duration: '4h', price: '200\u20ac' },
        { name: 'Trenzas con rastas', sub: null, duration: '1h', price: '40\u20ac' },
      ]},
    ],
  },
  en: {
    rennes: [
      { category: 'Haircut', items: [
        { name: 'Classic cut', sub: 'Shampoo + styling', duration: '30min', price: '\u20ac28' },
        { name: 'Student cut', sub: 'Shampoo + styling', duration: '30min', price: '\u20ac23' },
        { name: 'Cut & beard', sub: null, duration: '45min', price: '\u20ac38' },
        { name: 'Student cut & beard', sub: null, duration: '45min', price: '\u20ac33' },
        { name: 'Kids cut', sub: 'Under 12', duration: '30min', price: '\u20ac20' },
        { name: 'VIP Cut', sub: 'Cut + beard + treatment', duration: '1h', price: '\u20ac60' },
        { name: 'Transformation cut', sub: null, duration: '1h', price: '\u20ac60' },
      ]},
      { category: 'Beard', items: [
        { name: 'Beard trim', sub: null, duration: '15min', price: '\u20ac15' },
        { name: 'Beard XL', sub: null, duration: '20min', price: '\u20ac20' },
      ]},
      { category: 'Extras', items: [
        { name: 'Design', sub: null, duration: '10min', price: '\u20ac3' },
        { name: 'Line-up', sub: null, duration: '10min', price: '\u20ac5' },
        { name: 'Bleaching', sub: 'By appointment', duration: '3h', price: '\u20ac80' },
        { name: 'Fantasy bleaching', sub: 'By appointment', duration: '3h', price: '\u20ac90' },
        { name: 'Highlights', sub: 'By appointment', duration: '2h', price: '\u20ac50' },
      ]},
      { category: 'Treatments', items: [
        { name: 'Moisturizing treatment', sub: null, duration: '15min', price: '\u20ac15' },
        { name: 'Facial treatment', sub: null, duration: '20min', price: '\u20ac25' },
      ]},
    ],
    chamberi: [
      { category: 'Haircut', items: [
        { name: 'Haircut', sub: null, duration: '30min', price: '\u20ac23' },
        { name: 'Cut & beard', sub: null, duration: '45min', price: '\u20ac33' },
        { name: 'Kids cut', sub: 'Up to 10 years', duration: '30min', price: '\u20ac17' },
        { name: 'Cut & Hairtattoo', sub: 'Design', duration: '35min', price: '\u20ac26' },
        { name: 'Weekly cut', sub: null, duration: '30min', price: '\u20ac20' },
      ]},
      { category: 'Beard', items: [
        { name: 'Beard trim', sub: null, duration: '15min', price: '\u20ac10' },
        { name: 'Beard XL', sub: null, duration: '20min', price: '\u20ac13' },
      ]},
      { category: 'Color', items: [
        { name: 'Bleaching', sub: null, duration: '3h', price: '\u20ac70' },
        { name: 'Fantasy bleaching', sub: null, duration: '3h', price: '\u20ac85' },
        { name: 'Highlights', sub: null, duration: '3h', price: '\u20ac50' },
      ]},
      { category: 'Dreadlocks', items: [
        { name: 'Dreadlock repair', sub: null, duration: '2h', price: '\u20ac80' },
        { name: 'Dreadlock creation', sub: 'From scratch', duration: '4h', price: '\u20ac200' },
        { name: 'Braids with dreads', sub: null, duration: '1h', price: '\u20ac40' },
      ]},
    ],
  },
}

export default function HomePage() {
  const { lang, setLang } = useLanguage()
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null)
  const activeSalon = selectedSalon ?? salons[0]
  const labels = shopText[lang]
  const bookingHref = selectedSalon ? bookingUrl(selectedSalon, lang) : '#salon'
  const franchiseHref = lang === 'fr' ? '/franchise' : '/franchise?lang=' + lang
  const menu = activeSalon.key === 'arroyomolinos' ? arroyoMenu(lang) : MENUS[lang][activeSalon.key]
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const t = T[lang]

  const revealRef = useScrollReveal()

  useEffect(() => {
    if (!window.location.hash) {
      window.history.scrollRestoration = 'manual'
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileMenuOpen])

  const navLinks = [
    [t.navSalons, '#salon'],
    [t.navServices, '#services'],
    [t.navFranchise, franchiseHref],
    [t.navContact, '#salon'],
  ]

  return (
    <main ref={revealRef} className="bg-[#050505] overflow-x-hidden grain-overlay">

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#050505]/95 backdrop-blur-lg' : 'bg-[#050505]/60 backdrop-blur-md'}`}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="font-serif text-[13px] sm:text-[17px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium text-white select-none shrink-0">
            The Camavinga{' '}
            <span className="text-gold">House</span>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-12">
            {navLinks.map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="nav-hover-line text-[11px] tracking-[0.2em] uppercase text-neutral-400 hover:text-white transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-6">
            {/* Lang switch */}
            <div className="flex items-center gap-1.5 text-[10px] sm:text-[11px] font-semibold tracking-[0.15em]">
              {(['fr', 'es', 'en'] as const).map((l, i) => (
                <span key={l} className="flex items-center gap-1.5">
                  {i > 0 && <span className="text-neutral-400 select-none">/</span>}
                  <button
                    aria-pressed={lang === l}
                    onClick={() => setLang(l)}
                    className={`transition-colors duration-300 ${lang === l ? 'text-gold' : 'text-neutral-400 hover:text-neutral-400'}`}
                  >
                    {l.toUpperCase()}
                  </button>
                </span>
              ))}
            </div>

            {/* CTA desktop */}
            <a
              href={bookingHref}
              className="hidden sm:inline-block text-[11px] font-medium tracking-[0.15em] uppercase px-6 py-3 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-500"
            >
              {selectedSalon ? labels.book + ' ' + selectedSalon.name : t.navBook}
            </a>

            {/* Hamburger mobile */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label="Menu" aria-expanded={mobileMenuOpen} aria-controls="mobile-nav"
            >
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-[3.5px]' : ''}`} />
              <span className={`block w-5 h-px bg-white transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-[3.5px]' : ''}`} />
            </button>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </header>

      {/* Mobile menu overlay */}
      <div id="mobile-nav" hidden={!mobileMenuOpen}
        className={`fixed inset-0 z-40 bg-[#050505]/98 backdrop-blur-xl transition-all duration-500 lg:hidden flex flex-col items-center justify-center gap-8 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : '!hidden'
        }`}
      >
        {navLinks.map(([label, href]) => (
          <a
            key={label}
            href={href}
            onClick={() => setMobileMenuOpen(false)}
            className="font-serif text-2xl text-white/80 hover:text-gold transition-colors duration-300 tracking-wider"
          >
            {label}
          </a>
        ))}
        <div className="w-8 h-px bg-gold/30 my-2" />
        <a
          href={bookingHref}
          onClick={() => setMobileMenuOpen(false)}
          className="px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-gold hover:bg-gold-light transition-colors duration-500"
        >
          {selectedSalon ? labels.book + ' ' + selectedSalon.name : t.navBook}
        </a>
      </div>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[85svh] lg:min-h-screen flex items-center pt-20 pb-10">
        <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 w-full grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16 xl:gap-24 items-center">

          {/* Arch images - desktop */}
          <div className="relative hidden lg:block" style={{ height: 'clamp(480px, 50vw, 640px)' }}>
            {/* Arch 1 - barber */}
            <div
              className="absolute top-0 left-0 anim-arch-rise anim-gold-shimmer"
              style={{
                width: 'clamp(140px, 15vw, 210px)',
                height: '100%',
                borderRadius: 9999,
                animationDelay: '0.2s',
              }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 9999 }}>
                <Image src="/images/barber.png" alt="Barber au travail" fill sizes="(min-width: 1024px) 210px, 160px" className="object-cover" priority />
              </div>
            </div>
            {/* Arch 2 - interior */}
            <div
              className="absolute anim-arch-rise anim-gold-shimmer"
              style={{
                left: 'clamp(155px, 16.5vw, 230px)',
                top: 60,
                width: 'clamp(125px, 13vw, 185px)',
                height: 'calc(100% - 60px)',
                borderRadius: 9999,
                animationDelay: '0.45s',
              }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 9999 }}>
                <Image src="/images/interior.png" alt="Intérieur du salon" fill sizes="(min-width: 1024px) 185px, 1px" className="object-cover" />
              </div>
            </div>
            {/* Arch 3 - camavinga */}
            <div
              className="absolute anim-arch-rise anim-gold-shimmer"
              style={{
                left: 'clamp(295px, 31vw, 435px)',
                top: 30,
                width: 'clamp(125px, 13vw, 185px)',
                height: 'calc(100% - 70px)',
                borderRadius: 9999,
                animationDelay: '0.7s',
              }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 9999 }}>
                <Image src="/images/camavinga.png" alt="Eduardo Camavinga" fill sizes="(min-width: 1024px) 185px, 160px" className="object-cover" style={{ objectPosition: '30% top' }} priority />
              </div>
            </div>
          </div>

          {/* Hero images - mobile: 2 arches side by side */}
          <div className="flex gap-3 justify-center lg:hidden mt-5 sm:mt-12 px-2">
            <div
              className="relative flex-1 max-w-[160px] anim-arch-rise anim-gold-shimmer"
              style={{ aspectRatio: '3/5', borderRadius: 9999, animationDelay: '0.2s' }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 9999 }}>
                <Image src="/images/barber.png" alt="Barber" fill sizes="(min-width: 1024px) 210px, 160px" className="object-cover" priority />
              </div>
            </div>
            <div
              className="relative flex-1 max-w-[160px] mt-8 anim-arch-rise anim-gold-shimmer"
              style={{ aspectRatio: '3/5', borderRadius: 9999, animationDelay: '0.45s' }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 9999 }}>
                <Image src="/images/camavinga.png" alt="Camavinga" fill sizes="(min-width: 1024px) 185px, 160px" className="object-cover" style={{ objectPosition: '30% top' }} priority />
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-6 sm:gap-8 lg:py-20 text-center lg:text-left items-center lg:items-start">
            <span
              className="anim-text-up text-[9px] sm:text-[10px] tracking-[0.3em] sm:tracking-[0.4em] uppercase font-medium text-gold"
              style={{ animationDelay: '0.5s' }}
            >
              {t.heroTag} · {labels.soon}
            </span>

            <h1
              className="anim-text-up font-serif text-[2.2rem] sm:text-[3rem] lg:text-[3.2rem] xl:text-[4.2rem] 2xl:text-[4.8rem] font-light leading-[1.05] text-white"
              style={{ animationDelay: '0.65s' }}
            >
              {t.heroH1a}
              <br />
              <em className="text-shimmer">{t.heroH1b}</em>
            </h1>

            <div
              className="anim-text-up w-12 sm:w-16 h-px bg-gradient-to-r from-gold/60 to-transparent"
              style={{ animationDelay: '0.8s' }}
            />

            <p
              className="anim-text-up text-neutral-400 leading-[1.8] max-w-[380px] text-[14px] sm:text-[15px]"
              style={{ animationDelay: '0.85s' }}
            >
              {t.heroSub}
            </p>

            <div
              className="anim-text-up flex flex-col sm:flex-row items-center gap-4 sm:gap-6 pt-2 w-full sm:w-auto"
              style={{ animationDelay: '1s' }}
            >
              <a
                href={bookingHref}
                className="inline-block px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-gold hover:bg-gold-light transition-colors duration-500 w-full sm:w-auto text-center"
              >
                {selectedSalon ? labels.book + ' ' + selectedSalon.name : t.heroCta}
              </a>
            </div>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 anim-fade-in anim-float hidden lg:flex flex-col items-center gap-3" style={{ animationDelay: '1.5s' }}>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        </div>
      </section>

      <section id="salon" className="scroll-mt-20 border-t border-neutral-800 bg-neutral-950">
        <div className="mx-auto max-w-[1400px] px-5 py-14 sm:px-8 lg:py-20">
          <h2 className="font-serif text-4xl text-white sm:text-5xl">{labels.choose}</h2>
          <div className="mt-8 grid gap-8 md:grid-cols-3">
            {salons.map(shop => (
              <article key={shop.key} className="flex flex-col items-start gap-3 border-t border-gold/40 pt-5">
                <h3 className="font-serif text-2xl text-white">{shop.name}</h3>
                <address className="not-italic text-sm text-neutral-300">{shop.address}<br />{shop.town}</address>
                <p className="text-sm text-neutral-300">{shop.hours[lang]}<br />{labels.closed}</p>
                <div className="flex flex-wrap gap-4 text-sm text-gold">
                  <a className="underline underline-offset-4" href={directionsUrl(shop)}>{labels.directions}</a>
                  <a className="underline underline-offset-4" href="#services" onClick={() => setSelectedSalon(shop)}>{labels.fees}</a>
                </div>
                <a className="mt-2 inline-flex min-h-11 items-center bg-gold px-5 py-3 text-sm font-semibold text-black" href={bookingUrl(shop, lang)}>{labels.book} {shop.name}</a>
                <a className="text-sm text-neutral-300 underline underline-offset-4" href={shop.reviews}>
                  {new Intl.NumberFormat(lang).format(4.9)}/5 · {shop.count} {labels.review} · {shop.platform}
                </a>
              </article>
            ))}
          </div>
          <p className="mt-7 text-xs text-neutral-400">{labels.checked}</p>
          <p className="mt-5 border-t border-neutral-800 pt-5 text-sm text-neutral-300">Casablanca · {labels.soon}</p>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 bg-neutral-950">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-20 sm:py-32">

          <div data-reveal className="mb-10 sm:mb-16 max-w-2xl">
            <span className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.25em] text-gold block mb-5">
              {t.servicesLabel}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl xl:text-[3.2rem] font-light text-white leading-tight">
              {t.servicesH2}
            </h2>
          </div>

          {/* Salon tabs - scrollable on mobile */}
          <div className="flex gap-0 mb-10 sm:mb-14 overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0 scrollbar-hide">
            {salons.map((tab, idx) => (
              <button
                key={tab.key}
                aria-pressed={activeSalon.key === tab.key}
                onClick={() => setSelectedSalon(tab)}
                className={`relative text-[10px] sm:text-[11px] font-medium tracking-[0.12em] uppercase px-4 sm:px-6 py-3 sm:py-3.5 transition-all duration-300 whitespace-nowrap shrink-0 ${
                  idx > 0 ? 'border-l border-neutral-800' : ''
                } ${
                  activeSalon.key === tab.key
                    ? 'text-gold bg-gold/[0.04]'
                    : 'text-neutral-400 hover:text-neutral-300'
                }`}
              >
                {tab.name}
                {activeSalon.key === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-gold anim-line-expand" />
                )}
              </button>
            ))}
          </div>

          {/* Services grid */}
          <div className="grid lg:grid-cols-2 gap-x-12 xl:gap-x-20 gap-y-10 sm:gap-y-12">
            {menu.map(cat => (
              <div key={cat.category}>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold mb-4 pb-4 border-b border-neutral-800/50">
                  {cat.category}
                </p>
                <ul>
                  {cat.items.map(item => (
                    <li key={item.name} className="service-row flex items-center justify-between py-2.5 sm:py-3 border-b border-neutral-900 cursor-default">
                      <div className="flex items-baseline gap-2 sm:gap-3 min-w-0">
                        <span className="text-[13px] sm:text-[14px] text-neutral-200 truncate">{item.name}</span>
                        {item.sub && (
                          <span className="text-[10px] sm:text-[11px] text-neutral-400 italic hidden sm:inline">{item.sub}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-3 sm:gap-6 shrink-0 ml-3 sm:ml-4">
                        <span className="text-[10px] sm:text-[11px] text-neutral-400 tabular-nums hidden sm:inline">{item.duration}</span>
                        <span className="text-[13px] sm:text-[14px] font-medium text-gold/80 tabular-nums w-12 sm:w-14 text-right">
                          {item.price}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 sm:mt-16 flex justify-center">
            <a href={bookingUrl(activeSalon, lang)} className="inline-block bg-gold px-8 py-4 text-sm font-semibold text-black">
              {labels.book} {activeSalon.name}
            </a>
          </div>
        </div>
      </section>

      <section id="franchise" className="border-t border-neutral-800 bg-[#080808]">
        <div className="mx-auto max-w-[1400px] px-5 py-12 sm:px-8">
          <h2 className="font-serif text-3xl text-white">{t.franchiseH2a} {t.franchiseH2b}</h2>
          <a href={franchiseHref} className="mt-4 inline-block py-2 text-gold underline underline-offset-4">{labels.franchise}</a>
        </div>
      </section>

      <footer id="contact" className="bg-[#030303]">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-14 sm:py-20 grid sm:grid-cols-2 md:grid-cols-3 gap-10 sm:gap-16">
          <div>
            <p className="font-serif text-[14px] sm:text-[17px] tracking-[0.15em] sm:tracking-[0.2em] uppercase font-medium text-white">
              The Camavinga{' '}
              <span className="text-gold">House</span>
            </p>
            <p className="text-neutral-400 text-[12px] sm:text-[13px] mt-4 sm:mt-5 leading-[1.8]">
              {t.footerTagline}
              <br />
              Rennes &middot; Madrid.
            </p>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold mb-5 sm:mb-6">
              {t.footerNavLabel}
            </p>
            <ul className="flex flex-col gap-3 sm:gap-3.5">
              {[[t.navSalons, "#salon"], [t.navServices, "#services"], [t.navBook, bookingHref]].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[12px] sm:text-[13px] text-neutral-400 hover:text-gold transition-colors duration-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold mb-5 sm:mb-6">
              {t.footerContactLabel}
            </p>
            <a className="text-sm text-neutral-300 underline underline-offset-4" href="#salon">{t.addressesLabel}</a>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800/50 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 py-6 sm:py-8">
          <p className="text-[10px] sm:text-[11px] text-neutral-400 tracking-wide">
            &copy; {new Date().getFullYear()} Camavinga House &mdash; {t.footerCopyright}
          </p>
        </div>
      </footer>

    </main>
  )
}
