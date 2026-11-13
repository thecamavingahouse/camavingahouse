'use client'

import { useState, useEffect } from 'react'
import type { Language } from './salons'

export function useLanguage() {
  const [lang, update] = useState<Language>('fr')
  useEffect(() => {
    const requested = new URLSearchParams(location.search).get('lang')
    let stored: string | null = null
    try { stored = sessionStorage.getItem('salon-language') } catch {}
    const initial = requested ?? stored
    const choice = initial === 'es' || initial === 'en' ? initial : 'fr'
    update(choice)
    document.documentElement.lang = choice
  }, [])

  function setLang(value: Language) {
    update(value)
    document.documentElement.lang = value
    try { sessionStorage.setItem('salon-language', value) } catch {}
    const url = new URL(location.href)
    if (value === 'fr') url.searchParams.delete('lang')
    else url.searchParams.set('lang', value)
    history.replaceState(history.state, '', url)
  }
  return { lang, setLang }
}
