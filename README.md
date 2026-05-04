<div align="center">

# ✦ SkripsiMatch
### AI-Powered Thesis Advisor Matching System

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://skripsimatch.vercel.app)
[![Backend](https://img.shields.io/badge/Backend-Hugging%20Face-yellow?style=for-the-badge&logo=huggingface)](https://racici-skripsimatch-backend.hf.space)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

**Membantu mahasiswa mengajukan judul skripsi secara cerdas — deteksi duplikasi otomatis, rekomendasi dosen berbasis AI, dalam hitungan detik.**

[Live Demo](https://skripsimatch.vercel.app) · [API Docs](https://racici-skripsimatch-backend.hf.space/docs) · [Laporan Bug](#)

</div>

---

## 🎯 Problem Statement

Di banyak kampus Indonesia, proses pengajuan judul skripsi masih dilakukan secara manual:

- Mahasiswa tidak tahu apakah judulnya sudah pernah dipakai
- Penentuan dosen pembimbing bersifat subjektif dan tidak merata
- Proses persetujuan memakan waktu hingga **2–4 minggu**

**SkripsiMatch** hadir sebagai solusi berbasis AI yang mengubah proses ini menjadi **kurang dari 5 menit**.

---

## ✨ Features

| Fitur | Deskripsi |
|---|---|
| 🔍 **Similarity Detection** | Mendeteksi kemiripan judul dengan database menggunakan cosine similarity |
| 👨‍🏫 **Advisor Matching** | Merekomendasikan 3 dosen pembimbing paling sesuai berdasarkan keahlian |
| 📊 **Uniqueness Score** | Skor keunikan judul 0–100% secara real-time |
| 💾 **Auto Database** | Judul yang disetujui otomatis masuk database sebagai referensi baru |
| 📱 **PWA** | Bisa diinstall di iPhone/Android seperti native app |

---

## 🧠 How the AI Works

SkripsiMatch menggunakan **semantic similarity** — bukan sekadar keyword matching. Artinya sistem memahami *makna* di balik judul, bukan hanya kata-katanya.

```
Input judul skripsi
       ↓
Sentence Transformer (all-MiniLM-L6-v2)
       ↓
Vector Embedding (384 dimensi)
       ↓
Cosine Similarity vs database judul & profil dosen
       ↓
┌─────────────────┬──────────────────┬─────────────────┐
│  Similarity      │  Status          │  Action         │
├─────────────────┼──────────────────┼─────────────────┤
│  > 80%           │  🔴 Duplikasi    │  Tolak          │
│  50% – 80%       │  🟡 Perlu Revisi │  Peringatan     │
│  < 50%           │  🟢 Unik         │  Setujui        │
└─────────────────┴──────────────────┴─────────────────┘
```

**Kenapa semantic similarity?**
Judul *"Deteksi Hoaks Menggunakan Machine Learning"* dan *"Klasifikasi Berita Palsu dengan Deep Learning"* secara kata berbeda, tapi maknanya sama. Keyword matching tidak bisa menangkap ini — semantic similarity bisa.

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────┐
│                    User (Mahasiswa)                  │
└───────────────────────┬─────────────────────────────┘
                        │ HTTPS
┌───────────────────────▼─────────────────────────────┐
│           Frontend — React PWA                       │
│           Vite · TailwindCSS · Vercel               │
└───────────────────────┬─────────────────────────────┘
                        │ REST API
┌───────────────────────▼─────────────────────────────┐
│           Backend — FastAPI (Python)                 │
│           Hugging Face Spaces · Docker              │
│  ┌─────────────────┐    ┌──────────────────────┐   │
│  │   NLP Engine    │    │      Database         │   │
│  │ sentence-trans  │    │   SQLite (titles +    │   │
│  │ cosine-sim      │    │   advisors)           │   │
│  └─────────────────┘    └──────────────────────┘   │
└─────────────────────────────────────────────────────┘
```

---

## 🛠️ Tech Stack

**Frontend**
- React 18 + Vite
- TailwindCSS
- React Router DOM
- Axios
- PWA (vite-plugin-pwa)

**Backend**
- Python + FastAPI
- sentence-transformers (`all-MiniLM-L6-v2`)
- scikit-learn (cosine similarity)
- SQLite

**Deployment**
- Frontend → Vercel
- Backend → Hugging Face Spaces (Docker)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### Installation

**Clone repository**
```bash
git clone https://github.com/rarasyifaqaisa/skripsimatch.git
cd skripsimatch
```

**Setup Backend**
```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

**Setup Frontend**
```bash
cd frontend
npm install
npm run dev
```

Buka `http://localhost:5173` di browser.

---

## 📁 Project Structure

```
skripsimatch/
├── frontend/                  # React PWA
│   ├── src/
│   │   ├── api/               # API layer
│   │   ├── components/        # UI components
│   │   └── pages/             # Home & Result page
│   └── vite.config.js
│
├── backend/                   # FastAPI Python
│   ├── nlp/
│   │   ├── embeddings.py      # Sentence encoding
│   │   ├── similarity.py      # Cosine similarity
│   │   └── matcher.py         # Main matching logic
│   ├── database/
│   │   ├── db.py              # SQLite operations
│   │   └── seed_data.py       # Advisor profiles
│   └── main.py                # API endpoints
│
└── README.md
```

---

## 📡 API Reference

**Base URL:** `https://racici-skripsimatch-backend.hf.space`

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check |
| `POST` | `/analyze` | Analisis judul skripsi |
| `POST` | `/submit` | Simpan judul ke database |
| `GET` | `/titles` | Daftar semua judul |

**POST /analyze**
```json
// Request
{ "title": "Sistem Deteksi Hoaks Berbasis Machine Learning" }

// Response
{
  "max_score": 84.2,
  "status": "duplicate",
  "similar_titles": [...],
  "recommended_advisors": [...]
}
```

---

## 💡 Key Learnings

Membangun SkripsiMatch mengajarkan saya bahwa:

1. **AI yang tepat > AI yang kompleks** — sentence-transformers dengan 80MB lebih useful daripada model besar yang lambat
2. **Real problem = real motivation** — masalah nyata di kampus membuat setiap baris kode terasa bermakna
3. **System design matters** — memisahkan NLP engine, API layer, dan database membuat kode mudah dikembangkan

---

## 👩‍💻 Author

**Rara Syifa Qaisa**
- GitHub: [@rarasyifaqaisa](https://github.com/rarasyifaqaisa)

---

## 📄 License

MIT License — feel free to use this project as reference.

---

<div align="center">
  <sub>Dibuat dengan ❤️ untuk Apple Developer Academy Portfolio</sub>
</div>