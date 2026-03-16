'use client'

import { create } from 'zustand'

export type BookingState = {
  serviceId: string | null
  staffId: string | null
  date: string | null       // ISO date string (date only)
  timeSlot: string | null   // ISO datetime string
  clientFirstName: string
  clientLastName: string
  clientPhone: string
  clientEmail: string
  clientNotes: string

  setService: (id: string) => void
  setStaff: (id: string) => void
  setDate: (date: string) => void
  setTimeSlot: (slot: string) => void
  setClientInfo: (info: Partial<Pick<BookingState, 'clientFirstName' | 'clientLastName' | 'clientPhone' | 'clientEmail' | 'clientNotes'>>) => void
  reset: () => void
}

const initial = {
  serviceId: null,
  staffId: null,
  date: null,
  timeSlot: null,
  clientFirstName: '',
  clientLastName: '',
  clientPhone: '',
  clientEmail: '',
  clientNotes: '',
}

export const useBooking = create<BookingState>((set) => ({
  ...initial,
  setService: (id) => set({ serviceId: id, staffId: null, date: null, timeSlot: null }),
  setStaff: (id) => set({ staffId: id, date: null, timeSlot: null }),
  setDate: (date) => set({ date, timeSlot: null }),
  setTimeSlot: (slot) => set({ timeSlot: slot }),
  setClientInfo: (info) => set(info),
  reset: () => set(initial),
}))
