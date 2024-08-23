// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard";
import CustomForm from "./components/CustomForm/CustomForm";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/custom-form" element={<CustomForm />} />
      </Routes>
    </Router>
  );
}

export default App;
