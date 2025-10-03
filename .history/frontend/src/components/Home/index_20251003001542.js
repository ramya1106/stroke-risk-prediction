import "./index.css";

import { useState } from "react";

import axios from "axios";

import { FaRegCheckCircle } from "react-icons/fa";

import { RiErrorWarningLine } from "react-icons/ri";

import Header from "../Header";
import Footer from "../Footer";

const featureRules = [
  {
    id: "age",
    title: "Age",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757271700/growing-up_3788089_jpojvn.png",
    min: 0,
    max: 120,
    message: "Age should be between 0–120 years.",
  },
  {
    id: "sex",
    title: "Sex",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757441011/gender-symbols_2324529_vvmrnt.png",
    statusMap: {
      0: "Good", // female
      1: "Good", // male
    },
    message: "Sex must be 0 (female) or 1 (male).",
  },
  {
    id: "cp",
    title: "Chest Pain Type",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757271701/chest-pain_3954108_hjb5aa.png",
    statusMap: {
      0: "Good",
      1: "Good",
      2: "Not Good",
      3: "Not Good",
    },
    message: "cp (0..3): 0=typical, 1=atypical, 2=non-anginal, 3=asymptomatic.",
  },
  {
    id: "trestbps",
    title: "Resting Blood Pressure",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757271701/hypertension_4807605_v8ozc9.png",
    min: 90,
    max: 140,
    message: "Ideal resting BP is ~90–140 mmHg.",
  },
  {
    id: "chol",
    title: "Cholesterol",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757271701/atherosclerosis_9956996_vwzb3o.png",
    min: 100,
    max: 200,
    message: "Ideal cholesterol is below 200 mg/dl.",
  },
  {
    id: "fbs",
    title: "Fasting Blood Sugar",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757271702/diabetes-test_17774375_xuhd7e.png",
    statusMap: {
      0: "Good", // <120 mg/dl
      1: "Not Good", // >=120 mg/dl
    },
    message: "Fasting blood sugar: 0 (<120 mg/dl), 1 (≥120 mg/dl).",
  },
  {
    id: "restecg",
    title: "Resting ECG Result",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757271700/ecg_2947757_s7zvdd.png",
    statusMap: {
      0: "Good", // normal
      1: "Not Good", // ST-T abnormality
      2: "Not Good", // probable/definite LV hypertrophy
    },
    message: "restecg (0..2): 0=normal, 1=ST-T abnormality, 2=LV hypertrophy.",
  },
  {
    id: "thalach",
    title: "Maximum Heart Rate",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757271700/heart-rate_7771023_skl04l.png",
    min: 60,
    max: 200,
    message: "Max heart rate should be 60–200 bpm.",
  },
  {
    id: "exang",
    title: "Exercise Induced Angina",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757271700/chest-pain_3654712_tkn3uu.png",
    statusMap: {
      0: "Good", // No
      1: "Not Good", // Yes
    },
    message: "Exercise induced angina: 0 (No), 1 (Yes).",
  },
  {
    id: "oldpeak",
    title: "ST Segment Depression",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757271700/decrease_11073367_ilnu2h.png",
    min: 0.0,
    max: 6.0,
    message: "ST depression (oldpeak) should be 0.0–6.0.",
  },
  {
    id: "slope",
    title: "Slope of ST Segment",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757441010/pulse_5523525_xxz4lj.png",
    statusMap: {
      0: "Good", // upsloping = better prognosis
      1: "Not Good", // flat = moderate risk
      2: "Not Good", // downsloping = higher risk
    },
    message: "slope (0..2): 0=upsloping, 1=flat, 2=downsloping.",
  },
  {
    id: "ca",
    title: "Major Vessels",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757441011/blood-vessel_4939164_ateeyd.png",
    statusMap: {
      0: "Good",
      1: "Not Good",
      2: "Not Good",
      3: "Not Good",
      4: "Not Good",
    },
    message: "Number of major vessels (ca) ranges 0–3 (more = higher risk).",
  },
  {
    id: "thal",
    title: "Thalassemia Status",
    imageUrl:
      "https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757441011/red-blood-cells_2284117_ijtsoi.png",
    statusMap: {
      0: "Not Good", // unknown/missing → treat as risk
      1: "Good", // normal
      2: "Not Good", // fixed defect
      3: "Not Good", // reversible defect
    },
    message:
      "thal (0..3): 1=normal, 2=fixed defect, 3=reversible defect, 0=unknown/missing.",
  },
];

