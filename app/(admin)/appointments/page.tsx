'use client'

import { useState } from 'react'
import Link from 'next/link'
import { appointments, staff, services, getServiceById, getStaffById } from '@/lib/mock-data'
import type { Appointment } from '@/lib/mock-data'

// ─── Config ───────────────────────────────────────────────────────────────────
type View = 'day' | 'week' | 'month'
const H_START = 8
const H_END   = 20
const PX_H    = 64
const HOURS   = Array.from({ length: H_END - H_START }, (_, i) => H_START + i)
const MONTHS_FR  = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']
const DAYS_SHORT = ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam']

// ─── Types ───────────────────────────────────────────────────────────────────
type RDV = Appointment & {
  start: Date; durationMin: number
  staffColor: string; staffName: string; serviceName: string
}

function enrich(list: Appointment[]): RDV[] {
  return list.map(rdv => {
    const svc   = getServiceById(rdv.serviceId)
    const staff = getStaffById(rdv.staffId)
    return {
      ...rdv,
      start:       new Date(rdv.startsAt),
      durationMin: svc?.durationMin ?? 30,
      staffColor:  staff?.color ?? '#6b7280',
      staffName:   staff?.firstName ?? '—',
      serviceName: svc?.name ?? '—',
    }
  })
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
const isSameDay = (a: Date, b: Date) => a.toDateString() === b.toDateString()

function getMondayOf(d: Date): Date {
  const date = new Date(d); const day = date.getDay()
  date.setDate(date.getDate() - (day === 0 ? 6 : day - 1)); date.setHours(0,0,0,0); return date
}
function addDays(d: Date, n: number): Date {
  const date = new Date(d); date.setDate(date.getDate() + n); return date
}
function rdvTop(rdv: RDV)    { return Math.max(0, ((rdv.start.getHours() * 60 + rdv.start.getMinutes() - H_START * 60) * PX_H) / 60) }
function rdvHeight(rdv: RDV) { return Math.max(24, (rdv.durationMin * PX_H) / 60) }

// ─── Event block ─────────────────────────────────────────────────────────────
function EventBlock({ rdv }: { rdv: RDV }) {
  const h = rdvHeight(rdv)
  return (
    <Link
      href={`/appointments/${rdv.id}`}
      className="absolute inset-x-1 rounded-md overflow-hidden hover:brightness-95 transition-all z-10"
      style={{ top: rdvTop(rdv), height: h, backgroundColor: rdv.staffColor + '1a', border: `1px solid ${rdv.staffColor}30`, borderLeft: `3px solid ${rdv.staffColor}` }}
    >
      <div className="px-1.5 py-1 overflow-hidden h-full">
        <p className="text-[11px] font-semibold text-neutral-900 leading-tight truncate">{rdv.clientName}</p>
        {h >= 42 && <p className="text-[10px] text-neutral-500 truncate mt-0.5">{rdv.serviceName} · {rdv.staffName}</p>}
      </div>
    </Link>
  )
}

function HourAxis() {
  return (
    <div className="shrink-0 w-12 select-none">
      {HOURS.map(h => (
        <div key={h} className="relative" style={{ height: PX_H }}>
          <span className="absolute -top-2 right-2 text-[10px] text-neutral-400">{String(h).padStart(2,'0')}h</span>
        </div>
      ))}
    </div>
  )
}

function GridLines() {
  return <>
    {HOURS.map(h => <div key={h}    className="absolute inset-x-0 border-t border-neutral-100 pointer-events-none" style={{ top: (h-H_START)*PX_H }} />)}
    {HOURS.map(h => <div key={h+'h'} className="absolute inset-x-0 border-t border-neutral-50  pointer-events-none" style={{ top: (h-H_START)*PX_H + PX_H/2 }} />)}
  </>
}

// ─── Views ───────────────────────────────────────────────────────────────────
function DayView({ date, rdvs, onSlotClick }: { date: Date; rdvs: RDV[]; onSlotClick: (date: Date, hour: number) => void }) {
  const filtered = rdvs.filter(r => isSameDay(r.start, date))
  const totalH   = (H_END - H_START) * PX_H

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const relY  = e.clientY - rect.top
    const hour  = Math.floor(relY / PX_H) + H_START
    if (hour >= H_START && hour < H_END) onSlotClick(date, hour)
  }

  return (
    <div className="flex overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
      <HourAxis />
      <div className="flex-1 relative border-l border-neutral-100 cursor-pointer" style={{ height: totalH }} onClick={handleClick}>
        <GridLines />
        {filtered.map(rdv => <EventBlock key={rdv.id} rdv={rdv} />)}
        {filtered.length === 0 && <p className="absolute inset-0 flex items-center justify-center text-sm text-neutral-400 pointer-events-none">Aucun rendez-vous ce jour</p>}
      </div>
    </div>
  )
}

