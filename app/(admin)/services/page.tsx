import { services, categories, formatPrice, formatDuration } from '@/lib/mock-data'

export default function ServicesPage() {
  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Prestations</h1>
        <p className="text-sm text-neutral-400 mt-0.5">{services.length} prestations</p>
      </div>

      <div className="flex flex-col gap-8">
        {categories.map(cat => {
          const catServices = services.filter(s => s.categoryId === cat.id)
          if (catServices.length === 0) return null
          return (
            <div key={cat.id}>
              <h2 className="text-xs font-semibold uppercase tracking-widest text-neutral-400 mb-3">
                {cat.name}
              </h2>
              <div className="border border-neutral-100 rounded-xl overflow-hidden bg-white">
                {catServices.map((svc, i) => (
                  <div
                    key={svc.id}
                    className={`flex items-center justify-between gap-4 px-5 py-4 ${
                      i > 0 ? 'border-t border-neutral-100' : ''
                    }`}
                  >
                    <div>
                      <p className="text-sm font-medium text-neutral-900">{svc.name}</p>
                      <p className="text-xs text-neutral-400 mt-0.5">{svc.description}</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-sm font-bold text-neutral-900">{formatPrice(svc.priceCents)}</p>
                      <p className="text-xs text-neutral-400">{formatDuration(svc.durationMin)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
