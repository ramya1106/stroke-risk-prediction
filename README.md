# Stroke Risk Prediction Web App  

A full-stack web application to predict stroke risk using **Machine Learning (Logistic Regression)**, with an interactive **ReactJS frontend** and a **Flask backend**.  

---

## Features
- 🌐 **Frontend (ReactJS)**  
  - Components: **Home**, **Header**, **Footer**, **User Guide**  
  - **Home**: Form to input health details (age, BP, sugar levels, etc.)  
  - **User Guide**: Explains how to use the app and provides data descriptions for each field.  
  - Clean UI with **icons for accessibility** and better user experience.  
  - Displays:  
    - **Overall prediction result** (⚠️ warning or ✅ good news)  
    - **Individual feature-wise status** (e.g., BP high, sugar normal) → *handled in the frontend, not by the ML model*.  

- 🖥️ **Backend (Flask)**  
  - Receives input from frontend via **API call**.  
  - Runs **Logistic Regression model** (with scaled data).  
  - Returns prediction result (1 = stroke risk, 0 = no risk).  

- 🤖 **Machine Learning Model**  
  - Logistic Regression trained on stroke-related health data (dataset from the UCI Machine Learning Repository).  
  - Scaled features for accuracy.  
  - Provides **only overall binary prediction** (risk or no risk).  

---

## Tech Stack
- **Frontend:** ReactJS  
- **Backend:** Python Flask  
- **ML Model:** Logistic Regression (scikit-learn, pandas, NumPy)  

---

## Project Flow
1. User fills form on **Home page**.  
2. Data is sent to **Flask backend API**.  
3. Logistic Regression model processes input.  
4. Backend returns prediction (risk / no risk).  
5. Frontend displays:  
   - Overall result (warning/good news).  
   - Individual feature-wise feedback (calculated in frontend logic).  

---

## Installation & Usage
### Backend (Flask + ML Model)
```bash
cd backend
pip install -r requirements.txt
python app.py
```

### Frontend (ReactJS)
```bash
cd frontend
npm install
npm start
```

---

## Access
**Frontend:** `http://localhost:3000`
**Backend API:** `http://localhost:5000`

---

## Author
Ramya Sree Mamidi  

[GitHub Profile](https://github.com/ramya1106)  
[LinkedIn](https://www.linkedin.com/in/ramyasree-m/)  
