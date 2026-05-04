import numpy as np
from nlp.embeddings import encode_text, encode_batch

def cosine_similarity(vec_a: np.ndarray, vec_b: np.ndarray) -> float:
    dot = np.dot(vec_a, vec_b)
    norm = np.linalg.norm(vec_a) * np.linalg.norm(vec_b)
    if norm == 0:
        return 0.0
    return float(dot / norm)

def compare_one_to_many(query: str, candidates: list[str]) -> list[float]:
    query_vec = encode_text(query)
    candidate_vecs = encode_batch(candidates)
    scores = [cosine_similarity(query_vec, vec) for vec in candidate_vecs]
    return scores