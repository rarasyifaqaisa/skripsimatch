export default function SimilarityBadge({ status, score }) {
  const config = {
    unique:    { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', label: 'Judul Unik' },
    similar:   { bg: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   label: 'Perlu Revisi' },
    duplicate: { bg: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     label: 'Duplikasi'    },
  }
  const c = config[status]

  return (
    <div className={`rounded-2xl border ${c.bg} ${c.border} p-6 text-center`}>
      <p className={`text-5xl font-semibold ${c.text}`}>{score}%</p>
      <p className={`mt-2 text-sm font-medium ${c.text}`}>Kemiripan tertinggi</p>
      <span className={`mt-3 inline-block rounded-full border px-4 py-1 text-xs font-medium ${c.bg} ${c.border} ${c.text}`}>
        {c.label}
      </span>
      <p className="mt-3 text-xs text-gray-400">
        {status === 'unique'    && 'Judul Anda cukup orisinal. Lanjutkan ke tahap berikutnya.'}
        {status === 'similar'   && 'Ada kemiripan sedang. Pertimbangkan untuk merevisi judul.'}
        {status === 'duplicate' && 'Judul terlalu mirip dengan yang sudah ada. Wajib direvisi.'}
      </p>
    </div>
  )
}