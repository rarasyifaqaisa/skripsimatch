import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { analyzeTitle } from '../api/analyze'

const PRODI_LIST = [
  'Teknik Informatika',
  'Sistem Informasi',
  'Ilmu Komputer',
  'Teknik Komputer',
  'Manajemen Informatika',
]

export default function Home() {
  const [form, setForm] = useState({ name: '', prodi: '', title: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit() {
    if (!form.name.trim()) return setError('Nama mahasiswa wajib diisi.')
    if (!form.prodi) return setError('Program studi wajib dipilih.')
    if (form.title.trim().length < 10) return setError('Judul terlalu pendek. Minimal 10 karakter.')

    setError('')
    setLoading(true)
    try {
      const result = await analyzeTitle(form.title.trim())
      navigate('/result', {
        state: {
          result,
          title: form.title.trim(),
          studentName: form.name.trim(),
          prodi: form.prodi,
        }
      })
    } catch {
      setError('Gagal menghubungi server. Pastikan backend aktif.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-lg">

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-600 mb-4">
            <span className="text-white text-2xl">✦</span>
          </div>
          <h1 className="text-2xl font-semibold text-gray-800">SkripsiMatch</h1>
          <p className="mt-1 text-sm text-gray-400">
            Cek kemiripan judul & temukan dosen pembimbing terbaik
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-4">

          {/* Nama Mahasiswa */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nama Mahasiswa
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Masukkan nama lengkap Anda"
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            />
          </div>

          {/* Program Studi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Program Studi
            </label>
            <select
              name="prodi"
              value={form.prodi}
              onChange={handleChange}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
            >
              <option value="">Pilih program studi</option>
              {PRODI_LIST.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          {/* Judul Skripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Judul Skripsi
            </label>
            <textarea
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="Masukkan judul skripsi Anda di sini..."
              rows={4}
              className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-800 placeholder-gray-300 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
            />
            <p className="mt-1 text-right text-xs text-gray-300">{form.title.length} karakter</p>
          </div>

          {error && <p className="text-xs text-red-500">{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full rounded-xl bg-indigo-600 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
          >
            {loading ? 'Menganalisis...' : 'Analisis Judul →'}
          </button>
        </div>

        <p className="mt-4 text-center text-xs text-gray-300">
          Didukung NLP · sentence-transformers · cosine similarity
        </p>
      </div>
    </div>
  )
}