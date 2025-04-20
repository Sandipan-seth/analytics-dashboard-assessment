import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import CompanyWise from "./pages/CompanyWise";

function App() {
  return (
      <div className="text-white">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:companyName" element={<CompanyWise />} />
        </Routes>
      </div>
  );
}

export default App;
