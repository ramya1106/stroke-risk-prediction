import "./index.css";
import Footer from "../Footer";
import Header from "../Header";

import { MdLooksOne, MdLooksTwo, MdLooks3 } from "react-icons/md";
import { FaArrowRight } from "react-icons/fa";

const userGuideSteps = [
  {
    id: "1",
    title: "Enter Details",
    icon: <MdLooksOne className="step-icon" />,
    description: "Navigate to home page, fill the form ",
  },
  {
    id: "2",
    title: "Check Guide",
    icon: <MdLooksTwo className="step-icon" />,
    description: "See field descriptions below if needed.",
  },
  {
    id: "3",
    title: "Get Result",
    icon: <MdLooks3 className="step-icon" />,
    description: "Click Submit to view your risk instantly.",
  },
];

const dataDescription = [
  { field: "age", description: "The person's age in years" },
  { field: "sex", description: "The person's sex (1 = male, 0 = female)" },
  {
    field: "cp",
    description:
      "Chest pain type (1 = typical angina, 2 = atypical angina, 3 = non-anginal pain, 4 = asymptomatic)",
  },
  {
    field: "trestbps",
    description: "Resting blood pressure (mm Hg on admission to the hospital)",
  },
  { field: "chol", description: "Cholesterol measurement in mg/dl" },
  {
    field: "fbs",
    description: "Fasting blood sugar > 120 mg/dl (1 = true; 0 = false)",
  },
  {
    field: "restecg",
    description:
      "Resting electrocardiographic results (0 = normal, 1 = ST-T wave abnormality, 2 = left ventricular hypertrophy)",
  },
  { field: "thalach", description: "Maximum heart rate achieved" },
  { field: "exang", description: "Exercise induced angina (1 = yes; 0 = no)" },
  {
    field: "oldpeak",
    description: "ST depression induced by exercise relative to rest",
  },
  {
    field: "slope",
    description:
      "Slope of the peak exercise ST segment (1 = upsloping, 2 = flat, 3 = downsloping)",
  },
  { field: "ca", description: "Number of major vessels (0–3)" },
  {
    field: "thal",
    description:
      "Thalassemia (3 = normal; 6 = fixed defect; 7 = reversible defect)",
  },
  { field: "target", description: "Heart disease (0 = no, 1 = yes)" },
];

function UserGuide() {
  return (
    <>
      <Header />
      <div className="user-guide-header">
        <p className="user-guide-description">
          This application predicts the risk of heart disease based on medical
          data you provide. It is for educational purposes only and not a
          substitute for professional medical advice.
        </p>

        <div className="steps-flow">
          {userGuideSteps.map((step, index) => (
            <div key={step.id} className="step-wrapper">
              <div className="step-container-item">
                {step.icon}
                <h1 className="step-title">{step.title}</h1>
                <p className="step-description">{step.description}</p>
              </div>
              {index < userGuideSteps.length - 1 && (
                <FaArrowRight className="step-arrow" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="data-description-bg">
        <div className="data-description">
          <h1>Data Description</h1>
          <ul>
            {dataDescription.map((item, index) => (
              <li key={index}>
                <strong>{item.field}:</strong> {item.description}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserGuide;
