from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

from flask_cors import CORS

app = Flask(__name__)
CORS(app) 

# =============================
# 1. Train the model on startup
# =============================

# Load dataset
data = pd.read_csv("heart_disease_data.csv")

# Extract feature names
features = (data.drop(columns="target")).columns

# Separate features (X) and target (y)
X = data.drop(columns="target", axis=1)
y = data["target"]

# Train-test split
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=18, stratify=y
)

# Feature scaling
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)

# Train Logistic Regression model
model = LogisticRegression(max_iter=2000, class_weight="balanced")

model.fit(X_train, y_train)

# Accuracy check
train_pred = model.predict(X_train)
test_pred = model.predict(X_test)
print(f"Training Accuracy: {accuracy_score(train_pred, y_train)*100:.2f}%")
print(f"Testing Accuracy: {accuracy_score(test_pred, y_test)*100:.2f}%")


# =============================
# 2. API Endpoints
# =============================

@app.route("/predict", methods=["POST"])
def predict():
    try:
        input_data = request.json["features"]
        input_df = pd.DataFrame([input_data], columns=features)

        print(input_data)

        # Apply scaler
        input_scaled = scaler.transform(input_df)

        # Get probability of risk
        risk_prob = model.predict_proba(input_scaled)[0][1]

        print(risk_prob)

        # Apply threshold (custom cutoff)
        threshold = 0.65
        prediction = int(risk_prob >= threshold)

        print(prediction)

        return jsonify({
            "prediction": prediction  # 0 = Good, 1 = Risk
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400



@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Heart Disease Prediction API is running!"})


# =============================
# 3. Run server
# =============================

if __name__ == "__main__":
    app.run(debug=True)
