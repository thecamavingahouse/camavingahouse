export default function DashboardPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Tableau de bord</h1>
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "RDV aujourd'hui", value: '—' },
          { label: 'CA cette semaine', value: '—' },
          { label: 'Clients actifs', value: '—' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white border rounded-xl p-6">
            <p className="text-sm text-neutral-500 mb-1">{stat.label}</p>
            <p className="text-3xl font-bold">{stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
