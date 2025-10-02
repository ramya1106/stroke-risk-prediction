import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/Home";
import UserGuide from "./components/UserGuide";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-guide" element={<UserGuide />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
