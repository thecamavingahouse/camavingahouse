import { NextResponse } from 'next/server'

const SESSION_MAX_AGE = 60 * 60 * 24 * 7 // 7 jours

export async function POST(req: Request) {
  const { idToken, dev } = await req.json()

  const response = NextResponse.json({ ok: true })
  const cookieOpts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: SESSION_MAX_AGE,
    path: '/',
  }

  // Mode dev sans Firebase configuré
  if (dev) {
    response.cookies.set('session', 'dev-session', cookieOpts)
    return response
  }

  // Vérification du token Firebase
  try {
    const { adminAuth } = await import('@/lib/firebase/admin')
    const decoded = await adminAuth.verifyIdToken(idToken)
    response.cookies.set('session', decoded.uid, cookieOpts)
    return response
  } catch {
    return NextResponse.json({ error: 'Token invalide' }, { status: 401 })
  }
}
