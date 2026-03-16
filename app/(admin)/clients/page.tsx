import { appointments, getServiceById, getStaffById } from '@/lib/mock-data'

const MONTHS = ['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc']

// Construire la liste clients depuis les RDV mock
const clientMap = new Map<string, {
  name: string
  phone: string
  visits: number
  lastVisit: Date
  totalSpent: number
}>()

for (const rdv of appointments) {
  const service = getServiceById(rdv.serviceId)
  const key = rdv.clientPhone
  const existing = clientMap.get(key)
  const dt = new Date(rdv.startsAt)
  if (existing) {
    existing.visits++
    if (dt > existing.lastVisit) existing.lastVisit = dt
    if (rdv.status === 'completed') existing.totalSpent += service?.priceCents ?? 0
  } else {
    clientMap.set(key, {
      name: rdv.clientName,
      phone: rdv.clientPhone,
      visits: 1,
      lastVisit: dt,
      totalSpent: rdv.status === 'completed' ? (service?.priceCents ?? 0) : 0,
    })
  }
}

const clients = [...clientMap.values()].sort((a, b) => b.lastVisit.getTime() - a.lastVisit.getTime())

export default function ClientsPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Clients</h1>
        <p className="text-sm text-neutral-400 mt-0.5">{clients.length} clients enregistrés</p>
      </div>

      <div className="border border-neutral-100 rounded-xl overflow-hidden bg-white">
        {/* Header */}
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-6 px-5 py-3 border-b border-neutral-100 bg-neutral-50">
          {['Client', 'Visites', 'Dernière visite', 'Total dépensé'].map(h => (
            <span key={h} className="text-xs font-semibold uppercase tracking-widest text-neutral-400">{h}</span>
          ))}
        </div>

        {clients.map((client, i) => (
          <div
            key={client.phone}
            className={`grid grid-cols-[1fr_auto_auto_auto] gap-6 items-center px-5 py-4 ${
              i > 0 ? 'border-t border-neutral-100' : ''
            } hover:bg-neutral-50 transition-colors`}
          >
            {/* Nom */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center text-xs font-bold text-neutral-500 shrink-0">
                {client.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-neutral-900">{client.name}</p>
                <p className="text-xs text-neutral-400">{client.phone}</p>
              </div>
            </div>

            {/* Visites */}
            <p className="text-sm text-neutral-700 text-center">{client.visits}</p>

            {/* Dernière visite */}
            <p className="text-sm text-neutral-500">
              {client.lastVisit.getDate()} {MONTHS[client.lastVisit.getMonth()]}
            </p>

            {/* Total */}
            <p className="text-sm font-medium text-neutral-900 text-right">
              {client.totalSpent > 0
                ? (client.totalSpent / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
                : '—'}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
