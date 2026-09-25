from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
import pandas as pd
from pathlib import Path
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://vehicle-insurance-fraud-ml-2.onrender.com",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
MODEL_PATH = BASE_DIR / "model" / "vehicle_fraud_final_model.pkl"
DATASET_PATH = BASE_DIR.parent / "insurance_fraud_data.csv"

model = joblib.load(MODEL_PATH)
print("MODEL TYPE:", type(model))

if hasattr(model, "feature_names_in_"):
    print("MODEL FEATURES:")
    print(model.feature_names_in_)
    
class VehicleData(BaseModel):
    age_of_driver: int
    safety_rating: int
    annual_income: float
    high_education: int
    address_change: int
    property_status: str
    claim_date: str
    claim_day_of_week: str
    accident_site: str
    past_num_of_claims: int
    witness_present: int
    liab_prct: float
    channel: str
    police_report: int
    age_of_vehicle: int
    vehicle_category: str
    vehicle_price: float
    total_claim: float
    injury_claim: float
    policy_deductible: float
    annual_premium: float
    days_open: float
    form_defects: int

def get_dataset():
    if DATASET_PATH.exists():
        return pd.read_csv(DATASET_PATH)
    return None

@app.get("/")
def home():
    return {"message": "Vehicle Fraud Detection API is running"}


@app.post("/predict")
def predict(data: VehicleData):
    input_data = pd.DataFrame([
        {
            "age_of_driver": data.age_of_driver,
            "safety_rating": data.safety_rating,
            "annual_income": data.annual_income,
            "high_education": data.high_education,
            "address_change": data.address_change,
            "property_status": data.property_status,
            "claim_date": data.claim_date,
            "claim_day_of_week": data.claim_day_of_week,
            "accident_site": data.accident_site,
            "past_num_of_claims": data.past_num_of_claims,
            "witness_present": data.witness_present,
            "liab_prct": data.liab_prct,
            "channel": data.channel,
            "police_report": data.police_report,
            "age_of_vehicle": data.age_of_vehicle,
            "vehicle_category": data.vehicle_category,
            "vehicle_price": data.vehicle_price,
            "total_claim": data.total_claim,
            "injury_claim": data.injury_claim,
            "policy deductible": data.policy_deductible,
            "annual premium": data.annual_premium,
            "days open": data.days_open,
            "form defects": data.form_defects
        }
    ])

    # Convert claim_date to datetime to extract engineered features safely if the pipeline expects them
    try:
        input_data['claim_date'] = pd.to_datetime(input_data['claim_date'])
        input_data['claim_year'] = input_data['claim_date'].dt.year
        input_data['claim_month'] = input_data['claim_date'].dt.month
        input_data['claim_day'] = input_data['claim_date'].dt.day
        input_data['claim_day_number'] = input_data['claim_date'].dt.dayofweek
        input_data['claim_week'] = input_data['claim_date'].dt.isocalendar().week
        input_data['claim_vehicle_ratio'] = input_data['total_claim'] / input_data['vehicle_price'].replace(0, 1)
        input_data['claim_premium_ratio'] = input_data['total_claim'] / input_data['annual premium'].replace(0, 1)
        input_data['injury_claim_ratio'] = input_data['injury_claim'] / input_data['total_claim'].replace(0, 1)
    except Exception as e:
        print("Feature engineering error:", e)

    prediction = model.predict(input_data)[0]

    probability = None
    explanation = None
    if hasattr(model, "predict_proba"):
        probs = model.predict_proba(input_data)[0]
        probability = round(probs[1] * 100, 2)
        
    # Attempt to extract feature importances if it's a pipeline with a model at the end
    try:
        classifier = model.steps[-1][1]
        if hasattr(classifier, "feature_importances_"):
            importances = classifier.feature_importances_
            preprocessor = model.named_steps['preprocessor']
            feature_names = preprocessor.get_feature_names_out()
            imp_dict = dict(zip(feature_names, importances))
            sorted_imp = sorted(imp_dict.items(), key=lambda x: x[1], reverse=True)[:5]
            explanation = {k.split('__')[-1]: round(v * 100, 2) for k, v in sorted_imp}
    except Exception as e:
        print("Could not extract feature importances:", e)

    if prediction == 1:
        result = "Fraud"
    else:
        result = "Not Fraud"

    return {
        "prediction": int(prediction),
        "result": result,
        "probability": probability,
        "explanation": explanation
    }


# FRONTEND INTEGRATION ENDPOINTS

@app.get("/stats")
def get_stats():
    df = get_dataset()
    if df is None:
        return {"error": "Dataset not found"}
    
    total_claims = len(df)
    fraudulent = len(df[df['fraud reported'] == 'Y'])
    genuine = total_claims - fraudulent
    fraud_rate = round((fraudulent / total_claims) * 100, 2) if total_claims > 0 else 0
    
    return {
        "total_claims": total_claims,
        "fraudulent_claims": fraudulent,
        "genuine_claims": genuine,
        "fraud_rate": fraud_rate
    }

@app.get("/claims")
def get_claims(limit: int = 50):
    df = get_dataset()
    if df is None:
        return {"error": "Dataset not found"}
    
    cols = ['claim_number', 'vehicle_category', 'total_claim', 'claim_date', 'fraud reported']
    if 'claim_number' not in df.columns:
        df['claim_number'] = ["CLM-" + str(1000 + i) for i in range(len(df))]
        
    data = df[cols].head(limit).fillna("").to_dict(orient="records")
    return data

@app.get("/analytics")
def get_analytics():
    df = get_dataset()
    if df is None:
        return {"error": "Dataset not found"}
    
    fraud_counts = df['fraud reported'].value_counts().to_dict()
    veh_fraud = df[df['fraud reported'] == 'Y']['vehicle_category'].value_counts().head(5).to_dict()
    
    return {
        "fraud_vs_genuine": fraud_counts,
        "fraud_by_vehicle": veh_fraud
    }