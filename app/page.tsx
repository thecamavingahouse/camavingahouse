import Link from 'next/link'

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b px-6 py-4 flex items-center justify-between max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight">Camavinga House</h1>
        <Link
          href="/book"
          className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-neutral-800 transition-colors"
        >
          Prendre RDV
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <p className="text-sm font-medium text-neutral-500 uppercase tracking-widest mb-4">
          Salon de Coiffure
        </p>
        <h2 className="text-5xl font-bold tracking-tight mb-6">
          Votre style, <br />
          votre rendez-vous.
        </h2>
        <p className="text-lg text-neutral-600 max-w-xl mx-auto mb-10">
          Réservez en ligne en quelques clics. Choisissez votre prestation, votre
          coiffeur et votre créneau — simple et rapide.
        </p>
        <Link
          href="/book"
          className="inline-block bg-black text-white px-8 py-3 rounded-full font-medium hover:bg-neutral-800 transition-colors"
        >
          Réserver maintenant
        </Link>
      </section>
    </main>
  )
}