function Home() {
  const [formData, setFormData] = useState({
    age: "",
    sex: "",
    cp: "",
    trestbps: "",
    chol: "",
    fbs: "",
    restecg: "",
    thalach: "",
    exang: "",
    oldpeak: "",
    slope: "",
    ca: "",
    thal: "",
  });

  const [overallStatus, setOverallStatus] = useState("");

  const [showFeatureStatues, setFeatureStatues] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // force numeric values where needed
    const payload = {
      features: [
        Number(formData.age),
        Number(formData.sex),
        Number(formData.cp),
        Number(formData.trestbps),
        Number(formData.chol),
        Number(formData.fbs),
        Number(formData.restecg),
        Number(formData.thalach),
        Number(formData.exang),
        Number(formData.oldpeak),
        Number(formData.slope),
        Number(formData.ca),
        Number(formData.thal),
      ],
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/predict`,
        payload
      );

      if (response.data.prediction === 0) {
        setOverallStatus(
          "Good News: Your inputs show no signs of heart disease. Keep maintaining a healthy lifestyle!"
        );
      } else {
        setOverallStatus(
          "Warning: There may be indicators of heart disease. It’s best to follow up with a healthcare professional."
        );
      }
      setFeatureStatues(true); // show feature statues on submit
    } catch (error) {
      error.response
        ? alert(`Error: ${error.response.data}`)
        : alert(`Error: ${error.message}`);
    }
  };

  const checkStatus = (featureId, value) => {
    const rule = featureRules.find((item) => item.id === featureId);

    // categorical: use statusMap
    if (rule.statusMap) {
      const status = rule.statusMap[value];
      return status;
    }

    // numeric: use min/max
    if (rule.min !== undefined && rule.max !== undefined) {
      const num = value;
      const isGood = num >= rule.min && num <= rule.max;
      return isGood ? "Good" : "Not Good";
    }

    return "Unknown";
  };

  return (
    <>
      <Header />
      <div className="app-container">
        <div className="form-container">
          <div className="side-bar">
            <div className="text-container">
              <h1>Know Your Heart Better</h1>
              <p>
                Fill in a few simple details and get a quick, personalized view
                of your heart health. Awareness is the first step to prevention.
              </p>
            </div>
            <img
              src="https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757443022/heart-risk-image_gopywj.png"
              className="heart-img"
              alt="heart-img"
            />
          </div>
          <div className="form-card">
            <form onSubmit={handleSubmit}>
              {/*  Name + Age  */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    className="text-input"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="age" className="form-label">
                    Age
                  </label>
                  <input
                    id="age"
                    type="number"
                    className="text-input"
                    placeholder="Enter your age"
                    value={formData.age}
                    onChange={(e) =>
                      setFormData({ ...formData, age: e.target.value })
                    }
                  />
                </div>
              </div>

              {/*  Sex + Chest Pain */}
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Sex</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="sex-female"
                        name="sex"
                        value="0"
                        checked={formData.sex === 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sex: Number(e.target.value),
                          })
                        }
                      />
                      <label htmlFor="sex-female">Female</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="sex-male"
                        name="sex"
                        value="1"
                        checked={formData.sex === 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            sex: Number(e.target.value),
                          })
                        }
                      />
                      <label htmlFor="sex-male">Male</label>
                    </div>
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="cp" className="form-label">
                    Chest Pain (Angina) Type
                  </label>
                  <select
                    id="cp"
                    name="cp"
                    className="select-input"
                    value={formData.cp}
                    onChange={(e) =>
                      setFormData({ ...formData, cp: Number(e.target.value) })
                    }
                  >
                    <option value="0">Typical Angina</option>
                    <option value="1">Atypical Angina</option>
                    <option value="2">Non-Anginal Pain</option>
                    <option value="3">Asymptomatic</option>
                  </select>
                </div>
              </div>

              {/* Resting BP + Cholesterol in one row */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="rbp" className="form-label">
                    Resting Blood Pressure
                  </label>
                  <input
                    id="rbp"
                    type="number"
                    className="text-input"
                    placeholder="Eg: 120 mmHg"
                    value={formData.trestbps}
                    onChange={(e) =>
                      setFormData({ ...formData, trestbps: e.target.value })
                    }
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="cholesterol" className="form-label">
                    Cholesterol
                  </label>
                  <input
                    id="cholesterol"
                    type="number"
                    className="text-input"
                    placeholder="Eg: 150 mg/dl"
                    value={formData.chol}
                    onChange={(e) =>
                      setFormData({ ...formData, chol: e.target.value })
                    }
                  />
                </div>
              </div>

              {/* Fasting Blood Sugar + Rest ECG */}
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Fasting Blood Sugar</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="fbs-low"
                        name="fbs"
                        value="0"
                        checked={formData.fbs === 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fbs: Number(e.target.value),
                          })
                        }
                      />
                      <label htmlFor="fbs-low">Less than 120 mg/dl</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="fbs-high"
                        name="fbs"
                        value="1"
                        checked={formData.fbs === 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            fbs: Number(e.target.value),
                          })
                        }
                      />
                      <label htmlFor="fbs-high">≥120 mg/dl</label>
                    </div>
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="restecg" className="form-label">
                    Resting ECG Result
                  </label>
                  <select
                    id="restecg"
                    name="restecg"
                    className="select-input"
                    value={formData.restecg}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        restecg: Number(e.target.value),
                      })
                    }
                  >
                    <option value="0">Normal</option>
                    <option value="1">Minor Abnormality</option>
                    <option value="2">Enlargement of Heart</option>
                  </select>
                </div>
              </div>

              {/* Max Heart Rate +  Exercise Induced Angina */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="thalach" className="form-label">
                    Max Heart Rate
                  </label>
                  <input
                    id="thalach"
                    type="number"
                    className="text-input"
                    placeholder="Eg: 72 bpm"
                    value={formData.thalach}
                    onChange={(e) =>
                      setFormData({ ...formData, thalach: e.target.value })
                    }
                  />
                </div>

                <div className="form-field">
                  <label className="form-label">Exercise Induced Angina</label>
                  <div className="radio-group">
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="exang-no"
                        name="exang"
                        value="0"
                        checked={formData.exang === 0}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            exang: Number(e.target.value),
                          })
                        }
                      />
                      <label htmlFor="exang-no">No</label>
                    </div>
                    <div className="radio-option">
                      <input
                        type="radio"
                        id="exang-yes"
                        name="exang"
                        value="1"
                        checked={formData.exang === 1}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            exang: Number(e.target.value),
                          })
                        }
                      />
                      <label htmlFor="exang-yes">Yes</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Oldpeak + Slope */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="oldpeak" className="form-label">
                    ST Segment Depression (oldpeak)
                  </label>
                  <input
                    id="oldpeak"
                    type="text"
                    className="text-input"
                    placeholder="Eg: 3.1"
                    value={formData.oldpeak}
                    onChange={(e) =>
                      setFormData({ ...formData, oldpeak: e.target.value })
                    }
                  />
                </div>
                <div className="form-field">
                  <label htmlFor="slope" className="form-label">
                    Slope of ST Segment
                  </label>
                  <select
                    id="slope"
                    name="slope"
                    className="select-input"
                    value={formData.slope}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        slope: Number(e.target.value),
                      })
                    }
                  >
                    <option value="0">Upsloping</option>
                    <option value="1">Flat</option>
                    <option value="2">Downsloping</option>
                  </select>
                </div>
              </div>

              {/* Major Vessels + Thalassemia */}
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor="ca" className="form-label">
                    Major Vessels Count
                  </label>
                  <select
                    id="ca"
                    name="ca"
                    className="select-input"
                    value={formData.ca}
                    onChange={(e) =>
                      setFormData({ ...formData, ca: Number(e.target.value) })
                    }
                  >
                    <option value="0">No vessels</option>
                    <option value="1">1 vessel</option>
                    <option value="2">2 vessels</option>
                    <option value="3">3 vessels</option>
                    <option value="4">4 vessels</option>
                  </select>
                </div>
                <div className="form-field">
                  <label htmlFor="thal" className="form-label">
                    Thalassemia Status
                  </label>
                  <select
                    id="thal"
                    name="thal"
                    className="select-input"
                    value={formData.thal}
                    onChange={(e) =>
                      setFormData({ ...formData, thal: Number(e.target.value) })
                    }
                  >
                    <option value="0">Unknown</option>
                    <option value="1">Normal</option>
                    <option value="2">Fixed Defect</option>
                    <option value="3">Reversible Defect</option>
                  </select>
                </div>
              </div>
              <div className="submit-btn-container">
                <button type="submit" className="submit-button">
                  Predict
                </button>
              </div>
            </form>
          </div>
        </div>
        <h1 className="result-title">Your Status</h1>
        {showFeatureStatues ? (
          <div>
            <h3 className="overall-result">{overallStatus}</h3>
            <div className="result-container">
              {featureRules.map((feature) => {
                let value = formData[feature.id];
                let status = checkStatus(feature.id, value);
                return (
                  <div
                    className={`feature-card ${
                      status === "Good" ? "isGood-border" : ""
                    }`}
                  >
                    <img
                      src={feature.imageUrl}
                      className="feature-img"
                      alt="feature-img"
                    />
                    <div className="feature-details">
                      <div className="feature-name-container">
                        <h1 className="feature-name">{feature.title}</h1>
                        <p
                          className={`status ${
                            status === "Good" ? "isGood" : ""
                          }`}
                        >
                          {status}
                        </p>
                      </div>
                      <div className="feature-value-container">
                        <p className="feature-value">{value}</p>
                        {status === "Good" ? (
                          <FaRegCheckCircle
                            className="status-icon"
                            style={{ color: "#22c55e" }}
                          />
                        ) : (
                          <RiErrorWarningLine
                            className="status-icon"
                            style={{ color: "#ef4444" }}
                          />
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="initial-state">
            <img
              src="https://res.cloudinary.com/dn9sdbv1o/image/upload/v1757789907/fill-form_tfhndw.png"
              alt="fill-form"
              className="initial-state-img"
            />
            <p className="initial-state-text">
              Complete the form to view your prediction.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Home;
