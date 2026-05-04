import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000'

export async function analyzeTitle(title) {
  const response = await axios.post(`${API_URL}/analyze`, { title })
  return response.data
}

export async function submitTitle(student_name, prodi, title) {
  const response = await axios.post(`${API_URL}/submit`, {
    student_name,
    prodi,
    title
  })
  return response.data
}