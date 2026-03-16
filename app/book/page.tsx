'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Script from 'next/script'

const GOLD = '#C9A84C'
const PLANITY_API_KEY = '-O-kAvcVByu_E3HeeGM6'

export default function BookPage() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return
    ;(window as Record<string, unknown>).planity = {
      key: PLANITY_API_KEY,
      primaryColor: GOLD,
      container: containerRef.current,
    }
  }, [])

  return (
    <main className="min-h-screen bg-[#050505] grain-overlay">

      {/* ── Navbar ── */}
      <header className="fixed inset-x-0 top-0 z-50 bg-[#050505]/80 backdrop-blur-md">
        <div className="max-w-[1400px] mx-auto px-8 h-20 flex items-center justify-between">
          <Link href="/" className="font-serif text-[17px] tracking-[0.2em] uppercase font-medium text-white select-none">
            The Camavinga{' '}
            <span className="text-gold">House</span>
          </Link>
          <Link
            href="/"
            className="group text-[11px] tracking-[0.15em] uppercase text-neutral-500 hover:text-gold transition-colors duration-300 flex items-center gap-2"
          >
            <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
            </svg>
            Retour
          </Link>
        </div>
        <div className="h-px bg-gradient-to-r from-transparent via-neutral-800 to-transparent" />
      </header>

      {/* ── Hero banner ── */}
      <div className="relative h-[280px] lg:h-[340px] overflow-hidden">
        <Image
          src="/images/interieur salon 2.png"
          alt="Intérieur Camavinga House"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-black/60 to-[#050505]" />
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-12 text-center px-8">
          <span className="text-[9px] font-semibold uppercase tracking-[0.5em] text-gold/50 mb-4">
            The Camavinga House &middot; Rennes
          </span>
          <h1 className="font-serif text-4xl xl:text-5xl font-light text-white leading-tight">
            Prendre <em className="text-gold/90">rendez-vous</em>
          </h1>
          <div className="w-10 h-px bg-gold/30 mt-6" />
        </div>
      </div>

      {/* ── Info bar ── */}
      <div className="border-y border-neutral-800/40 bg-[#080808]">
        <div className="max-w-[1000px] mx-auto px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-6 text-[11px] text-neutral-500">
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-gold/50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 0 1 15 0Z" />
              </svg>
              2 Passage Antoinette Caillot, 35000 Rennes
            </div>
            <span className="hidden sm:inline text-neutral-800">|</span>
            <div className="flex items-center gap-2">
              <svg className="w-3.5 h-3.5 text-gold/50" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
              Lun - Sam &middot; 10h - 20h
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <svg key={i} width="10" height="10" viewBox="0 0 24 24" fill={GOLD} className="opacity-60">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              ))}
            </div>
            <span className="text-[11px] text-neutral-400 font-medium">5,0</span>
            <span className="text-[11px] text-neutral-600">&middot; 4,8k avis</span>
          </div>
        </div>
      </div>

      {/* ── Widget ── */}
      <div className="max-w-[1000px] mx-auto px-8 py-14">
        <div
          ref={containerRef}
          id="planity-widget"
          className="min-h-[600px] rounded-xl overflow-hidden"
        />
      </div>

      {/* ── Footer minimal ── */}
      <footer className="border-t border-neutral-800/30">
        <div className="max-w-[1000px] mx-auto px-8 py-8 flex items-center justify-between">
          <p className="text-[11px] text-neutral-700">
            &copy; {new Date().getFullYear()} Camavinga House
          </p>
          <p className="text-[11px] text-neutral-700">
            Barbershop d&apos;exception
          </p>
        </div>
      </footer>

      {/* Planity scripts */}
      <Script
        src="https://d2skjte8udjqxw.cloudfront.net/widget/production/2/polyfills.latest.js"
        strategy="lazyOnload"
      />
      <Script
        src="https://d2skjte8udjqxw.cloudfront.net/widget/production/2/app.latest.js"
        strategy="lazyOnload"
      />
    </main>
  )
}
