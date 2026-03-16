'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
        // Mode dev sans Firebase — identifiants de démo
        await new Promise(r => setTimeout(r, 600))
        if (email !== 'admin@camavinga.fr' || password !== 'admin') {
          throw new Error('Email ou mot de passe incorrect.')
        }
        await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ dev: true }),
        })
      } else {
        // Mode Firebase Auth
        const { signInWithEmailAndPassword } = await import('firebase/auth')
        const { auth } = await import('@/lib/firebase/client')
        const cred = await signInWithEmailAndPassword(auth, email, password)
        const idToken = await cred.user.getIdToken()
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
        })
        if (!res.ok) throw new Error('Email ou mot de passe incorrect.')
      }

      router.push('/dashboard')
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Email ou mot de passe incorrect.'
      setError(msg)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-50 px-4">
      <div className="bg-white border border-neutral-100 rounded-2xl p-8 w-full max-w-sm shadow-sm">
        {/* Logo */}
        <div className="mb-8 text-center">
          <span className="text-2xl font-bold tracking-tight">
            The Camavinga<span style={{ color: '#C9A84C' }}> House</span>
          </span>
          <p className="text-xs text-neutral-400 mt-1 uppercase tracking-widest">Espace admin</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@camavinga.fr"
              required
              className="border border-neutral-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-neutral-700">Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="border border-neutral-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black transition-colors"
            />
          </div>

          {error && (
            <p className="text-xs text-red-500 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-black text-white py-3 rounded-full font-medium hover:bg-neutral-800 transition-colors disabled:opacity-50"
          >
            {loading ? 'Connexion…' : 'Se connecter'}
          </button>
        </form>

        <p className="text-xs text-neutral-400 text-center mt-6">
          <Link href="/" className="hover:text-neutral-700 underline underline-offset-2">
            ← Retour au site
          </Link>
        </p>

        {!process.env.NEXT_PUBLIC_FIREBASE_API_KEY && (
          <p className="text-[11px] text-neutral-300 text-center mt-4">
            Démo : admin@camavinga.fr / admin
          </p>
        )}
      </div>
    </div>
  )
}
