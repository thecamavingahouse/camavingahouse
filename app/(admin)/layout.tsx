import Link from 'next/link'
import { LogoutButton } from '@/components/logout-button'

const NAV = [
  { href: '/dashboard',    label: 'Tableau de bord' },
  { href: '/appointments', label: 'Rendez-vous' },
  { href: '/staff',        label: 'Équipe' },
  { href: '/services',     label: 'Prestations' },
  { href: '/clients',      label: 'Clients' },
  { href: '/settings',     label: 'Paramètres' },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Sidebar */}
      <aside className="w-52 bg-white border-r border-neutral-100 flex flex-col shrink-0">
        <div className="px-5 py-5 border-b border-neutral-100">
          <span className="text-base font-bold tracking-tight">
            The Camavinga<span style={{ color: '#C9A84C' }}> House</span>
          </span>
          <p className="text-[10px] text-neutral-400 mt-0.5 uppercase tracking-widest">Admin</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-0.5">
          {NAV.map(item => (
            <Link
              key={item.href}
              href={item.href}
              className="block px-3 py-2 rounded-lg text-sm text-neutral-500 hover:text-neutral-900 hover:bg-neutral-50 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-neutral-100 flex flex-col gap-2">
          <Link href="/" className="text-xs text-neutral-400 hover:text-neutral-700">
            ← Voir le site
          </Link>
          <LogoutButton />
        </div>
      </aside>

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
