'use client'

import { staff, services, appointments, getServiceById, formatPrice } from '@/lib/mock-data'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useState } from 'react'

const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']
const DAYS_FULL = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi']
const MONTHS = ['jan','fév','mar','avr','mai','jun','jul','aoû','sep','oct','nov','déc']

export default function StaffDetailPage() {
  const { id } = useParams<{ id: string }>()
  const member = staff.find(s => s.id === id)

  if (!member) {
    return (
      <div className="p-8">
        <p className="text-neutral-400">Coiffeur introuvable.</p>
        <Link href="/staff" className="text-sm underline mt-2 block">← Retour</Link>
      </div>
    )
  }

  const memberServices = services.filter(s => member.serviceIds.includes(s.id))
  const memberRdv = appointments
    .filter(a => a.staffId === member.id)
    .sort((a, b) => new Date(b.startsAt).getTime() - new Date(a.startsAt).getTime())
    .slice(0, 5)

  return (
    <div className="p-8 max-w-3xl">
      <Link href="/staff" className="text-sm text-neutral-400 hover:text-neutral-700 flex items-center gap-1 mb-6">
        ← Retour à l&apos;équipe
      </Link>

      {/* Profil */}
      <div className="flex items-center gap-4 mb-8">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl shrink-0"
          style={{ backgroundColor: member.color }}
        >
          {member.firstName.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{member.firstName}</h1>
          <p className="text-sm text-neutral-400 mt-0.5">{member.bio}</p>
        </div>
      </div>

      {/* Planning hebdomadaire */}
      <Section title="Planning hebdomadaire">
        <div className="grid grid-cols-7 gap-1">
          {[0,1,2,3,4,5,6].map(day => {
            const s = member.schedule.find(sc => sc.day === day)
            return (
              <div key={day} className={`rounded-lg border p-2 text-center ${s ? 'border-neutral-200 bg-white' : 'border-neutral-100 bg-neutral-50'}`}>
                <p className="text-xs font-semibold text-neutral-500 mb-1">{DAYS[day]}</p>
                {s ? (
                  <>
                    <p className="text-[11px] text-neutral-700 font-medium">{s.start}</p>
                    <p className="text-[10px] text-neutral-400">{s.end}</p>
                  </>
                ) : (
                  <p className="text-[10px] text-neutral-300 mt-1">Off</p>
                )}
              </div>
            )
          })}
        </div>
      </Section>

      {/* Prestations */}
      <Section title={`Prestations (${memberServices.length})`}>
        <div className="flex flex-wrap gap-2">
          {memberServices.map(svc => (
            <span key={svc.id} className="text-xs bg-white border border-neutral-200 rounded-full px-3 py-1.5 text-neutral-700">
              {svc.name} · {formatPrice(svc.priceCents)}
            </span>
          ))}
        </div>
      </Section>

      {/* Derniers RDV */}
      <Section title="Derniers rendez-vous">
        {memberRdv.length === 0 ? (
          <p className="text-sm text-neutral-400">Aucun rendez-vous.</p>
        ) : (
          <div className="border border-neutral-100 rounded-xl overflow-hidden bg-white">
            {memberRdv.map((rdv, i) => {
              const svc = getServiceById(rdv.serviceId)
              const dt = new Date(rdv.startsAt)
              return (
                <Link
                  key={rdv.id}
                  href={`/appointments/${rdv.id}`}
                  className={`flex items-center justify-between px-4 py-3 hover:bg-neutral-50 transition-colors ${i > 0 ? 'border-t border-neutral-100' : ''}`}
                >
                  <div>
                    <p className="text-sm font-medium">{rdv.clientName}</p>
                    <p className="text-xs text-neutral-400">{svc?.name}</p>
                  </div>
                  <p className="text-xs text-neutral-400">
                    {dt.getDate()} {MONTHS[dt.getMonth()]} · {String(dt.getHours()).padStart(2,'0')}h{String(dt.getMinutes()).padStart(2,'0')}
                  </p>
                </Link>
              )
            })}
          </div>
        )}
      </Section>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">{title}</h2>
      {children}
    </div>
  )
}
