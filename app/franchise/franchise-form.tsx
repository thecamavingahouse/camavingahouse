'use client'

import { useState, type FormEvent } from 'react'
import { T } from '@/lib/site-copy'
import { franchiseEmail, shopText } from '@/lib/salons'
import { useLanguage } from '@/lib/use-language'

const feedback = {
  fr: { send: 'Envoyer ma candidature', draft: 'Préparer mon e-mail', instruction: 'Ton application e-mail va s’ouvrir. Envoie le message pour transmettre ta candidature.', pending: 'Envoi en cours…', sent: 'Ta candidature a bien été transmise.', retry: 'Le formulaire n’a pas pu transmettre ta candidature.', open: 'Ouvrir mon application e-mail', manual: 'Tu peux aussi envoyer ta candidature directement à', reply: 'Ces informations servent à te répondre au sujet de ton projet de franchise.' },
  es: { send: 'Enviar mi solicitud', draft: 'Preparar mi correo', instruction: 'Se abrirá tu aplicación de correo. Envía el mensaje para presentar tu solicitud.', pending: 'Enviando…', sent: 'Tu solicitud se ha enviado.', retry: 'El formulario no ha podido enviar tu solicitud.', open: 'Abrir mi aplicación de correo', manual: 'También puedes enviar tu candidatura a', reply: 'Utilizamos estos datos para responder a tu proyecto de franquicia.' },
  en: { send: 'Submit application', draft: 'Prepare my email', instruction: 'Your email app will open. Send the message to submit your application.', pending: 'Sending…', sent: 'Your application has been sent.', retry: 'The form could not send your application.', open: 'Open my email app', manual: 'You can also send your application directly to', reply: 'We use these details to reply about your franchise project.' },
}

export default function FranchiseForm({ direct }: { direct: boolean }) {
  const { lang } = useLanguage()
  const t = T[lang], copy = feedback[lang]
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'draft' | 'fallback'>('idle')
  const [draft, setDraft] = useState('')
  const inputs = [
    { name: 'name', label: t.formNom, type: 'text', max: 100, auto: 'name', required: true },
    { name: 'email', label: t.formEmail, type: 'email', max: 254, auto: 'email', required: true },
    { name: 'phone', label: t.formTel, type: 'tel', max: 35, auto: 'tel', required: false },
    { name: 'city', label: t.formVille, type: 'text', max: 150, auto: 'address-level2', required: true },
    { name: 'experience', label: t.formParcours, type: 'text', max: 1000, auto: 'off', required: false },
  ]
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'sending') return
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form))
    const body = [...inputs.map(field => field.label + ' : ' + data[field.name]), '', String(data.message)].join('\n')
    const mail = 'mailto:' + franchiseEmail + '?subject=' + encodeURIComponent('Candidature franchise — The Camavinga House') + '&body=' + encodeURIComponent(body)
    setDraft(mail)
    if (!direct) {
      setStatus('draft')
      window.location.href = mail
      return
    }
    setStatus('sending')
    try {
      const result = await fetch('/api/franchise', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (result.ok && (await result.json()).sent) {
        form.reset()
        setStatus('sent')
        return
      }
    } catch {}
    setStatus('fallback')
  }
  const inputClass = 'mt-2 block w-full rounded-sm border border-neutral-600 bg-neutral-950 px-4 py-3 text-white focus:outline-gold'
  return (
    <main className="min-h-screen bg-neutral-950 px-5 py-10 text-neutral-200 sm:px-8">
      <div className="mx-auto max-w-5xl">
        <a href={'/?lang=' + lang + '#salon'} className="text-sm text-gold underline">← {shopText[lang].back}</a>
        <div className="mt-12 grid items-start gap-12 md:grid-cols-2">
          <div>
            <p className="text-sm uppercase tracking-widest text-gold">{t.franchiseLabel}</p>
            <h1 className="my-5 font-serif text-5xl text-white">{t.franchiseH2a} {t.franchiseH2b}</h1>
            <p className="leading-relaxed">{t.franchiseP}</p>
            <h2 className="mt-8 font-serif text-2xl">{t.modeleH3a} {t.modeleH3b}</h2>
            <p className="mt-3 leading-relaxed">{t.modeleP}</p>
            <ul className="mt-4 list-disc space-y-2 pl-5">{t.modeleItems.map(item => <li key={item}>{item}</li>)}</ul>
          </div>
          <form onSubmit={submit} method="post" className="space-y-4 rounded-lg border border-neutral-700 p-5 sm:p-7">
            <h2 className="font-serif text-3xl text-white">{t.candidatureLabel}</h2>
            <p className="text-sm text-neutral-300">{copy.reply} {!direct && copy.instruction}</p>
            {inputs.map(field => <label key={field.name} className="block text-sm">{field.label}{field.required ? ' *' : ''}
              <input name={field.name} type={field.type} maxLength={field.max} autoComplete={field.auto} required={field.required} className={inputClass} />
            </label>)}
            <label className="block text-sm">{t.formMessage} *
              <textarea name="message" rows={4} required maxLength={2000} className={inputClass} />
            </label>
            <input type="hidden" name="website" defaultValue="" />
            <button type="submit" disabled={status === 'sending'} className="bg-gold px-6 py-3 font-semibold text-black disabled:opacity-70">{status === 'sending' ? copy.pending : direct ? copy.send : copy.draft}</button>
            <div aria-live="polite" className="text-sm">
              {status === 'sent' && <p>{copy.sent}</p>}
              {(status === 'draft' || status === 'fallback') && <div><p>{status === 'fallback' && copy.retry + ' '}{copy.instruction}</p><a href={draft} className="mt-2 inline-block text-gold underline">{copy.open}</a></div>}
            </div>
            <p className="text-sm">{copy.manual} <a className="break-all text-gold underline" href={'mailto:' + franchiseEmail}>{franchiseEmail}</a>.</p>
          </form>
        </div>
      </div>
    </main>
  )
}
