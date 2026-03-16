export type ServiceCategory = {
  id: string
  name: string
}

export type Service = {
  id: string
  categoryId: string
  name: string
  description: string
  durationMin: number
  priceCents: number
}

export type StaffMember = {
  id: string
  firstName: string
  lastName: string
  bio: string
  color: string
  serviceIds: string[]
  // day 0=Dim, 1=Lun … 6=Sam
  schedule: { day: number; start: string; end: string }[]
}

export type TimeSlot = {
  datetime: string // ISO
  label: string    // "09:00"
}

// ─── CATÉGORIES ───────────────────────────────────────────────────────────────
export const categories: ServiceCategory[] = [
  { id: 'cat-1', name: 'Coupes' },
  { id: 'cat-2', name: 'Colorations' },
  { id: 'cat-3', name: 'Soins' },
  { id: 'cat-4', name: 'Coiffage' },
]

// ─── PRESTATIONS ─────────────────────────────────────────────────────────────
export const services: Service[] = [
  { id: 'svc-1', categoryId: 'cat-1', name: 'Coupe Homme', description: 'Coupe + shampoing + brushing', durationMin: 30, priceCents: 2500 },
  { id: 'svc-2', categoryId: 'cat-1', name: 'Coupe Femme', description: 'Coupe + shampoing + brushing', durationMin: 60, priceCents: 4500 },
  { id: 'svc-3', categoryId: 'cat-1', name: 'Coupe Enfant', description: 'Pour les moins de 12 ans', durationMin: 30, priceCents: 1800 },
  { id: 'svc-4', categoryId: 'cat-2', name: 'Balayage', description: 'Balayage naturel et lumineux', durationMin: 120, priceCents: 9500 },
  { id: 'svc-5', categoryId: 'cat-2', name: 'Coloration complète', description: 'Coloration racines + longueurs', durationMin: 90, priceCents: 7500 },
  { id: 'svc-6', categoryId: 'cat-2', name: 'Mèches', description: 'Mèches fines ou larges', durationMin: 105, priceCents: 8500 },
  { id: 'svc-7', categoryId: 'cat-3', name: 'Soin kératine', description: 'Lissage et brillance intense', durationMin: 120, priceCents: 12000 },
  { id: 'svc-8', categoryId: 'cat-3', name: 'Masque hydratant', description: 'Soin nourrissant en profondeur', durationMin: 30, priceCents: 2000 },
  { id: 'svc-9', categoryId: 'cat-4', name: 'Brushing', description: 'Mise en forme sur cheveux lavés', durationMin: 45, priceCents: 3500 },
  { id: 'svc-10', categoryId: 'cat-4', name: 'Chignon', description: 'Chignon élégant pour événement', durationMin: 60, priceCents: 5500 },
]

// ─── ÉQUIPE ───────────────────────────────────────────────────────────────────
export const staff: StaffMember[] = [
  {
    id: 'staff-1',
    firstName: 'Dom',
    lastName: '',
    bio: 'Spécialiste colorations et soins.',
    color: '#6366f1',
    serviceIds: ['svc-1', 'svc-2', 'svc-4', 'svc-5', 'svc-6', 'svc-7', 'svc-8', 'svc-9'],
    schedule: [
      { day: 1, start: '09:00', end: '18:00' },
      { day: 2, start: '09:00', end: '18:00' },
      { day: 3, start: '09:00', end: '18:00' },
      { day: 4, start: '09:00', end: '18:00' },
      { day: 6, start: '09:00', end: '17:00' },
    ],
  },
  {
    id: 'staff-2',
    firstName: 'Fouch',
    lastName: '',
    bio: 'Expert en coupes et techniques modernes.',
    color: '#f59e0b',
    serviceIds: ['svc-1', 'svc-2', 'svc-3', 'svc-9'],
    schedule: [
      { day: 1, start: '10:00', end: '19:00' },
      { day: 2, start: '10:00', end: '19:00' },
      { day: 4, start: '10:00', end: '19:00' },
      { day: 5, start: '10:00', end: '19:00' },
      { day: 6, start: '09:00', end: '17:00' },
    ],
  },
  {
    id: 'staff-3',
    firstName: 'Enzo',
    lastName: '',
    bio: 'Passionné de coiffage et soins capillaires.',
    color: '#10b981',
    serviceIds: ['svc-1', 'svc-2', 'svc-3', 'svc-8', 'svc-9', 'svc-10'],
    schedule: [
      { day: 2, start: '09:00', end: '18:00' },
      { day: 3, start: '09:00', end: '18:00' },
      { day: 5, start: '09:00', end: '18:00' },
      { day: 6, start: '09:00', end: '17:00' },
    ],
  },
  {
    id: 'staff-4',
    firstName: 'Noa',
    lastName: '',
    bio: 'Spécialiste en colorations et balayages.',
    color: '#ec4899',
    serviceIds: ['svc-2', 'svc-4', 'svc-5', 'svc-6', 'svc-8', 'svc-9'],
    schedule: [
      { day: 1, start: '09:00', end: '18:00' },
      { day: 3, start: '09:00', end: '18:00' },
      { day: 4, start: '09:00', end: '18:00' },
      { day: 5, start: '09:00', end: '18:00' },
      { day: 6, start: '09:00', end: '17:00' },
    ],
  },
  {
    id: 'staff-5',
    firstName: 'Schatty',
    lastName: '',
    bio: 'Expert en soins kératine et chignons.',
    color: '#8b5cf6',
    serviceIds: ['svc-2', 'svc-7', 'svc-8', 'svc-9', 'svc-10'],
    schedule: [
      { day: 1, start: '10:00', end: '19:00' },
      { day: 2, start: '10:00', end: '19:00' },
      { day: 3, start: '10:00', end: '19:00' },
      { day: 5, start: '10:00', end: '19:00' },
      { day: 6, start: '09:00', end: '17:00' },
    ],
  },
]

