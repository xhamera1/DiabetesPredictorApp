from fastapi import FastAPI, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
from pathlib import Path


# uruchamianie aplikacji:
# w folderze ~/Desktop/MyProjects/DiabetesPredictor/DiabetesPredictorApp/ai-service
#   $ cd ~/Desktop/MyProjects/DiabetesPredictor/DiabetesPredictorApp/ai-service
# komenda: 
#   $ python -m uvicorn app.main:app --reload --port 8000



app = FastAPI(title="Diabetes AI Service", version="1.0.0")

app.add_middleware(
    CORSMiddleware, # middleware do obslugi CORS - wymiana zasobow miedzy roznymi domenami
    allow_origins=["http://localhost:8080", "http://localhost:5173"], # dozwolone endpointy ktore beda mialy dostep do API
    allow_credentials=True, # zezwolenie na przesylanie ciasteczek i naglowkow uwierzytelniajacych
    allow_methods=["POST", "OPTIONS"], # dozwolone metody HTTP
    allow_headers=["*"], # dozwolone naglowki
)

BASE_DIR = Path(__file__).resolve().parents[1]
MODEL_PATH = BASE_DIR / "trained_models" / "diabetes-random_forest_model.pkl"
MODEL = joblib.load(MODEL_PATH)

FEATURES = ["hba1c_level", "blood_glucose_level", "bmi", "age", "smoking_history"]

def validate(payload: dict) -> list[float]:
    missing = [f for f in FEATURES if f not in payload]
    if missing:
        raise HTTPException(status_code=422, detail=f"Missing fields: {missing}")
    try:
        hba1c = float(payload["hba1c_level"])
        glucose = int(payload["blood_glucose_level"])
        bmi = float(payload["bmi"])
        age = float(payload["age"])
        smoking = int(payload["smoking_history"])
    except Exception as e:
        raise HTTPException(status_code=422, detail=f"Type casting error: {e}")

    if not (3.0 <= hba1c <= 20.0): raise HTTPException(422, "hba1c_level out of range")
    if not (40 <= glucose <= 500): raise HTTPException(422, "blood_glucose_level out of range")
    if not (10 <= bmi <= 80): raise HTTPException(422, "bmi out of range")
    if not (0 <= age <= 120): raise HTTPException(422, "age out of range")
    if smoking < 0: raise HTTPException(422, "smoking_history must be >= 0")

    return [hba1c, glucose, bmi, age, smoking]

@app.post("/v1/predict")
async def predict(request: Request):
    payload = await request.json()
    feats = validate(payload)
    X = np.array(feats, dtype=float).reshape(1, -1)
    try:
        label = int(MODEL.predict(X)[0])
        proba = float(MODEL.predict_proba(X)[0][1])
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Inference error: {e}")
    return {"prediction": label, "probability": proba}
