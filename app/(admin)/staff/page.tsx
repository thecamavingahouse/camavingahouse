import { staff, services } from '@/lib/mock-data'
import Link from 'next/link'

const DAYS = ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam']

export default function StaffPage() {
  return (
    <div className="p-8 max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Équipe</h1>
        <p className="text-sm text-neutral-400 mt-0.5">{staff.length} coiffeurs</p>
      </div>

      <div className="flex flex-col gap-4">
        {staff.map(member => (
          <Link key={member.id} href={`/staff/${member.id}`} className="block bg-white border border-neutral-100 rounded-xl p-5 hover:border-neutral-300 transition-colors">
            <div className="flex items-start gap-4">
              {/* Avatar */}
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-base shrink-0"
                style={{ backgroundColor: member.color }}
              >
                {member.firstName.slice(0, 2).toUpperCase()}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <h2 className="font-semibold text-neutral-900">{member.firstName}</h2>
                  <span className="text-xs text-neutral-400 bg-neutral-50 border border-neutral-100 rounded-full px-2.5 py-1">
                    {member.serviceIds.length} prestation{member.serviceIds.length > 1 ? 's' : ''}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 mt-0.5">{member.bio}</p>

                {/* Planning */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {member.schedule.map(s => (
                    <span key={s.day} className="text-xs bg-neutral-50 border border-neutral-100 rounded-md px-2 py-0.5 text-neutral-600">
                      {DAYS[s.day]} {s.start}–{s.end}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