function WeekView({ monday, rdvs, onSlotClick }: { monday: Date; rdvs: RDV[]; onSlotClick: (date: Date, hour: number) => void }) {
  const days   = Array.from({ length: 7 }, (_, i) => addDays(monday, i))
  const today  = new Date()
  const totalH = (H_END - H_START) * PX_H

  return (
    <div className="flex flex-col">
      <div className="flex border-b border-neutral-100">
        <div className="shrink-0 w-12" />
        {days.map(day => {
          const isToday = isSameDay(day, today)
          return (
            <div key={day.toDateString()} className="flex-1 text-center py-2 border-l border-neutral-100">
              <p className="text-[10px] uppercase tracking-widest text-neutral-400">{DAYS_SHORT[day.getDay()]}</p>
              <p className={`text-sm font-semibold mt-0.5 w-7 h-7 flex items-center justify-center mx-auto rounded-full ${isToday ? 'bg-black text-white' : 'text-neutral-700'}`}>{day.getDate()}</p>
            </div>
          )
        })}
      </div>
      <div className="flex overflow-y-auto" style={{ maxHeight: 'calc(100vh - 240px)' }}>
        <HourAxis />
        {days.map(day => {
          const dayRdvs = rdvs.filter(r => isSameDay(r.start, day))
          return (
            <div
              key={day.toDateString()}
              className="flex-1 relative border-l border-neutral-100 cursor-pointer"
              style={{ height: totalH }}
              onClick={e => {
                const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
                const hour = Math.floor((e.clientY - rect.top) / PX_H) + H_START
                if (hour >= H_START && hour < H_END) onSlotClick(day, hour)
              }}
            >
              <GridLines />
              {dayRdvs.map(rdv => <EventBlock key={rdv.id} rdv={rdv} />)}
            </div>
          )
        })}
      </div>
    </div>
  )
}

