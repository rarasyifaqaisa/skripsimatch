from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import datetime
from nlp.matcher import analyze_thesis_title
from database.db import init_db, save_title, get_all_titles

app = FastAPI(
    title="SkripsiMatch API",
    description="AI-powered thesis advisor matching system",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:4173",
        "https://skripsimatch.vercel.app",
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inisialisasi database saat server start
@app.on_event("startup")
def startup():
    init_db()

class ThesisInput(BaseModel):
    title: str

class SubmitInput(BaseModel):
    student_name: str
    prodi: str
    title: str

@app.get("/")
def root():
    return {"message": "SkripsiMatch API is running"}

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/analyze")
def analyze(input: ThesisInput):
    if len(input.title.strip()) < 10:
        raise HTTPException(status_code=400, detail="Judul terlalu pendek")
    return analyze_thesis_title(input.title.strip())

@app.post("/submit")
def submit(input: SubmitInput):
    year = datetime.now().year
    new_id = save_title(
        student_name=input.student_name.strip(),
        prodi=input.prodi.strip(),
        title=input.title.strip(),
        year=year
    )
    return {
        "success": True,
        "message": "Judul berhasil disimpan",
        "id": new_id
    }

@app.get("/titles")
def list_titles():
    return get_all_titles()