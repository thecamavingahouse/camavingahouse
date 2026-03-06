import Link from 'next/link'

const navItems = [
  { href: '/dashboard', label: 'Tableau de bord' },
  { href: '/appointments', label: 'Rendez-vous' },
  { href: '/staff', label: 'Équipe' },
  { href: '/services', label: 'Prestations' },
  { href: '/clients', label: 'Clients' },
  { href: '/settings', label: 'Paramètres' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r flex flex-col">
        <div className="p-6 border-b">
          <Link href="/" className="text-lg font-bold tracking-tight">
            Camavinga House
          </Link>
        </div>
        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <span className="text-xs text-neutral-400">Admin</span>
        </div>
      </aside>

      {/* Content */}
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
