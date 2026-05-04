EXISTING_TITLES = [
    {"id": 1, "title": "Sistem Deteksi Hoaks Berbasis Machine Learning pada Media Sosial", "year": 2023},
    {"id": 2, "title": "Klasifikasi Sentimen Ulasan Produk Menggunakan Deep Learning", "year": 2023},
    {"id": 3, "title": "Penerapan Computer Vision untuk Deteksi Kematangan Buah", "year": 2022},
    {"id": 4, "title": "Sistem Rekomendasi Film Berbasis Collaborative Filtering", "year": 2022},
    {"id": 5, "title": "Aplikasi Pengenalan Wajah Menggunakan Convolutional Neural Network", "year": 2023},
    {"id": 6, "title": "Optimasi Rute Pengiriman dengan Algoritma Genetika", "year": 2021},
    {"id": 7, "title": "Prediksi Harga Saham Menggunakan Long Short-Term Memory", "year": 2022},
    {"id": 8, "title": "Sistem Pakar Diagnosis Penyakit Tanaman Berbasis Fuzzy Logic", "year": 2021},
    {"id": 9, "title": "Analisis Topik Berita Online Menggunakan Latent Dirichlet Allocation", "year": 2023},
    {"id": 10, "title": "Klasifikasi Citra Medis untuk Deteksi Kanker Menggunakan Transfer Learning", "year": 2022},
    {"id": 11, "title": "Sistem Chatbot Layanan Akademik Berbasis Natural Language Processing", "year": 2023},
    {"id": 12, "title": "Prediksi Cuaca Menggunakan Recurrent Neural Network", "year": 2021},
    {"id": 13, "title": "Deteksi Plagiarisme Dokumen Akademik Berbasis Cosine Similarity", "year": 2022},
    {"id": 14, "title": "Sistem Pemantauan Kualitas Udara dengan IoT dan Machine Learning", "year": 2023},
    {"id": 15, "title": "Aplikasi Mobile Penerjemah Bahasa Isyarat Menggunakan CNN", "year": 2022},
]

ADVISORS = [
    {
        "id": 1,
        "name": "Dr. Andi Wijaya, M.Kom",
        "expertise": "machine learning, deep learning, neural networks, artificial intelligence, data mining",
        "current_load": 2,
        "max_load": 5
    },
    {
        "id": 2,
        "name": "Dr. Siti Rahayu, M.T",
        "expertise": "natural language processing, text mining, sentiment analysis, information retrieval",
        "current_load": 3,
        "max_load": 5
    },
    {
        "id": 3,
        "name": "Dr. Budi Santoso, M.Sc",
        "expertise": "computer vision, image processing, object detection, convolutional neural network",
        "current_load": 1,
        "max_load": 5
    },
    {
        "id": 4,
        "name": "Dr. Maya Indah, M.Kom",
        "expertise": "IoT, embedded systems, sensor networks, cloud computing, monitoring systems",
        "current_load": 4,
        "max_load": 5
    },
    {
        "id": 5,
        "name": "Dr. Rizal Fadli, M.T",
        "expertise": "optimization algorithms, genetic algorithm, operations research, scheduling",
        "current_load": 2,
        "max_load": 5
    },
]

def get_all_titles():
    return EXISTING_TITLES

def get_all_advisors():
    return ADVISORS