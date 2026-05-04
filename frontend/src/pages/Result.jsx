import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import SimilarityBadge from '../components/SimilarityBadge'
import AdvisorCard from '../components/AdvisorCard'
import SimilarTitleCard from '../components/SimilarTitleCard'
import { submitTitle } from '../api/analyze'

export default function Result() {
  const { state } = useLocation()
  const navigate = useNavigate()
  const [submitState, setSubmitState] = useState('idle') // idle | loading | success | error

  if (!state) {
    navigate('/')
    return null
  }

  const { result, title, studentName, prodi } = state

  async function handleSave() {
    setSubmitState('loading')
    try {
      await submitTitle(studentName, prodi, title)
      setSubmitState('success')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="mx-auto w-full max-w-lg space-y-6">

        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1 text-sm text-gray-400 hover:text-gray-600"
        >
          ← Analisis judul lain
        </button>

        {/* Info mahasiswa */}
        <div className="rounded-xl border border-gray-100 bg-white p-4 space-y-1">
          <div className="flex justify-between text-xs text-gray-400">
            <span>Mahasiswa</span>
            <span>Program Studi</span>
          </div>
          <div className="flex justify-between">
            <p className="text-sm font-medium text-gray-800">{studentName}</p>
            <p className="text-sm text-gray-500">{prodi}</p>
          </div>
          <div className="pt-2 border-t border-gray-50">
            <p className="text-xs text-gray-400 mb-0.5">Judul yang dianalisis</p>
            <p className="text-sm font-medium text-gray-800 leading-relaxed">{title}</p>
          </div>
        </div>

        <SimilarityBadge status={result.status} score={result.max_score} />

        {/* Tombol simpan */}
        {submitState === 'idle' && (
          <button
            onClick={handleSave}
            disabled={result.status === 'duplicate'}
            className="w-full rounded-xl border border-indigo-200 bg-indigo-50 py-3 text-sm font-medium text-indigo-600 transition hover:bg-indigo-100 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {result.status === 'duplicate'
              ? 'Tidak dapat disimpan — judul duplikasi'
              : 'Simpan & Ajukan Judul ini →'}
          </button>
        )}

        {submitState === 'loading' && (
          <div className="rounded-xl border border-gray-100 bg-white py-3 text-center text-sm text-gray-400">
            Menyimpan...
          </div>
        )}

        {submitState === 'success' && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
            <p className="text-sm font-medium text-emerald-700">Judul berhasil disimpan!</p>
            <p className="text-xs text-emerald-500 mt-0.5">
              Judul Anda kini masuk ke database dan akan menjadi referensi mahasiswa berikutnya.
            </p>
          </div>
        )}

        {submitState === 'error' && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-center">
            <p className="text-sm font-medium text-red-600">Gagal menyimpan. Coba lagi.</p>
          </div>
        )}

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-3">Rekomendasi Dosen Pembimbing</h2>
          <div className="space-y-2">
            {result.recommended_advisors.map((advisor, i) => (
              <AdvisorCard key={i} advisor={advisor} rank={i} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-medium text-gray-500 mb-3">Judul Serupa di Database</h2>
          <div className="space-y-2">
            {result.similar_titles.map((item, i) => (
              <SimilarTitleCard key={i} item={item} />
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}