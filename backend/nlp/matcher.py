import numpy as np
from nlp.similarity import compare_one_to_many
from database.db import get_all_titles
from database.seed_data import get_all_advisors

DUPLICATE_THRESHOLD = 0.80
SIMILAR_THRESHOLD = 0.50

def analyze_thesis_title(new_title: str) -> dict:
    existing_titles = get_all_titles()      # sekarang dari SQLite
    advisors = get_all_advisors()

    title_texts = [t["title"] for t in existing_titles]
    advisor_texts = [a["expertise"] for a in advisors]

    title_scores = compare_one_to_many(new_title, title_texts)
    advisor_scores = compare_one_to_many(new_title, advisor_texts)

    top_title_idx = np.argsort(title_scores)[::-1][:3]
    max_score = title_scores[top_title_idx[0]]

    if max_score >= DUPLICATE_THRESHOLD:
        status = "duplicate"
    elif max_score >= SIMILAR_THRESHOLD:
        status = "similar"
    else:
        status = "unique"

    available_advisors = [
        (i, a) for i, a in enumerate(advisors)
        if a["current_load"] < a["max_load"]
    ]
    top_advisors = sorted(
        available_advisors,
        key=lambda x: advisor_scores[x[0]],
        reverse=True
    )[:3]

    return {
        "max_score": round(float(max_score) * 100, 1),
        "status": status,
        "similar_titles": [
            {
                "title": existing_titles[i]["title"],
                "year": existing_titles[i]["year"],
                "score": round(float(title_scores[i]) * 100, 1)
            }
            for i in top_title_idx
        ],
        "recommended_advisors": [
            {
                "name": advisors[i]["name"],
                "expertise": advisors[i]["expertise"],
                "match_score": round(float(advisor_scores[i]) * 100, 1),
                "current_load": advisors[i]["current_load"],
                "max_load": advisors[i]["max_load"]
            }
            for i, _ in top_advisors
        ]
    }