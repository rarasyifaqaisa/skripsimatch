export default function AdvisorCard({ advisor, rank }) {
  const rankColor = ['text-amber-500', 'text-gray-400', 'text-orange-400'][rank]
  const loadPercent = Math.round((advisor.current_load / advisor.max_load) * 100)

  return (
    <div className="rounded-xl border border-gray-100 bg-white p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-50">
            <span className={`text-lg font-semibold ${rankColor}`}>#{rank + 1}</span>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800">{advisor.name}</p>
            <p className="mt-0.5 text-xs text-gray-400 line-clamp-1">{advisor.expertise}</p>
          </div>
        </div>
        <span className="flex-shrink-0 rounded-full bg-indigo-50 px-2.5 py-1 text-xs font-medium text-indigo-600">
          {advisor.match_score}% match
        </span>
      </div>
      <div className="mt-3">
        <div className="flex justify-between text-xs text-gray-400 mb-1">
          <span>Beban bimbingan</span>
          <span>{advisor.current_load}/{advisor.max_load} mahasiswa</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-100">
          <div
            className="h-1.5 rounded-full bg-indigo-400 transition-all"
            style={{ width: `${loadPercent}%` }}
          />
        </div>
      </div>
    </div>
  )
}