function MonthView({ refDate, rdvs }: { refDate: Date; rdvs: RDV[] }) {
  const today     = new Date()
  const year      = refDate.getFullYear(); const month = refDate.getMonth()
  const gridStart = getMondayOf(new Date(year, month, 1))
  const cells     = Array.from({ length: 42 }, (_, i) => addDays(gridStart, i))

  return (
    <div>
      <div className="grid grid-cols-7 border-b border-neutral-100">
        {['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'].map(d => (
          <div key={d} className="py-2 text-center text-[10px] uppercase tracking-widest text-neutral-400 font-semibold">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((day, i) => {
          const isCurrentMonth = day.getMonth() === month
          const isToday        = isSameDay(day, today)
          const dayRdvs        = rdvs.filter(r => isSameDay(r.start, day))
          return (
            <div key={day.toDateString()} className={`min-h-[100px] p-1.5 border-b border-r border-neutral-100 ${!isCurrentMonth ? 'bg-neutral-50/50' : ''} ${i % 7 === 0 ? 'border-l' : ''}`}>
              <span className={`text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-black text-white' : isCurrentMonth ? 'text-neutral-700' : 'text-neutral-300'}`}>{day.getDate()}</span>
              <div className="space-y-0.5">
                {dayRdvs.slice(0, 3).map(rdv => (
                  <Link key={rdv.id} href={`/appointments/${rdv.id}`} className="block rounded px-1.5 py-0.5 text-[10px] font-medium truncate hover:opacity-80" style={{ backgroundColor: rdv.staffColor + '20', color: rdv.staffColor }}>
                    {rdv.clientName}
                  </Link>
                ))}
                {dayRdvs.length > 3 && <p className="text-[10px] text-neutral-400 px-1">+{dayRdvs.length - 3} autres</p>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Modal créer RDV ─────────────────────────────────────────────────────────
function CreateModal({ defaultDate, defaultHour, onClose }: { defaultDate: Date; defaultHour: number; onClose: () => void }) {
  const [staffId,   setStaffId]   = useState(staff[0].id)
  const [serviceId, setServiceId] = useState(services[0].id)
  const [clientName,  setClientName]  = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [date, setDate] = useState(() => {
    const d = new Date(defaultDate)
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`
  })
  const [hour, setHour] = useState(String(defaultHour).padStart(2,'0') + ':00')

  const availableServices = services.filter(s => {
    const member = staff.find(m => m.id === staffId)
    return member?.serviceIds.includes(s.id)
  })

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    // En mode mock, on affiche juste une confirmation
    alert(`RDV créé !\n${clientName} — ${getServiceById(serviceId)?.name} — ${date} à ${hour}\nCoiffeur : ${getStaffById(staffId)?.firstName}`)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-base font-bold">Nouveau rendez-vous</h2>
          <button onClick={onClose} className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-neutral-100 text-neutral-400 text-lg">×</button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date">
              <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="input" />
            </Field>
            <Field label="Heure">
              <input type="time" value={hour} onChange={e => setHour(e.target.value)} step={900} required className="input" />
            </Field>
          </div>

          <Field label="Coiffeur">
            <select value={staffId} onChange={e => { setStaffId(e.target.value); setServiceId('') }} className="input">
              {staff.map(s => <option key={s.id} value={s.id}>{s.firstName}</option>)}
            </select>
          </Field>

          <Field label="Prestation">
            <select value={serviceId} onChange={e => setServiceId(e.target.value)} className="input">
              {availableServices.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="Nom du client">
              <input type="text" value={clientName} onChange={e => setClientName(e.target.value)} placeholder="Marie Dupont" required className="input" />
            </Field>
            <Field label="Téléphone">
              <input type="tel" value={clientPhone} onChange={e => setClientPhone(e.target.value)} placeholder="06 00 00 00 00" className="input" />
            </Field>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 py-2.5 rounded-full border border-neutral-200 text-sm font-medium hover:bg-neutral-50 transition-colors">
              Annuler
            </button>
            <button type="submit" className="flex-1 py-2.5 rounded-full bg-black text-white text-sm font-medium hover:bg-neutral-800 transition-colors">
              Créer le RDV
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-medium text-neutral-600 mb-1 block">{label}</label>
      {children}
    </div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AppointmentsPage() {
  const [view,          setView]         = useState<View>('week')
  const [current,       setCurrent]      = useState(new Date())
  const [staffFilter,   setStaffFilter]  = useState<string | null>(null)
  const [modal,         setModal]        = useState<{ date: Date; hour: number } | null>(null)

  const allRDV = enrich(appointments)
  const filtered = staffFilter ? allRDV.filter(r => r.staffId === staffFilter) : allRDV

  function prev() {
    if (view === 'day')   setCurrent(d => addDays(d, -1))
    if (view === 'week')  setCurrent(d => addDays(d, -7))
    if (view === 'month') setCurrent(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  }
  function next() {
    if (view === 'day')   setCurrent(d => addDays(d, 1))
    if (view === 'week')  setCurrent(d => addDays(d, 7))
    if (view === 'month') setCurrent(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))
  }

  const monday = getMondayOf(current)
  const weekEnd = addDays(monday, 6)
  const title =
    view === 'day'   ? current.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })
    : view === 'week'  ? `${monday.getDate()} – ${weekEnd.getDate()} ${MONTHS_FR[weekEnd.getMonth()]} ${weekEnd.getFullYear()}`
    : `${MONTHS_FR[current.getMonth()]} ${current.getFullYear()}`

  function openModal(date: Date, hour: number) {
    setModal({ date, hour })
  }

  return (
    <div className="p-6 flex flex-col gap-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Rendez-vous</h1>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setModal({ date: new Date(), hour: 10 })}
            className="text-xs px-3 py-1.5 rounded-full bg-black text-white hover:bg-neutral-800 transition-colors font-medium"
          >
            + Nouveau RDV
          </button>
          <div className="flex bg-neutral-100 rounded-lg p-0.5">
            {(['day','week','month'] as View[]).map(v => (
              <button key={v} onClick={() => setView(v)} className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${view === v ? 'bg-white text-neutral-900 shadow-sm' : 'text-neutral-500 hover:text-neutral-700'}`}>
                {v === 'day' ? 'Jour' : v === 'week' ? 'Semaine' : 'Mois'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Filtre coiffeurs */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setStaffFilter(null)}
          className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium ${!staffFilter ? 'bg-black text-white border-black' : 'border-neutral-200 text-neutral-500 hover:border-neutral-400'}`}
        >
          Tous
        </button>
        {staff.map(s => (
          <button
            key={s.id}
            onClick={() => setStaffFilter(staffFilter === s.id ? null : s.id)}
            className={`text-xs px-3 py-1.5 rounded-full border transition-colors font-medium flex items-center gap-1.5 ${
              staffFilter === s.id ? 'text-white border-transparent' : 'border-neutral-200 text-neutral-600 hover:border-neutral-400'
            }`}
            style={staffFilter === s.id ? { backgroundColor: s.color, borderColor: s.color } : {}}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: staffFilter === s.id ? 'white' : s.color }} />
            {s.firstName}
          </button>
        ))}
      </div>

      {/* Navigation */}
      <div className="flex items-center gap-3">
        <button onClick={() => setCurrent(new Date())} className="text-xs px-3 py-1.5 rounded-lg border border-neutral-200 hover:bg-neutral-50 transition-colors font-medium">
          Aujourd'hui
        </button>
        <div className="flex items-center gap-1">
          <button onClick={prev} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-neutral-100 transition-colors text-neutral-600">‹</button>
          <button onClick={next} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-neutral-100 transition-colors text-neutral-600">›</button>
        </div>
        <h2 className="text-sm font-semibold text-neutral-800 capitalize">{title}</h2>
      </div>

      {/* Calendar */}
      <div className="bg-white border border-neutral-100 rounded-xl overflow-hidden flex-1">
        {view === 'day'   && <DayView   date={current}  rdvs={filtered} onSlotClick={openModal} />}
        {view === 'week'  && <WeekView  monday={monday} rdvs={filtered} onSlotClick={openModal} />}
        {view === 'month' && <MonthView refDate={current} rdvs={filtered} />}
      </div>

      {/* Modal */}
      {modal && <CreateModal defaultDate={modal.date} defaultHour={modal.hour} onClose={() => setModal(null)} />}

      {/* Styles input */}
      <style jsx global>{`
        .input {
          width: 100%;
          border: 1px solid #e5e7eb;
          border-radius: 0.5rem;
          padding: 0.5rem 0.75rem;
          font-size: 0.875rem;
          outline: none;
          transition: border-color 0.15s;
          background: white;
        }
        .input:focus { border-color: #000; }
      `}</style>
    </div>
  )
}
