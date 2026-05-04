export default function SimilarTitleCard({ item }) {
  const scoreColor =
    item.score >= 80 ? 'text-red-500 bg-red-50'
    : item.score >= 50 ? 'text-amber-500 bg-amber-50'
    : 'text-emerald-500 bg-emerald-50'

  return (
    <div className="flex items-center justify-between gap-4 rounded-lg border border-gray-100 bg-white px-4 py-3">
      <div className="min-w-0">
        <p className="truncate text-sm text-gray-700">{item.title}</p>
        <p className="text-xs text-gray-400 mt-0.5">{item.year}</p>
      </div>
      <span className={`flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${scoreColor}`}>
        {item.score}%
      </span>
    </div>
  )
}