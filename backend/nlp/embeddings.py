from sentence_transformers import SentenceTransformer
import numpy as np

model = SentenceTransformer('all-MiniLM-L6-v2')

def encode_text(text: str) -> np.ndarray:
    return model.encode([text])[0]

def encode_batch(texts: list[str]) -> np.ndarray:
    return model.encode(texts)