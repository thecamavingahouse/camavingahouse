'use client'

import { useState } from 'react'
import Image from 'next/image'

const GOLD = '#C9A84C'

const T = {
  fr: {
    navSalons: 'Nos Salons', navServices: 'Services', navFranchise: 'Franchise',
    navContact: 'Contact', navBook: 'Réserver',
    heroTag: 'Barbershop · Rennes · Madrid · Casablanca',
    heroH1a: 'Le salon des', heroH1b: 'champions.',
    heroSub: 'Mbappé, Vinicius Jr, Bellingham, Varane, Rüdiger, Rodri, Alaba\u2026 Leur barber, c\u2019est nous.',
    heroCta: 'Prendre rendez-vous', heroDiscover: 'Découvrir',
    salonBadge: 'Nos Salons', salonH2a: 'Un salon', salonH2b: 'où l\u2019on revient.',
    salonP: 'Né en 2023 d\u2019une passion pour le métier bien fait. Une identité forte, un service exigeant, une vision de développement - un concept pensé pour durer et pour offrir une expérience barber sans compromis.',
    salonLink: 'Nos prestations',
    addressesLabel: 'Nos Adresses',
    servicesLabel: 'Nos Prestations', servicesH2: 'Ce que nous faisons', servicesCta: 'Réserver une prestation',
    services: [
      { title: 'Coupe', desc: 'Coupe simple, étudiant, avec coiffage ou design personnalisé.', price: 'à partir de 20€' },
      { title: 'Barbe', desc: 'Taille, façonnage et rasage. Du classique au design sur-mesure.', price: 'à partir de 15€' },
      { title: 'Coupe VIP', desc: 'Coupe complète + barbe + soin du visage. L\u2019expérience ultime.', price: 'à partir de 60€' },
      { title: 'Soins', desc: 'Soin hydratant, soin du visage, décoloration et couleur mèche.', price: 'à partir de 19€' },
    ],
    approcheLabel: 'Notre Approche', approcheH2a: 'Plus qu\u2019un salon,', approcheH2b: 'une vision.',
    approcheP: 'Depuis 2023, une conviction : offrir un service régulier, structuré et exigeant. Parce que vous méritez le meilleur à chaque visite.',
    piliers: [
      { n: '01', title: 'Précision', desc: 'Prendre le temps d\u2019écouter, travailler avec précision - un résultat parfait, sans compromis sur la qualité.' },
      { n: '02', title: 'Confiance', desc: 'Un barber fiable, sérieux et exigeant, où chaque client peut revenir en toute confiance.' },
      { n: '03', title: 'Authenticité', desc: 'Une identité forte, un concept qui se reconnaît. Camavinga House, c\u2019est un univers - pas juste une coupe.' },
    ],
    avisLabel: 'Avis Google', avisH2: 'Ce qu\u2019ils disent',
    avis: [
      { name: 'Alexandre M.', date: 'il y a 2 semaines', text: 'Un niveau au-dessus de tout ce que j\u2019ai connu. Le barber prend le temps, écoute vraiment ce que tu veux. Je ne vais plus nulle part ailleurs.' },
      { name: 'Rayan K.', date: 'il y a 1 mois', text: 'Cadre incroyable, résultat impeccable. On sent que c\u2019est structuré, professionnel. Le genre d\u2019endroit où tu repars en te sentant au top.' },
      { name: 'Thomas L.', date: 'il y a 3 semaines', text: 'La coupe VIP vaut chaque centime. Soin du visage compris, ambiance parfaite. C\u2019est clairement le meilleur barbershop de Rennes.' },
    ],
    ctaTag: 'Camavinga House \u00b7 Rennes \u00b7 Madrid',
    ctaH2a: 'Prenez rendez-vous', ctaH2b: 'dès aujourd\u2019hui.',
    ctaP: 'Réservez en ligne en quelques clics - choisissez votre barber et votre créneau préféré.',
    ctaBtn: 'Réserver maintenant',
    franchiseLabel: 'Franchise', franchiseH2a: 'Rejoignez la', franchiseH2b: 'Camavinga House.',
    franchiseP: 'Créée pour proposer une expérience barber haut de gamme, fondée sur la précision, le temps accordé à chaque client et une identité forte. Nous cherchons des partenaires qui partagent cette exigence.',
    franchisePillars: [
      { title: 'Une marque reconnue', desc: 'Rejoignez un nom que tout le monde conna\u00eet - fr\u00e9quent\u00e9 par les plus grandes stars du football mondial.' },
      { title: 'Expertise prouvée', desc: 'Bénéficiez de notre formation, de nos méthodes et de notre savoir-faire opérationnel.' },
      { title: 'Concept clé en main', desc: 'Soutien complet fourni, de la conception du salon à la stratégie de communication.' },
      { title: 'Réseau maîtrisé', desc: 'Nous privilégions des partenaires impliqués, partageant une vision exigeante du métier.' },
    ],
    modeleLabel: 'Le modèle', modeleH3a: 'Une franchise pensée', modeleH3b: 'pour durer.',
    modeleP: 'Nous travaillons avec des entrepreneurs qui partagent nos valeurs et notre passion pour l\u2019artisanat. Chaque franchise The Camavinga House combine la personnalité locale avec la force d\u2019une marque unifiée.',
    modeleItems: ['Exigences en matière d\u2019emplacement et d\u2019espace', 'Formation initiale et accompagnement continu', 'Assets marketing et de marque fournis'],
    candidatureLabel: 'Candidature', candidatureP: 'Renseignez vos informations et nous reviendrons vers vous rapidement.',
    formNom: 'Nom complet', formEmail: 'Email', formTel: 'Téléphone', formVille: 'Ville / Pays',
    formParcours: 'Parcours professionnel', formMessage: 'Message', formSubmit: 'Envoyer ma candidature',
    footerTagline: 'Barbershop d\u2019exception.', footerNavLabel: 'Navigation',
    footerNavItems: [['Nos Salons', '#salon'], ['Services', '#services'], ['Réserver', '#services']] as [string, string][],
    footerContactLabel: 'Contact', footerCopyright: 'Tous droits réservés.', footerAdmin: 'Espace Admin \u2192',
  },
  es: {
    navSalons: 'Nuestros Salones', navServices: 'Servicios', navFranchise: 'Franquicia',
    navContact: 'Contacto', navBook: 'Reservar',
    heroTag: 'Barbería · Rennes · Madrid · Casablanca',
    heroH1a: 'El salón de los', heroH1b: 'campeones.',
    heroSub: 'Mbappé, Vinicius Jr, Bellingham, Varane, Rüdiger, Rodri, Alaba\u2026 Su barbero somos nosotros.',
    heroCta: 'Pedir cita', heroDiscover: 'Descubrir',
    salonBadge: 'Nuestros Salones', salonH2a: 'Un salón', salonH2b: 'al que se vuelve.',
    salonP: 'Nacido en 2023 de la pasión por el oficio bien hecho. Una identidad fuerte, un servicio exigente, una visión de desarrollo - un concepto pensado para durar y ofrecer una experiencia de barbería sin compromisos.',
    salonLink: 'Nuestros servicios',
    addressesLabel: 'Nuestras Direcciones',
    servicesLabel: 'Nuestros Servicios', servicesH2: 'Lo que hacemos', servicesCta: 'Reservar un servicio',
    services: [
      { title: 'Corte', desc: 'Corte sencillo, estudiante, con peinado o diseño personalizado.', price: 'desde 20€' },
      { title: 'Barba', desc: 'Perfilado, moldeado y afeitado. Del clásico al diseño a medida.', price: 'desde 15€' },
      { title: 'Corte VIP', desc: 'Corte completo + barba + tratamiento facial. La experiencia definitiva.', price: 'desde 60€' },
      { title: 'Tratamientos', desc: 'Hidratación facial, tratamiento de piel, decoloración y mechas.', price: 'desde 19€' },
    ],
    approcheLabel: 'Nuestro Enfoque', approcheH2a: 'Más que un salón,', approcheH2b: 'una visión.',
    approcheP: 'Desde 2023, una convicción: ofrecer un servicio regular, estructurado y exigente. Porque mereces lo mejor en cada visita.',
    piliers: [
      { n: '01', title: 'Precisión', desc: 'Tomarse el tiempo de escuchar, trabajar con precisión - un resultado perfecto, sin compromisos en la calidad.' },
      { n: '02', title: 'Confianza', desc: 'Un barbero fiable, serio y exigente, donde cada cliente puede volver con toda confianza.' },
      { n: '03', title: 'Autenticidad', desc: 'Una identidad fuerte, un concepto que se reconoce. Camavinga House es un universo - no solo un corte.' },
    ],
    avisLabel: 'Opiniones Google', avisH2: 'Lo que dicen',
    avis: [
      { name: 'Alexandre M.', date: 'hace 2 semanas', text: 'Un nivel por encima de todo lo que he conocido. El barbero se toma su tiempo, escucha de verdad lo que quieres. Ya no voy a ningún otro lugar.' },
      { name: 'Rayan K.', date: 'hace 1 mes', text: 'Ambiente increíble, resultado impecable. Se nota que está estructurado, profesional. El tipo de sitio del que sales sintiéndote en lo más alto.' },
      { name: 'Thomas L.', date: 'hace 3 semanas', text: 'El corte VIP vale cada céntimo. Tratamiento facial incluido, ambiente perfecto. Es claramente la mejor barbería de Rennes.' },
    ],
    ctaTag: 'Camavinga House \u00b7 Rennes \u00b7 Madrid',
    ctaH2a: 'Reserva tu cita', ctaH2b: 'hoy mismo.',
    ctaP: 'Reserva en línea en pocos clics - elige tu barbero y tu horario preferido.',
    ctaBtn: 'Reservar ahora',
    franchiseLabel: 'Franquicia', franchiseH2a: 'Únete a', franchiseH2b: 'Camavinga House.',
    franchiseP: 'Creado para ofrecer una experiencia de barbería de alto nivel, basada en la precisión, el tiempo dedicado a cada cliente y una identidad fuerte. Buscamos socios que compartan esta exigencia.',
    franchisePillars: [
      { title: 'Una marca reconocida', desc: 'Únete a un nombre que todo el mundo conoce - frecuentado por las mayores estrellas del fútbol mundial.' },
      { title: 'Experiencia demostrada', desc: 'Benefíciate de nuestra formación, métodos y conocimiento operativo.' },
      { title: 'Concepto llave en mano', desc: 'Apoyo completo desde la concepción del salón hasta la estrategia de comunicación.' },
      { title: 'Red controlada', desc: 'Priorizamos socios comprometidos que comparten una visión exigente del oficio.' },
    ],
    modeleLabel: 'El modelo', modeleH3a: 'Una franquicia pensada', modeleH3b: 'para durar.',
    modeleP: 'Trabajamos con emprendedores que comparten nuestros valores y nuestra pasión por el oficio. Cada franquicia The Camavinga House combina la personalidad local con la fuerza de una marca unificada.',
    modeleItems: ['Requisitos de ubicación y espacio', 'Formación inicial y acompañamiento continuo', 'Assets de marketing y marca incluidos'],
    candidatureLabel: 'Candidatura', candidatureP: 'Rellena tus datos y nos pondremos en contacto contigo pronto.',
    formNom: 'Nombre completo', formEmail: 'Correo electrónico', formTel: 'Teléfono', formVille: 'Ciudad / País',
    formParcours: 'Trayectoria profesional', formMessage: 'Mensaje', formSubmit: 'Enviar mi candidatura',
    footerTagline: 'Barbería de excepción.', footerNavLabel: 'Navegación',
    footerNavItems: [['Nuestros Salones', '#salon'], ['Servicios', '#services'], ['Reservar', '#services']] as [string, string][],
    footerContactLabel: 'Contacto', footerCopyright: 'Todos los derechos reservados.', footerAdmin: 'Admin \u2192',
  },
}

