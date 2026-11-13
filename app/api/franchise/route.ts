import { createHash } from 'node:crypto'
import { franchiseEmail } from '@/lib/salons'

const limits = { name: 100, email: 254, phone: 35, city: 150, experience: 1000, message: 2000 } as const
type Fields = Record<keyof typeof limits, string>

export async function POST(request: Request) {
  if (!request.headers.get('content-type')?.startsWith('application/json')) {
    return new Response(null, { status: 415 })
  }
  if (request.headers.get('origin') && request.headers.get('origin') !== new URL(request.url).origin) {
    return new Response(null, { status: 403 })
  }
  const body = await request.text()
  if (body.length > 12000) return new Response(null, { status: 413 })
  let data
  try { data = JSON.parse(body) } catch { return new Response(null, { status: 400 }) }
  if (!data || typeof data !== 'object') return new Response(null, { status: 400 })
  if (data.website) return Response.json({ sent: true })
  const fields = {} as Fields
  for (const key of Object.keys(limits) as (keyof Fields)[]) {
    if (typeof data[key] !== 'string' || data[key].length > limits[key]) return new Response(null, { status: 400 })
    fields[key] = data[key].trim()
  }
  if (!fields.name || !fields.city || !fields.message || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    return new Response(null, { status: 400 })
  }
  const apiKey = process.env.RESEND_API_KEY
  const from = process.env.RESEND_FROM_EMAIL
  if (!apiKey || !from) return Response.json({ sent: false }, { status: 503 })
  // Identical retries reuse the provider's delivery instead of sending twice.
  const id = createHash('sha256').update(JSON.stringify(fields)).digest('hex')
  try {
    const reply = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: 'Bearer ' + apiKey, 'Content-Type': 'application/json', 'Idempotency-Key': 'franchise/' + id },
      body: JSON.stringify({
        from, to: [franchiseEmail], reply_to: fields.email,
        subject: 'Candidature franchise — The Camavinga House',
        text: ['Nom : ' + fields.name, 'E-mail : ' + fields.email, 'Téléphone : ' + fields.phone,
          'Ville / pays : ' + fields.city, 'Parcours : ' + fields.experience, '', fields.message].join('\n'),
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (reply.ok && (await reply.json()).id) return Response.json({ sent: true })
  } catch {}
  return Response.json({ sent: false }, { status: 503 })
}
