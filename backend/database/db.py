import sqlite3
import os

DB_PATH = os.path.join(os.path.dirname(__file__), "thesis.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_connection()
    cursor = conn.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS titles (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_name TEXT NOT NULL,
            prodi TEXT NOT NULL,
            title TEXT NOT NULL,
            year INTEGER NOT NULL
        )
    """)

    # Seed data awal hanya jika tabel masih kosong
    cursor.execute("SELECT COUNT(*) FROM titles")
    count = cursor.fetchone()[0]

    if count == 0:
        seed = [
            ("Admin", "Teknik Informatika", "Sistem Deteksi Hoaks Berbasis Machine Learning pada Media Sosial", 2023),
            ("Admin", "Teknik Informatika", "Klasifikasi Sentimen Ulasan Produk Menggunakan Deep Learning", 2023),
            ("Admin", "Teknik Informatika", "Penerapan Computer Vision untuk Deteksi Kematangan Buah", 2022),
            ("Admin", "Sistem Informasi", "Sistem Rekomendasi Film Berbasis Collaborative Filtering", 2022),
            ("Admin", "Teknik Informatika", "Aplikasi Pengenalan Wajah Menggunakan Convolutional Neural Network", 2023),
            ("Admin", "Sistem Informasi", "Optimasi Rute Pengiriman dengan Algoritma Genetika", 2021),
            ("Admin", "Teknik Informatika", "Prediksi Harga Saham Menggunakan Long Short-Term Memory", 2022),
            ("Admin", "Sistem Informasi", "Sistem Pakar Diagnosis Penyakit Tanaman Berbasis Fuzzy Logic", 2021),
            ("Admin", "Teknik Informatika", "Analisis Topik Berita Online Menggunakan Latent Dirichlet Allocation", 2023),
            ("Admin", "Teknik Informatika", "Klasifikasi Citra Medis untuk Deteksi Kanker Menggunakan Transfer Learning", 2022),
            ("Admin", "Sistem Informasi", "Sistem Chatbot Layanan Akademik Berbasis Natural Language Processing", 2023),
            ("Admin", "Teknik Informatika", "Prediksi Cuaca Menggunakan Recurrent Neural Network", 2021),
            ("Admin", "Sistem Informasi", "Deteksi Plagiarisme Dokumen Akademik Berbasis Cosine Similarity", 2022),
            ("Admin", "Teknik Informatika", "Sistem Pemantauan Kualitas Udara dengan IoT dan Machine Learning", 2023),
            ("Admin", "Teknik Informatika", "Aplikasi Mobile Penerjemah Bahasa Isyarat Menggunakan CNN", 2022),
        ]
        cursor.executemany(
            "INSERT INTO titles (student_name, prodi, title, year) VALUES (?, ?, ?, ?)",
            seed
        )

    conn.commit()
    conn.close()

def get_all_titles():
    conn = get_connection()
    rows = conn.execute("SELECT * FROM titles").fetchall()
    conn.close()
    return [dict(row) for row in rows]

def save_title(student_name: str, prodi: str, title: str, year: int) -> int:
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO titles (student_name, prodi, title, year) VALUES (?, ?, ?, ?)",
        (student_name, prodi, title, year)
    )
    conn.commit()
    new_id = cursor.lastrowid
    conn.close()
    return new_id