const ADDRESSES = [
  {
    n: '01', city: 'Madrid', district: 'Chamberí',
    address: 'C/ del Gral. Álvarez de Castro, 12', postal: '28010 Madrid',
    comingSoon: false,
    hours: [
      { day: 'Lundi',    time: '10:00 - 20:00' },
      { day: 'Mardi',    time: '10:00 - 20:00' },
      { day: 'Mercredi', time: '10:00 - 20:00' },
      { day: 'Jeudi',    time: '10:00 - 20:00' },
      { day: 'Vendredi', time: '10:00 - 20:00' },
      { day: 'Samedi',   time: '10:00-14:00 · 15:00-20:00' },
      { day: 'Dimanche', time: 'Fermé' },
    ],
  },
  {
    n: '02', city: 'Madrid', district: 'Arroyomolinos',
    address: 'Calle del Potro, 1', postal: '28939 Arroyomolinos',
    comingSoon: false,
    hours: null as { day: string; time: string }[] | null,
  },
  {
    n: '03', city: 'Rennes', district: 'France',
    address: '2 Passage Antoinette Caillot', postal: '35000 Rennes',
    comingSoon: false,
    hours: [
      { day: 'Lundi',    time: '10:00 - 20:00' },
      { day: 'Mardi',    time: '10:00 - 20:00' },
      { day: 'Mercredi', time: '10:00 - 20:00' },
      { day: 'Jeudi',    time: '10:00 - 20:00' },
      { day: 'Vendredi', time: '10:00 - 20:00' },
      { day: 'Samedi',   time: '09:00 - 20:00' },
      { day: 'Dimanche', time: 'Fermé' },
    ],
  },
  {
    n: '04', city: 'Casablanca', district: 'Maroc',
    address: null, postal: null,
    comingSoon: true,
    hours: null as { day: string; time: string }[] | null,
  },
]

