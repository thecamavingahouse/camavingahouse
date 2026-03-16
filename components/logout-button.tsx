'use client'

import { useRouter } from 'next/navigation'

export function LogoutButton() {
  const router = useRouter()

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })

    // Déconnexion Firebase si configuré
    if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
      const { signOut } = await import('firebase/auth')
      const { auth } = await import('@/lib/firebase/client')
      await signOut(auth)
    }

    router.push('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="text-xs text-neutral-400 hover:text-neutral-700 text-left"
    >
      Se déconnecter
    </button>
  )
}
