'use client'

import { appointments, getServiceById, getStaffById, formatPrice, formatDuration } from '@/lib/mock-data'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const STATUS_LABEL: Record<string, string> = {
  confirmed: 'Confirmé',
  pending:   'En attente',
  completed: 'Terminé',
  cancelled: 'Annulé',
}
const STATUS_COLOR: Record<string, string> = {
  confirmed: 'bg-emerald-50 text-emerald-700 border-emerald-200',
  pending:   'bg-amber-50 text-amber-700 border-amber-200',
  completed: 'bg-neutral-100 text-neutral-500 border-neutral-200',
  cancelled: 'bg-red-50 text-red-600 border-red-200',
}
const DAYS_FR = ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi']
const MONTHS  = ['janvier','février','mars','avril','mai','juin','juillet','août','septembre','octobre','novembre','décembre']

export default function AppointmentDetailPage() {
  const { id } = useParams<{ id: string }>()
  const rdv = appointments.find(a => a.id === id)

  const [status, setStatus] = useState(rdv?.status ?? 'confirmed')
  const [notes, setNotes] = useState('')
  const [saved, setSaved] = useState(false)

  if (!rdv) {
    return (
      <div className="p-8">
        <p className="text-neutral-400">Rendez-vous introuvable.</p>
        <Link href="/appointments" className="text-sm underline mt-2 block">← Retour</Link>
      </div>
    )
  }

  const service = getServiceById(rdv.serviceId)!
  const staffMember = getStaffById(rdv.staffId)!
  const dt = new Date(rdv.startsAt)
  const endsAt = new Date(dt.getTime() + service.durationMin * 60000)
  const dateLabel = `${DAYS_FR[dt.getDay()]} ${dt.getDate()} ${MONTHS[dt.getMonth()]} · ${
    String(dt.getHours()).padStart(2,'0')}h${String(dt.getMinutes()).padStart(2,'0')} – ${
    String(endsAt.getHours()).padStart(2,'0')}h${String(endsAt.getMinutes()).padStart(2,'0')}`

  function saveNotes() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-2xl">
      {/* Retour */}
      <Link href="/appointments" className="text-sm text-neutral-400 hover:text-neutral-700 flex items-center gap-1 mb-6">
        ← Retour aux rendez-vous
      </Link>

      {/* En-tête */}
      <div className="flex items-start justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">{rdv.clientName}</h1>
          <p className="text-sm text-neutral-400 mt-0.5">{rdv.clientPhone}</p>
        </div>
        <span className={`text-xs font-medium px-3 py-1.5 rounded-full border ${STATUS_COLOR[status]}`}>
          {STATUS_LABEL[status]}
        </span>
      </div>

      {/* Détails RDV */}
      <div className="border border-neutral-100 rounded-xl bg-white divide-y divide-neutral-100 mb-6">
        <Row label="Prestation" value={service.name} />
        <Row label="Durée" value={formatDuration(service.durationMin)} />
        <Row label="Prix" value={formatPrice(service.priceCents)} bold />
        <Row label="Date & heure" value={dateLabel} />
        <Row
          label="Coiffeur"
          value={
            <span className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full inline-flex items-center justify-center text-white text-[9px] font-bold"
                style={{ backgroundColor: staffMember.color }}>
                {staffMember.firstName.slice(0,2).toUpperCase()}
              </span>
              {staffMember.firstName}
            </span>
          }
        />
      </div>

      {/* Changer le statut */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Statut</h2>
        <div className="flex flex-wrap gap-2">
          {(['confirmed','pending','completed','no_show','cancelled'] as const).map(s => (
            <button
              key={s}
              onClick={() => setStatus(s as any)}
              className={`text-sm px-4 py-2 rounded-full border transition-colors ${
                status === s ? 'bg-black text-white border-black' : 'border-neutral-200 text-neutral-600 hover:border-black'
              }`}
            >
              {s === 'no_show' ? 'Absent' : STATUS_LABEL[s] ?? s}
            </button>
          ))}
        </div>
      </div>

      {/* Notes internes */}
      <div className="mb-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">Notes internes</h2>
        <textarea
          value={notes}
          onChange={e => setNotes(e.target.value)}
          placeholder="Notes visibles uniquement par l'équipe…"
          rows={4}
          className="w-full border border-neutral-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-black transition-colors resize-none"
        />
        <button
          onClick={saveNotes}
          className={`mt-2 text-sm px-4 py-2 rounded-full transition-colors ${
            saved ? 'bg-emerald-600 text-white' : 'bg-black text-white hover:bg-neutral-800'
          }`}
        >
          {saved ? '✓ Sauvegardé' : 'Sauvegarder la note'}
        </button>
      </div>

      {/* Actions rapides */}
      <div className="flex gap-2">
        <button className="flex-1 text-sm py-2.5 rounded-full border border-neutral-200 hover:border-black transition-colors text-neutral-600">
          Envoyer un rappel SMS
        </button>
        <button className="flex-1 text-sm py-2.5 rounded-full border border-red-100 text-red-500 hover:border-red-400 transition-colors">
          Annuler le RDV
        </button>
      </div>
    </div>
  )
}

function Row({ label, value, bold }: { label: string; value: React.ReactNode; bold?: boolean }) {
  return (
    <div className="flex justify-between items-center gap-4 px-5 py-3.5">
      <span className="text-sm text-neutral-400 shrink-0">{label}</span>
      <span className={`text-sm text-right ${bold ? 'font-bold text-neutral-900' : 'text-neutral-700'}`}>{value}</span>
    </div>
  )
}