type ServiceItem = { name: string; sub: string | null; duration: string; price: string }
type ServiceCategory = { category: string; items: ServiceItem[] }

const MENU_RENNES: ServiceCategory[] = [
  {
    category: 'Coupe',
    items: [
      { name: 'Coupe simple', sub: 'Shampoing + coiffage', duration: '30min', price: '28€' },
      { name: 'Coupe étudiant', sub: 'Shampoing + coiffage', duration: '30min', price: '23€' },
      { name: 'Coupe & barbe', sub: null, duration: '45min', price: '38€' },
      { name: 'Coupe & barbe étudiant', sub: null, duration: '45min', price: '33€' },
      { name: 'Coupe enfant', sub: '-12 ans', duration: '30min', price: '20€' },
      { name: 'Coupe VIP', sub: 'Coupe + barbe + soin', duration: '1h', price: '60€' },
      { name: 'Coupe transformation', sub: null, duration: '1h', price: '60€' },
    ],
  },
  {
    category: 'Barbe',
    items: [
      { name: 'Barbe simple', sub: null, duration: '15min', price: '15€' },
      { name: 'Barbe XL', sub: null, duration: '20min', price: '20€' },
    ],
  },
  {
    category: 'Suppléments',
    items: [
      { name: 'Design', sub: null, duration: '10min', price: '3€' },
      { name: 'Contours', sub: null, duration: '10min', price: '5€' },
      { name: 'Décoloration', sub: 'Sur rendez-vous', duration: '3h', price: '80€' },
      { name: 'Décoloration fantaisie', sub: 'Sur rendez-vous', duration: '3h', price: '90€' },
      { name: 'Couleur mèche', sub: 'Sur rendez-vous', duration: '2h', price: '50€' },
    ],
  },
  {
    category: 'Soins',
    items: [
      { name: 'Soin hydratant', sub: null, duration: '15min', price: '15€' },
      { name: 'Soin du visage', sub: null, duration: '20min', price: '25€' },
    ],
  },
]

