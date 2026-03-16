'use client'

import { useState } from 'react'

const DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche']

const defaultHours = [
  { day: 'Lundi',     open: true,  start: '09:00', end: '18:00' },
  { day: 'Mardi',     open: true,  start: '09:00', end: '18:00' },
  { day: 'Mercredi',  open: true,  start: '09:00', end: '18:00' },
  { day: 'Jeudi',     open: true,  start: '09:00', end: '18:00' },
  { day: 'Vendredi',  open: true,  start: '09:00', end: '18:00' },
  { day: 'Samedi',    open: true,  start: '09:00', end: '17:00' },
  { day: 'Dimanche',  open: false, start: '10:00', end: '14:00' },
]

export default function SettingsPage() {
  const [hours, setHours] = useState(defaultHours)
  const [saved, setSaved] = useState(false)

  function save() {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="p-8 max-w-2xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Paramètres</h1>
        <p className="text-sm text-neutral-400 mt-0.5">Configuration du salon</p>
      </div>

      {/* Infos générales */}
      <Section title="Informations du salon">
        <Field label="Nom du salon">
          <input defaultValue="Camavinga House" className={input} />
        </Field>
        <Field label="Téléphone">
          <input defaultValue="" placeholder="01 23 45 67 89" className={input} />
        </Field>
        <Field label="Email">
          <input defaultValue="" placeholder="contact@camavinga-house.fr" type="email" className={input} />
        </Field>
        <Field label="Adresse">
          <textarea defaultValue="" placeholder="12 rue de la Paix, 75001 Paris" rows={2} className={`${input} resize-none`} />
        </Field>
      </Section>

      {/* Horaires */}
      <Section title="Horaires d'ouverture">
        <div className="flex flex-col gap-3">
          {hours.map((h, i) => (
            <div key={h.day} className="flex items-center gap-3">
              {/* Toggle */}
              <button
                onClick={() => {
                  const next = [...hours]
                  next[i] = { ...next[i], open: !next[i].open }
                  setHours(next)
                }}
                className={`relative w-9 h-5 rounded-full transition-colors shrink-0 ${h.open ? 'bg-black' : 'bg-neutral-200'}`}
              >
                <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${h.open ? 'translate-x-4' : 'translate-x-0.5'}`} />
              </button>

              {/* Jour */}
              <span className={`text-sm w-20 shrink-0 ${h.open ? 'text-neutral-900 font-medium' : 'text-neutral-400'}`}>
                {h.day}
              </span>

              {/* Horaires */}
              {h.open ? (
                <div className="flex items-center gap-2">
                  <input
                    type="time"
                    value={h.start}
                    onChange={e => {
                      const next = [...hours]
                      next[i] = { ...next[i], start: e.target.value }
                      setHours(next)
                    }}
                    className="border border-neutral-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-black"
                  />
                  <span className="text-neutral-400 text-sm">–</span>
                  <input
                    type="time"
                    value={h.end}
                    onChange={e => {
                      const next = [...hours]
                      next[i] = { ...next[i], end: e.target.value }
                      setHours(next)
                    }}
                    className="border border-neutral-200 rounded-lg px-2 py-1 text-sm outline-none focus:border-black"
                  />
                </div>
              ) : (
                <span className="text-sm text-neutral-400 italic">Fermé</span>
              )}
            </div>
          ))}
        </div>
      </Section>

      {/* Notifications */}
      <Section title="Notifications automatiques">
        <Toggle label="Confirmation par email" description="Envoyée immédiatement après la réservation" defaultChecked />
        <Toggle label="Rappel email 24h avant" description="Email envoyé la veille du rendez-vous" defaultChecked />
        <Toggle label="Rappel SMS 2h avant" description="SMS envoyé 2h avant le rendez-vous" defaultChecked />
        <Toggle label="SMS d'annulation" description="Notifie le client si le RDV est annulé" defaultChecked />
      </Section>

      {/* Réservation en ligne */}
      <Section title="Réservation en ligne">
        <Toggle label="Activer la prise de RDV en ligne" description="Les clients peuvent réserver via le site" defaultChecked />
        <Toggle label="Confirmation automatique" description="Les RDV sont confirmés sans validation manuelle" defaultChecked />
        <Field label="Délai minimum avant RDV (heures)">
          <input type="number" defaultValue={2} min={0} className={`${input} w-24`} />
        </Field>
        <Field label="Jours disponibles à l'avance">
          <input type="number" defaultValue={30} min={7} className={`${input} w-24`} />
        </Field>
      </Section>

      {/* Sauvegarde */}
      <button
        onClick={save}
        className={`w-full py-3 rounded-full font-medium transition-colors ${
          saved ? 'bg-emerald-600 text-white' : 'bg-black text-white hover:bg-neutral-800'
        }`}
      >
        {saved ? '✓ Enregistré' : 'Enregistrer les modifications'}
      </button>
    </div>
  )
}

// ─── Composants locaux ────────────────────────────────────────────────────────

const input = 'w-full border border-neutral-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-black transition-colors'

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-8">
      <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-4">{title}</h2>
      <div className="flex flex-col gap-4">
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      {children}
    </div>
  )
}

function Toggle({ label, description, defaultChecked }: { label: string; description: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked ?? false)
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-sm font-medium text-neutral-800">{label}</p>
        <p className="text-xs text-neutral-400 mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => setChecked(!checked)}
        className={`relative w-10 h-5.5 h-[22px] rounded-full transition-colors shrink-0 ${checked ? 'bg-black' : 'bg-neutral-200'}`}
      >
        <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
      </button>
    </div>
  )
}
