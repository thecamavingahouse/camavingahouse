import { NextResponse, type NextRequest } from 'next/server'

const ADMIN_PATHS = [
  '/dashboard',
  '/appointments',
  '/staff',
  '/services',
  '/clients',
  '/settings',
]

export function middleware(request: NextRequest) {
  const isAdminRoute = ADMIN_PATHS.some(path =>
    request.nextUrl.pathname.startsWith(path)
  )

  if (!isAdminRoute) return NextResponse.next()

  // En dev sans Firebase configuré, laisser passer directement
  if (!process.env.NEXT_PUBLIC_FIREBASE_API_KEY) {
    return NextResponse.next()
  }

  // Vérifier le cookie de session
  const session = request.cookies.get('session')

  if (!session?.value) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
