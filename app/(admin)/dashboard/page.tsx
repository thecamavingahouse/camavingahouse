import { appointments, staff, getServiceById, formatPrice } from '@/lib/mock-data'
import Link from 'next/link'

const now      = new Date()
const todayStart = new Date(now); todayStart.setHours(0, 0, 0, 0)

// ─── Données ──────────────────────────────────────────────────────────────────
const todayRdv = appointments.filter(a => {
  const d = new Date(a.startsAt); d.setHours(0, 0, 0, 0)
  return d.getTime() === todayStart.getTime() && a.status !== 'cancelled'
})

const enRetard = appointments.filter(a => {
  const start = new Date(a.startsAt)
  return start < now && (a.status === 'confirmed' || a.status === 'pending')
})

const totalCA = appointments
  .filter(a => a.status === 'completed')
  .reduce((sum, a) => sum + (getServiceById(a.serviceId)?.priceCents ?? 0), 0)

// Chart : CA des 7 derniers jours
const chartDays = Array.from({ length: 7 }, (_, i) => {
  const d = new Date(); d.setDate(d.getDate() - (6 - i)); d.setHours(0, 0, 0, 0)
  const revenue = appointments
    .filter(a => {
      const s = new Date(a.startsAt); s.setHours(0, 0, 0, 0)
      return s.getTime() === d.getTime() && a.status === 'completed'
    })
    .reduce((sum, a) => sum + (getServiceById(a.serviceId)?.priceCents ?? 0), 0)
  return {
    label:   d.toLocaleDateString('fr-FR', { weekday: 'short' }),
    revenue,
    isToday: d.getTime() === todayStart.getTime(),
  }
})
const maxRevenue = Math.max(...chartDays.map(d => d.revenue), 1)

// Stats par coiffeur
const staffStats = staff.map(s => {
  const rdvs      = appointments.filter(a => a.staffId === s.id && a.status !== 'cancelled')
  const completed = appointments.filter(a => a.staffId === s.id && a.status === 'completed')
  const ca        = completed.reduce((sum, a) => sum + (getServiceById(a.serviceId)?.priceCents ?? 0), 0)
  return { ...s, rdvCount: rdvs.length, ca }
}).sort((a, b) => b.ca - a.ca)

