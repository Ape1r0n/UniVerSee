import joblib
import pandas as pd
import os
import numpy as np
from flask import Flask, request, jsonify


model_rf = joblib.load("models/random_forest.joblib")
model_gb = joblib.load("models/gradient_boosting.joblib")
preprocessor = joblib.load("models/preprocessor.joblib")
mlb = joblib.load("models/mlb.joblib")

wl_balance_map = {
    'სწავლა 0%, თავისუფალი დრო 100%': 0,
    'სწავლა 20%, თავისუფალი დრო 80%': 1,
    'სწავლა 40%, თავისუფალი დრო 60%': 2,
    'სწავლა 60%, თავისუფალი დრო 40%': 3,
    'სწავლა 80%, თავისუფალი დრო 20%': 4,
    'სწავლა 100%, თავისუფალი დრო 0%': 5
}

hb_mp = {
    "სპორტი": "sports",
    "ვიდეო თამაშები": "video_games",
    "ფილმები / სერიალები": "movies",
    "ანიმეები / მანგები და კომიქსები": "anime",
    "ლაშქრობა / ბუნებაში გასვლა": "hiking",
    "მეცნიერება და ტექნოლოგიები": "stem",
    "ვარჯიში": "workout",
    "მეგობრებთან ერთად გართობა": "hangout",
    "შოპინგი": "shopping"
}

app = Flask(__name__)


def process_input(input_data):
    df = pd.DataFrame([input_data])
    df['hobbies'] = df['hobbies'].apply(lambda x: [hb_mp[h.strip()] for h in x])
    
    hobbies_encoded = pd.DataFrame(mlb.transform(df['hobbies']), columns=mlb.classes_, index=df.index)
    df = df.drop('hobbies', axis=1).join(hobbies_encoded)
    df['wl_balance'] = df['wl_balance'].map(wl_balance_map).astype(int)
    
    return preprocessor.transform(df)


def predict(data):
    processed = process_input(data)
    return {
        "rf_prediction": model_rf.predict(processed)[0],
        "gb_prediction": model_gb.predict(processed)[0]
    }


def save_to_excel(data):
    os.makedirs("predictions", exist_ok=True)
    file_path = "predictions/predictions.xlsx"
    
    df = pd.DataFrame([data])
    if os.path.exists(file_path):
        existing = pd.read_excel(file_path)
        df = pd.concat([existing, df])
    
    df.to_excel(file_path, index=False)


@app.route('/predict', methods=['POST'])
def handle_prediction():
    try:
        input_data = request.json
        required_fields = ['faculty', 'gender', 'hobbies', 'which_trovert', 'wl_balance', 'dedication']
        if not all(field in input_data for field in required_fields):
            return jsonify({"error": "Missing required fields"}), 400

        predictions = predict(input_data)
        save_to_excel(input_data)
        return jsonify(predictions), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
