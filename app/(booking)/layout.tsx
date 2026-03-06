import Link from 'next/link'

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-50">
      <header className="bg-white border-b px-6 py-4">
        <Link href="/" className="text-xl font-bold tracking-tight">
          Camavinga House
        </Link>
      </header>
      {children}
    </div>
  )
}
