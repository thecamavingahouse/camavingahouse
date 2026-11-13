import type { Metadata } from 'next'
import FranchiseForm from './franchise-form'

export const dynamic = 'force-dynamic'
export const metadata: Metadata = {
  title: 'Candidature franchise',
  description: 'Présentez votre projet de franchise à The Camavinga House.',
}

export default function FranchisePage() {
  return <FranchiseForm direct={Boolean(process.env.RESEND_API_KEY && process.env.RESEND_FROM_EMAIL)} />
}