const MENU_CHAMBERI: ServiceCategory[] = [
  {
    category: 'Corte',
    items: [
      { name: 'Corte de pelo', sub: null, duration: '30min', price: '23€' },
      { name: 'Corte y barba', sub: null, duration: '45min', price: '33€' },
      { name: 'Corte para niño', sub: 'hasta 10 años', duration: '30min', price: '17€' },
      { name: 'Corte y Hairtattoo', sub: 'diseño', duration: '35min', price: '26€' },
      { name: 'Corte semanal', sub: null, duration: '30min', price: '20€' },
    ],
  },
  {
    category: 'Barba',
    items: [
      { name: 'Perfilado de barba', sub: null, duration: '15min', price: '10€' },
      { name: 'Barba XL', sub: null, duration: '20min', price: '13€' },
    ],
  },
  {
    category: 'Color',
    items: [
      { name: 'Decoloración', sub: null, duration: '3h', price: '70€' },
      { name: 'Decoloración fantasía', sub: null, duration: '3h', price: '85€' },
      { name: 'Color mechas', sub: null, duration: '3h', price: '50€' },
    ],
  },
  {
    category: 'Rastas',
    items: [
      { name: 'Arreglo de rastas', sub: null, duration: '2h', price: '80€' },
      { name: 'Creación de rastas', sub: 'desde 0', duration: '4h', price: '200€' },
      { name: 'Trenzas con rastas', sub: null, duration: '1h', price: '40€' },
    ],
  },
]

const SERVICES_BY_SALON: Record<string, ServiceCategory[]> = {
  rennes: MENU_RENNES,
  chamberi: MENU_CHAMBERI,
  arroyomolinos: MENU_RENNES,
}

const SALON_TABS = [
  { key: 'rennes', label: 'Rennes', bookingUrl: '/book' },
  { key: 'chamberi', label: 'Madrid · Chamberí', bookingUrl: 'https://booksy.com/es-es/85430_the-camavinga-house_barberia_53009_madrid#ba_s=seo' },
  { key: 'arroyomolinos', label: 'Madrid · Arroyomolinos', bookingUrl: '' },
]