// ─── HELPERS ─────────────────────────────────────────────────────────────────
export function formatPrice(cents: number) {
  return (cents / 100).toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' })
}

export function formatDuration(min: number) {
  if (min < 60) return `${min} min`
  const h = Math.floor(min / 60)
  const m = min % 60
  return m > 0 ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

export function getServiceById(id: string) {
  return services.find(s => s.id === id)
}

export function getStaffById(id: string) {
  return staff.find(s => s.id === id)
}

export function getStaffForService(serviceId: string) {
  return staff.filter(s => s.serviceIds.includes(serviceId))
}

/** Génère les créneaux disponibles pour un coiffeur + date + durée (sans vérifier les RDV existants) */
export function generateSlots(staffMember: StaffMember, date: Date, durationMin: number): TimeSlot[] {
  const dayOfWeek = date.getDay()
  const daySchedule = staffMember.schedule.find(s => s.day === dayOfWeek)
  if (!daySchedule) return []

  const slots: TimeSlot[] = []
  const [startH, startM] = daySchedule.start.split(':').map(Number)
  const [endH, endM] = daySchedule.end.split(':').map(Number)

  const startMinutes = startH * 60 + startM
  const endMinutes = endH * 60 + endM

  const now = new Date()
  const isToday = date.toDateString() === now.toDateString()

  for (let m = startMinutes; m + durationMin <= endMinutes; m += 15) {
    const slotH = Math.floor(m / 60)
    const slotM = m % 60

    // Ignorer les créneaux passés si c'est aujourd'hui
    if (isToday) {
      const slotTime = new Date(date)
      slotTime.setHours(slotH, slotM, 0, 0)
      if (slotTime <= now) continue
    }

    const label = `${String(slotH).padStart(2, '0')}:${String(slotM).padStart(2, '0')}`
    const dt = new Date(date)
    dt.setHours(slotH, slotM, 0, 0)

    slots.push({ datetime: dt.toISOString(), label })
  }

  return slots
}

// ─── RDV MOCK (pour le dashboard admin) ──────────────────────────────────────
export type Appointment = {
  id: string
  clientName: string
  clientPhone: string
  staffId: string
  serviceId: string
  startsAt: string // ISO
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed'
}

const today = new Date()
const d = (offsetDays: number, h: number, m = 0) => {
  const dt = new Date(today)
  dt.setDate(dt.getDate() + offsetDays)
  dt.setHours(h, m, 0, 0)
  return dt.toISOString()
}

export const appointments: Appointment[] = [
  { id: 'rdv-1', clientName: 'Sophie Dubois', clientPhone: '06 12 34 56 78', staffId: 'staff-1', serviceId: 'svc-2', startsAt: d(0, 10), status: 'confirmed' },
  { id: 'rdv-2', clientName: 'Marc Lefebvre', clientPhone: '06 98 76 54 32', staffId: 'staff-2', serviceId: 'svc-1', startsAt: d(0, 11), status: 'confirmed' },
  { id: 'rdv-3', clientName: 'Julie Moreau', clientPhone: '07 11 22 33 44', staffId: 'staff-1', serviceId: 'svc-4', startsAt: d(0, 14), status: 'confirmed' },
  { id: 'rdv-4', clientName: 'Thomas Petit', clientPhone: '06 55 66 77 88', staffId: 'staff-3', serviceId: 'svc-10', startsAt: d(0, 15, 30), status: 'pending' },
  { id: 'rdv-5', clientName: 'Emma Laurent', clientPhone: '07 44 55 66 77', staffId: 'staff-2', serviceId: 'svc-9', startsAt: d(1, 9, 30), status: 'confirmed' },
  { id: 'rdv-6', clientName: 'Lucas Simon', clientPhone: '06 33 44 55 66', staffId: 'staff-1', serviceId: 'svc-5', startsAt: d(1, 11), status: 'confirmed' },
  { id: 'rdv-7', clientName: 'Chloé Bernard', clientPhone: '07 22 11 00 99', staffId: 'staff-3', serviceId: 'svc-8', startsAt: d(2, 10), status: 'confirmed' },
  { id: 'rdv-8', clientName: 'Hugo Martin', clientPhone: '06 77 88 99 00', staffId: 'staff-2', serviceId: 'svc-1', startsAt: d(-1, 14), status: 'completed' },
]
