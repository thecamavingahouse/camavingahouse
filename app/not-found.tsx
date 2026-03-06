import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <h2 className="text-2xl font-bold">Page introuvable</h2>
      <p className="text-neutral-500">Cette page n&apos;existe pas.</p>
      <Link href="/" className="text-sm underline underline-offset-4">
        Retour à l&apos;accueil
      </Link>
    </div>
  )
}