export default function HomePage() {
  const [lang, setLang] = useState<'fr' | 'es'>('fr')
  const [selectedSalon, setSelectedSalon] = useState('rennes')
  const t = T[lang]

  return (
    <main className="bg-[#050505] overflow-x-hidden grain-overlay">

      {/* ══════════════════════════════════════════
          NAVBAR
      ══════════════════════════════════════════ */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <a href="#" className="font-serif text-[17px] tracking-[0.2em] uppercase font-medium text-white select-none">
            The Camavinga{' '}
            <span className="text-gold">House</span>
          </a>

          <nav className="hidden lg:flex items-center gap-12">
            {[
              [t.navSalons, '#salon'],
              [t.navServices, '#services'],
              [t.navFranchise, '#franchise'],
              [t.navContact, '#contact'],
            ].map(([label, href]) => (
              <a
                key={label}
                href={href}
                className="nav-hover-line text-[11px] tracking-[0.2em] uppercase text-neutral-500 hover:text-white transition-colors duration-300"
              >
                {label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.15em]">
              <button
                onClick={() => setLang('fr')}
                className={`transition-colors duration-300 ${lang === 'fr' ? 'text-gold' : 'text-neutral-600 hover:text-neutral-400'}`}
              >
                FR
              </button>
              <span className="text-neutral-800 select-none">/</span>
              <button
                onClick={() => setLang('es')}
                className={`transition-colors duration-300 ${lang === 'es' ? 'text-gold' : 'text-neutral-600 hover:text-neutral-400'}`}
              >
                ES
              </button>
            </div>
            <a
              href="#services"
              className="text-[11px] font-medium tracking-[0.15em] uppercase px-6 py-3 border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-500"
            >
              {t.navBook}
            </a>
          </div>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </header>

      {/* ══════════════════════════════════════════
          HERO
      ══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center pt-20">
        {/* Ambient gold glow behind arches */}
        <div className="absolute left-[15%] top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gold/[0.03] blur-[150px] pointer-events-none" />

        <div className="max-w-[1400px] mx-auto px-8 w-full grid lg:grid-cols-[1fr_1.1fr] gap-16 xl:gap-24 items-center">

          {/* Arch images cluster - desktop */}
          <div className="relative h-[640px] hidden lg:block">
            {/* Arch 1 — barber (tallest, left) */}
            <div
              className="absolute top-0 left-0 anim-arch-rise anim-gold-shimmer"
              style={{
                width: 210,
                height: '100%',
                borderRadius: 9999,
                animationDelay: '0.2s',
              }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 9999 }}>
                <Image src="/images/barber.png" alt="Barber au travail" fill className="object-cover" priority />
              </div>
            </div>
            {/* Arch 2 — interior (medium, center-raised) */}
            <div
              className="absolute anim-arch-rise anim-gold-shimmer"
              style={{
                left: 230,
                top: 60,
                width: 185,
                height: 'calc(100% - 60px)',
                borderRadius: 9999,
                animationDelay: '0.45s',
              }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 9999 }}>
                <Image src="/images/interior.png" alt="Intérieur Camavinga House" fill className="object-cover" priority />
              </div>
            </div>
            {/* Arch 3 — camavinga (right, offset) */}
            <div
              className="absolute anim-arch-rise anim-gold-shimmer"
              style={{
                left: 435,
                top: 30,
                width: 185,
                height: 'calc(100% - 70px)',
                borderRadius: 9999,
                animationDelay: '0.7s',
              }}
            >
              <div className="relative w-full h-full overflow-hidden" style={{ borderRadius: 9999 }}>
                <Image src="/images/camavinga.png" alt="Eduardo Camavinga" fill className="object-cover" style={{ objectPosition: '30% top' }} priority />
              </div>
            </div>
          </div>

          {/* Hero image - mobile */}
          <div className="relative h-80 lg:hidden rounded-[3rem] overflow-hidden mt-24 anim-arch-rise anim-gold-shimmer" style={{ animationDelay: '0.2s' }}>
            <Image src="/images/interior.png" alt="Camavinga House" fill className="object-cover" priority />
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-8 lg:py-20">
            <span
              className="anim-text-up text-[10px] tracking-[0.4em] uppercase font-medium text-gold/70"
              style={{ animationDelay: '0.5s' }}
            >
              {t.heroTag}
            </span>

            <h1
              className="anim-text-up font-serif text-[3.2rem] xl:text-[4.2rem] 2xl:text-[4.8rem] font-light leading-[1.05] text-white"
              style={{ animationDelay: '0.65s' }}
            >
              {t.heroH1a}
              <br />
              <em className="text-gold">{t.heroH1b}</em>
            </h1>

            <div
              className="anim-text-up w-16 h-px bg-gradient-to-r from-gold/60 to-transparent"
              style={{ animationDelay: '0.8s' }}
            />

            <p
              className="anim-text-up text-neutral-500 leading-[1.8] max-w-[380px] text-[15px]"
              style={{ animationDelay: '0.85s' }}
            >
              {t.heroSub}
            </p>

            <div
              className="anim-text-up flex items-center gap-6 pt-2"
              style={{ animationDelay: '1s' }}
            >
              <a
                href="#services"
                className="inline-block px-8 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-gold hover:bg-gold-light transition-colors duration-500"
              >
                {t.heroCta}
              </a>
              <a
                href="#salon"
                className="group text-[11px] tracking-[0.15em] uppercase font-medium text-neutral-500 hover:text-gold transition-colors duration-300 inline-flex items-center gap-2"
              >
                {t.heroDiscover}
                <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 anim-fade-in anim-float hidden lg:flex flex-col items-center gap-3" style={{ animationDelay: '1.5s' }}>
          <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold/30 to-transparent" />
        </div>
      </section>

      {/* ══════════════════════════════════════════
          LE SALON
      ══════════════════════════════════════════ */}
      <section id="salon" className="relative">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 py-32 lg:py-40 grid lg:grid-cols-2 gap-20 items-center">
          <div className="flex flex-col gap-7 order-2 lg:order-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/60">
              {t.salonBadge}
            </span>
            <h2 className="font-serif text-4xl xl:text-[3.4rem] font-light leading-[1.1] text-white">
              {t.salonH2a}
              <br />
              <em className="text-gold/90">{t.salonH2b}</em>
            </h2>
            <div className="w-12 h-px bg-gold/30" />
            <p className="text-neutral-400 leading-[1.85] text-[15px] max-w-[420px]">
              {t.salonP}
            </p>
            <a
              href="#services"
              className="group self-start text-[11px] font-semibold tracking-[0.15em] uppercase text-white/80 inline-flex items-center gap-3 hover:text-gold transition-colors duration-300 mt-2"
            >
              {t.salonLink}
              <span className="inline-block w-8 h-px bg-current group-hover:w-12 transition-all duration-300" />
            </a>
          </div>

          <div className="relative order-1 lg:order-2">
            <div className="relative h-[560px] rounded-[2rem] overflow-hidden" style={{ boxShadow: '0 0 0 1px rgba(201,168,76,0.08), 0 40px 100px rgba(0,0,0,0.4)' }}>
              <Image src="/images/interior.png" alt="Intérieur Camavinga House" fill className="object-cover" />
            </div>
            {/* Decorative corner accent */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-gold/15" />
            <div className="absolute -top-4 -left-4 w-24 h-24 border-l border-t border-gold/15" />
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NOS ADRESSES
      ══════════════════════════════════════════ */}
      <section className="bg-[#080808]">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 py-20">
          <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/60 block mb-14">
            {t.addressesLabel}
          </span>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-0">
            {ADDRESSES.map((loc, idx) => (
              <div
                key={loc.n}
                className={`group py-8 ${idx > 0 ? 'lg:border-l border-neutral-800/60 lg:pl-10' : ''} ${loc.comingSoon ? 'opacity-50' : ''}`}
              >
                <div className="flex items-baseline gap-4 mb-1">
                  <span className="font-serif text-[13px] text-gold/30">{loc.n}</span>
                  <h3 className="font-serif text-[1.7rem] font-light text-white tracking-wide">{loc.city}</h3>
                </div>
                <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-neutral-600 ml-8">
                  {loc.district}
                </span>

                {loc.comingSoon ? (
                  <div className="mt-5 ml-8">
                    <span className="inline-block text-[9px] font-semibold uppercase tracking-[0.3em] px-3 py-1.5 border border-neutral-800 text-neutral-600">
                      Coming soon
                    </span>
                  </div>
                ) : (
                  <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-all duration-600 ease-out opacity-0 group-hover:opacity-100">
                    <div className="overflow-hidden">
                      <div className="pt-5 mt-4 ml-8 border-t border-neutral-800/50 flex flex-col gap-4">
                        <div>
                          <p className="text-[13px] text-neutral-400">{loc.address}</p>
                          <p className="text-[12px] text-neutral-600 mt-1">{loc.postal}</p>
                        </div>
                        {loc.hours && (
                          <ul className="flex flex-col gap-1.5">
                            {loc.hours.map(h => (
                              <li key={h.day} className="flex justify-between text-[11px] gap-4">
                                <span className={h.time === 'Fermé' ? 'text-neutral-700' : 'text-neutral-500'}>{h.day}</span>
                                <span className={h.time === 'Fermé' ? 'text-neutral-800' : 'text-neutral-300 tabular-nums'}>{h.time}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES
      ══════════════════════════════════════════ */}
      <section id="services" className="bg-neutral-950">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 py-32">

          <div className="mb-16 max-w-2xl">
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/60 block mb-5">
              {t.servicesLabel}
            </span>
            <h2 className="font-serif text-4xl xl:text-[3.2rem] font-light text-white leading-tight">
              {t.servicesH2}
            </h2>
          </div>

          {/* Salon tabs */}
          <div className="flex gap-0 mb-14">
            {SALON_TABS.map((tab, idx) => (
              <button
                key={tab.key}
                onClick={() => setSelectedSalon(tab.key)}
                className={`relative text-[11px] font-medium tracking-[0.12em] uppercase px-6 py-3.5 transition-all duration-300 ${
                  idx > 0 ? 'border-l border-neutral-800' : ''
                } ${
                  selectedSalon === tab.key
                    ? 'text-gold bg-gold/[0.04]'
                    : 'text-neutral-600 hover:text-neutral-300'
                }`}
              >
                {tab.label}
                {selectedSalon === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-px bg-gold anim-line-expand" />
                )}
              </button>
            ))}
          </div>

          {/* Services grid */}
          <div className="grid lg:grid-cols-2 gap-x-20 gap-y-12">
            {SERVICES_BY_SALON[selectedSalon].map(cat => (
              <div key={cat.category}>
                <p className="text-[9px] font-bold uppercase tracking-[0.4em] text-gold/40 mb-4 pb-4 border-b border-neutral-800/50">
                  {cat.category}
                </p>
                <ul>
                  {cat.items.map(item => (
                    <li key={item.name} className="service-row flex items-center justify-between py-3 border-b border-neutral-900 cursor-default">
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span className="text-[14px] text-neutral-200">{item.name}</span>
                        {item.sub && (
                          <span className="text-[11px] text-neutral-700 italic">{item.sub}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-6 shrink-0 ml-4">
                        <span className="text-[11px] text-neutral-700 tabular-nums">{item.duration}</span>
                        <span className="text-[14px] font-medium text-gold/80 tabular-nums w-14 text-right">
                          {item.price}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-16 flex justify-center">
            {(() => {
              const url = SALON_TABS.find(s => s.key === selectedSalon)?.bookingUrl
              if (!url) return (
                <span className="inline-block px-10 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase bg-neutral-900 text-neutral-700 cursor-not-allowed">
                  {t.servicesCta}
                </span>
              )
              const isExternal = url.startsWith('http')
              return (
                <a
                  href={url}
                  {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="inline-block px-10 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase border border-gold/30 text-gold hover:bg-gold hover:text-black transition-all duration-500"
                >
                  {t.servicesCta}
                </a>
              )
            })()}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NOTRE APPROCHE
      ══════════════════════════════════════════ */}
      <section className="bg-[#070707]">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 py-32">
          <div className="grid lg:grid-cols-[2fr_3fr] gap-20 items-start">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/60">
                {t.approcheLabel}
              </span>
              <h2 className="font-serif text-4xl xl:text-[3rem] font-light mt-5 mb-6 text-white leading-[1.15]">
                {t.approcheH2a}
                <br />
                <em className="text-gold/80">{t.approcheH2b}</em>
              </h2>
              <div className="w-12 h-px bg-gold/30 mb-6" />
              <p className="text-[14px] text-neutral-500 leading-[1.9] max-w-xs">
                {t.approcheP}
              </p>
            </div>

            <div className="grid sm:grid-cols-3 gap-10">
              {t.piliers.map((item) => (
                <div key={item.n} className="group">
                  <span className="block font-serif text-[4.5rem] font-light leading-none text-gold/[0.07] group-hover:text-gold/[0.15] transition-colors duration-500 mb-4">
                    {item.n}
                  </span>
                  <div className="w-8 h-px bg-gold/25 mb-5 group-hover:w-14 transition-all duration-500" />
                  <h3 className="font-serif text-[18px] font-medium text-white mb-3 tracking-wide">{item.title}</h3>
                  <p className="text-[13px] text-neutral-500 leading-[1.8]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          AVIS GOOGLE
      ══════════════════════════════════════════ */}
      <section className="bg-[#050505]">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 py-32">

          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8 mb-20">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/60">
                {t.avisLabel}
              </span>
              <h2 className="font-serif text-4xl xl:text-[3.2rem] font-light mt-4 text-white">
                {t.avisH2}
              </h2>
            </div>
            <div className="flex items-center gap-4 pb-1">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={GOLD} className="opacity-80">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>
              <span className="text-[13px] font-semibold text-white tabular-nums">5,0</span>
              <span className="text-[12px] text-neutral-600">· 4,8k avis</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.avis.map((review) => (
              <div key={review.name} className="review-card bg-[#0A0A0A] border border-neutral-800/40 p-10 flex flex-col gap-7">
                {/* Decorative quote mark */}
                <span className="font-serif text-[5rem] leading-none text-gold/[0.08] select-none -mb-12 -mt-2">
                  &ldquo;
                </span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill={GOLD} className="opacity-60">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  ))}
                </div>
                <p className="font-serif italic text-[16px] leading-[1.8] text-neutral-300/90 flex-1">
                  {review.text}
                </p>
                <div className="flex items-center justify-between pt-5 border-t border-neutral-800/40">
                  <span className="text-[12px] font-semibold tracking-[0.1em] uppercase text-white/90">{review.name}</span>
                  <span className="text-[11px] text-neutral-600">{review.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CTA BANNER
      ══════════════════════════════════════════ */}
      <section className="relative h-[550px] overflow-hidden">
        <Image src="/images/interieur salon 2.png" alt="Intérieur Camavinga House" fill className="object-cover object-center" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/65 to-black/85" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-transparent" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8 gap-6">
          <span className="text-[9px] tracking-[0.5em] uppercase font-medium text-gold/50">{t.ctaTag}</span>
          <h2 className="font-serif text-[2.8rem] xl:text-[3.5rem] font-light text-white leading-[1.1]">
            {t.ctaH2a}
            <br />
            <em className="text-gold/90">{t.ctaH2b}</em>
          </h2>
          <div className="w-12 h-px bg-gold/30 my-1" />
          <p className="text-white/40 text-[14px] max-w-xs leading-relaxed">
            {t.ctaP}
          </p>
          <a
            href="#services"
            className="inline-block px-10 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-gold hover:bg-gold-light transition-colors duration-500 mt-2"
          >
            {t.ctaBtn}
          </a>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FRANCHISE
      ══════════════════════════════════════════ */}
      <section id="franchise" className="bg-[#050505]">
        <div className="max-w-[1400px] mx-auto px-8 pt-32 pb-24">
          <div className="grid lg:grid-cols-2 gap-20 items-end mb-24">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/60">
                {t.franchiseLabel}
              </span>
              <h2 className="font-serif text-4xl xl:text-[3.2rem] font-light mt-5 leading-[1.1] text-white">
                {t.franchiseH2a}
                <br />
                <em className="text-gold/80">{t.franchiseH2b}</em>
              </h2>
            </div>
            <p className="text-neutral-400 leading-[1.85] text-[15px] lg:max-w-md">
              {t.franchiseP}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {t.franchisePillars.map((item, i) => (
              <div key={item.title} className="franchise-card bg-[#0A0A0A] border border-neutral-800/30 p-8 flex flex-col gap-5">
                <span className="font-serif text-[2.5rem] font-light text-gold/[0.12]">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-[14px] font-semibold text-white tracking-wide">{item.title}</h3>
                <p className="text-[13px] text-neutral-500 leading-[1.8]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />

        <div className="max-w-[1400px] mx-auto px-8 py-28 grid lg:grid-cols-2 gap-24">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/60">
              {t.modeleLabel}
            </span>
            <h3 className="font-serif text-[1.8rem] xl:text-[2.2rem] font-light mt-5 mb-7 leading-[1.2] text-white">
              {t.modeleH3a}
              <br />{t.modeleH3b}
            </h3>
            <p className="text-neutral-400 text-[14px] leading-[1.85] mb-10">
              {t.modeleP}
            </p>
            <ul className="flex flex-col gap-6">
              {t.modeleItems.map((text, i) => (
                <li key={i} className="flex items-start gap-4 text-[14px] text-neutral-400">
                  <span className="shrink-0 mt-0.5">
                    {i === 0 && (
                      <svg style={{ animation: 'icon-lift 2.4s ease-in-out infinite', color: GOLD }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 2C8.69 2 6 4.69 6 8c0 4.5 6 12 6 12s6-7.5 6-12c0-3.31-2.69-6-6-6z"/>
                        <circle cx="12" cy="8" r="2"/>
                      </svg>
                    )}
                    {i === 1 && (
                      <svg style={{ animation: 'icon-spin-slow 3s ease-in-out infinite', color: GOLD }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z"/>
                        <path d="M6 12v5c3 3 9 3 12 0v-5"/>
                      </svg>
                    )}
                    {i === 2 && (
                      <svg style={{ animation: 'icon-scale 2.8s ease-in-out infinite', color: GOLD }} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
                      </svg>
                    )}
                  </span>
                  {text}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.4em] text-gold/60">
              {t.candidatureLabel}
            </span>
            <p className="text-[14px] text-neutral-400 mt-5 mb-10 leading-relaxed">
              {t.candidatureP}
            </p>
            <form className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <input type="text" placeholder={t.formNom} className="form-input-gold bg-[#0A0A0A] border border-neutral-800/50 px-5 py-3.5 text-[13px] text-white placeholder:text-neutral-700 focus:outline-none transition-all" />
                <input type="email" placeholder={t.formEmail} className="form-input-gold bg-[#0A0A0A] border border-neutral-800/50 px-5 py-3.5 text-[13px] text-white placeholder:text-neutral-700 focus:outline-none transition-all" />
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <input type="tel" placeholder={t.formTel} className="form-input-gold bg-[#0A0A0A] border border-neutral-800/50 px-5 py-3.5 text-[13px] text-white placeholder:text-neutral-700 focus:outline-none transition-all" />
                <input type="text" placeholder={t.formVille} className="form-input-gold bg-[#0A0A0A] border border-neutral-800/50 px-5 py-3.5 text-[13px] text-white placeholder:text-neutral-700 focus:outline-none transition-all" />
              </div>
              <input type="text" placeholder={t.formParcours} className="form-input-gold bg-[#0A0A0A] border border-neutral-800/50 px-5 py-3.5 text-[13px] text-white placeholder:text-neutral-700 focus:outline-none transition-all" />
              <textarea rows={4} placeholder={t.formMessage} className="form-input-gold bg-[#0A0A0A] border border-neutral-800/50 px-5 py-3.5 text-[13px] text-white placeholder:text-neutral-700 focus:outline-none transition-all resize-none" />
              <button
                type="submit"
                className="self-start px-10 py-4 text-[11px] font-semibold tracking-[0.15em] uppercase text-black bg-gold hover:bg-gold-light transition-colors duration-500"
              >
                {t.formSubmit}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOOTER
      ══════════════════════════════════════════ */}
      <footer id="contact" className="bg-[#030303]">
        <div className="h-px bg-gradient-to-r from-transparent via-gold/10 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 py-20 grid md:grid-cols-3 gap-16">
          <div>
            <p className="font-serif text-[17px] tracking-[0.2em] uppercase font-medium text-white">
              The Camavinga{' '}
              <span className="text-gold">House</span>
            </p>
            <p className="text-neutral-500 text-[13px] mt-5 leading-[1.8]">
              {t.footerTagline}
              <br />
              Rennes &middot; Madrid.
            </p>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/40 mb-6">
              {t.footerNavLabel}
            </p>
            <ul className="flex flex-col gap-3.5">
              {t.footerNavItems.map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-[13px] text-neutral-600 hover:text-gold transition-colors duration-300">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-gold/40 mb-6">
              {t.footerContactLabel}
            </p>
            <p className="text-[13px] text-neutral-500">09.87.65.XX.XX</p>
            <p className="text-[13px] text-neutral-600 mt-1.5">Rennes &middot; Madrid</p>
            <a
              href="/dashboard"
              className="group text-[11px] text-neutral-700 hover:text-gold mt-10 inline-flex items-center gap-2 transition-colors duration-300"
            >
              {t.footerAdmin}
            </a>
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800/50 to-transparent" />
        <div className="max-w-[1400px] mx-auto px-8 py-8">
          <p className="text-[11px] text-neutral-700 tracking-wide">
            &copy; {new Date().getFullYear()} Camavinga House &mdash; {t.footerCopyright}
          </p>
        </div>
      </footer>

    </main>
  )
}