const STATUS_LABEL: Record<string, string> = {
  confirmed: 'Confirmé', pending: 'En attente', completed: 'Terminé', cancelled: 'Annulé',
}
const STATUS_COLOR: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700',
  pending:   'bg-amber-50 text-amber-700',
  completed: 'bg-neutral-100 text-neutral-500',
  cancelled: 'bg-red-50 text-red-600',
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DashboardPage() {
  return (
    <div className="p-8 max-w-5xl space-y-8">

      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        <p className="text-sm text-neutral-400 mt-0.5">
          {now.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}
        </p>
      </div>

      {/* Alerte "en retard" */}
      {enRetard.length > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-xl px-5 py-3 flex items-center gap-3">
          <span className="text-amber-500 text-lg">⚠</span>
          <p className="text-sm text-amber-800 font-medium">
            {enRetard.length} rendez-vous {enRetard.length > 1 ? 'sont en retard' : 'est en retard'} — statut non mis à jour
          </p>
          <Link href="/appointments" className="ml-auto text-xs text-amber-700 underline underline-offset-2">
            Voir
          </Link>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <StatCard label="RDV aujourd'hui"   value={String(todayRdv.length)} />
        <StatCard label="CA total"           value={formatPrice(totalCA)} />
        <StatCard label="Coiffeurs actifs"   value="5" />
        <StatCard
          label="En retard"
          value={String(enRetard.length)}
          highlight={enRetard.length > 0}
        />
      </div>

      {/* Chart CA 7 jours */}
      <div className="bg-white border border-neutral-100 rounded-xl p-5">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-5">
          Chiffre d'affaires — 7 derniers jours
        </h2>
        <div className="flex items-end gap-2 h-24">
          {chartDays.map((day, i) => {
            const pct = maxRevenue > 0 ? (day.revenue / maxRevenue) * 100 : 0
            return (
              <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                <div className="w-full flex items-end" style={{ height: '72px' }}>
                  <div
                    className={`w-full rounded-t-md transition-all ${
                      day.isToday ? 'bg-black' : day.revenue > 0 ? 'bg-neutral-300' : 'bg-neutral-100'
                    }`}
                    style={{ height: `${Math.max(pct, day.revenue > 0 ? 8 : 4)}%` }}
                  />
                </div>
                <span className={`text-[10px] capitalize ${day.isToday ? 'font-bold text-neutral-900' : 'text-neutral-400'}`}>
                  {day.label}
                </span>
              </div>
            )
          })}
        </div>
        {maxRevenue <= 1 && (
          <p className="text-xs text-neutral-400 text-center mt-2">Aucun RDV terminé cette semaine</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Stats par coiffeur */}
        <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Performance équipe
            </h2>
          </div>
          {staffStats.map((s, i) => (
            <div key={s.id} className={`flex items-center gap-4 px-5 py-3 ${i > 0 ? 'border-t border-neutral-100' : ''}`}>
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
                style={{ backgroundColor: s.color }}
              >
                {s.firstName.slice(0, 2).toUpperCase()}
              </div>
              <span className="text-sm font-medium text-neutral-900 flex-1">{s.firstName}</span>
              <span className="text-xs text-neutral-400">{s.rdvCount} RDV</span>
              <span className="text-sm font-semibold text-neutral-900 w-16 text-right">
                {s.ca > 0 ? formatPrice(s.ca) : '—'}
              </span>
            </div>
          ))}
        </div>

        {/* Agenda du jour */}
        <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden">
          <div className="px-5 py-3 border-b border-neutral-100 bg-neutral-50">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400">
              Agenda du jour
            </h2>
          </div>
          {todayRdv.length === 0 ? (
            <p className="text-neutral-400 text-sm py-8 text-center">
              Aucun rendez-vous aujourd'hui.
            </p>
          ) : (
            todayRdv
              .sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime())
              .map((rdv, i) => {
                const service     = getServiceById(rdv.serviceId)
                const staffMember = staff.find(s => s.id === rdv.staffId)
                const dt          = new Date(rdv.startsAt)
                const timeLabel   = `${String(dt.getHours()).padStart(2,'0')}h${String(dt.getMinutes()).padStart(2,'0')}`
                const isPast      = dt < now && (rdv.status === 'confirmed' || rdv.status === 'pending')

                return (
                  <Link
                    key={rdv.id}
                    href={`/appointments/${rdv.id}`}
                    className={`flex items-center gap-3 px-5 py-3 ${i > 0 ? 'border-t border-neutral-100' : ''} hover:bg-neutral-50 transition-colors`}
                  >
                    <span className={`text-xs font-semibold w-10 shrink-0 ${isPast ? 'text-amber-500' : 'text-neutral-900'}`}>
                      {timeLabel}
                    </span>
                    <div className="w-0.5 h-6 rounded-full shrink-0" style={{ backgroundColor: staffMember?.color ?? '#ccc' }} />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate">{rdv.clientName}</p>
                      <p className="text-[10px] text-neutral-400 truncate">{service?.name} · {staffMember?.firstName}</p>
                    </div>
                    <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0 ${STATUS_COLOR[rdv.status]}`}>
                      {isPast && rdv.status !== 'completed' ? '⚠ Retard' : STATUS_LABEL[rdv.status]}
                    </span>
                  </Link>
                )
              })
          )}
        </div>
      </div>

    </div>
  )
}

function StatCard({ label, value, highlight = false }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`border rounded-xl p-5 ${highlight && value !== '0' ? 'bg-amber-50 border-amber-200' : 'bg-white border-neutral-100'}`}>
      <p className="text-xs text-neutral-400 uppercase tracking-widest mb-2">{label}</p>
      <p className={`text-2xl font-bold ${highlight && value !== '0' ? 'text-amber-700' : 'text-neutral-900'}`}>
        {value}
      </p>
    </div>
  )
}
